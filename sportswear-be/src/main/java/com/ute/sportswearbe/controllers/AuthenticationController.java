package com.ute.sportswearbe.controllers;

import com.ute.sportswearbe.dtos.AccountDto;
import com.ute.sportswearbe.dtos.TokenDetails;
import com.ute.sportswearbe.dtos.user.UserCoreDto;
import com.ute.sportswearbe.exceptions.InvalidException;
import com.ute.sportswearbe.exceptions.UserNotFoundAuthenticationException;
import com.ute.sportswearbe.securities.JwtTokenUtils;
import com.ute.sportswearbe.securities.JwtUserDetailsService;
import com.ute.sportswearbe.securities.provider.UserAuthenticationToken;
import com.ute.sportswearbe.services.user.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.HashMap;

@RestController
@RequestMapping("/rest/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Value("${google.verifyUrl}")
    private String googleVerifyUrl;

    @Value("${default.password}")
    private String defaultPassword;


    RestTemplate restTemplate = new RestTemplate();

    /**
     *  @author: NVD-NVD
     *  @param dto: Dto signup
     *  @return : Http status OK
     */
    @ApiOperation(value = "Create a new account")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserCoreDto dto) throws Exception{
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        return ResponseEntity.ok(userService.createNewUser(dto));
    }

    /***
     * @author:NVD-NVD
     * @param dto: Dto login by phone, password
     * @return: token detail when user login success
     */
    @ApiOperation(value = "Login email, password", notes = "User")
    @PostMapping("/login")
    public ResponseEntity<TokenDetails> login(@RequestBody AccountDto dto) {
        UserAuthenticationToken authenticationToken = new UserAuthenticationToken(
                dto.getPhone(),
                dto.getPassword(),
//                passwordEncoder.encode(dto.getPassword()),
                true
        );
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException | BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final UserDetails userDetails = jwtUserDetailsService
                .loadUserByUsername(dto.getPhone());
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /***
     * @author:NVD-NVD
     * @param googleToken: access token google
     * @return: token detail of user login success, if user don't have Account, create account for user by email google
     */
    @ApiOperation(value = "Login google")
    @PostMapping("/login/google")
    public ResponseEntity<TokenDetails> loginGoogle(@RequestHeader(name = "GoogleToken") String googleToken) {
        String urlRequest = googleVerifyUrl + googleToken;
        String email;
        String fullName;
        try {
            ResponseEntity<HashMap> responseEntity = restTemplate.exchange(urlRequest, HttpMethod.GET, null, HashMap.class);
            HashMap<String, String> map = responseEntity.getBody();
            email = map.get("email");
        } catch (Exception ex) {
            throw new InvalidException("Token is Invalid");
        }
        UserAuthenticationToken authenticationToken = new UserAuthenticationToken(email, null, false);
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException ex) {
            userService.addNewUserCore(null, email, defaultPassword);
        } catch (BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(email);
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /***
     * @author: NVD-MVD
     * @param principal
     * @return: Test login
     */
    @ApiOperation(value = "Test security", notes = "User")
    @PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
    @GetMapping("/hello")
    public ResponseEntity<String> sayHello(Principal principal) {
        return new ResponseEntity<>("Hello", HttpStatus.OK);
    }
}
