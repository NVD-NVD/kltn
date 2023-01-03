package com.ute.sportswearbe.securities.provider;

import com.ute.sportswearbe.exceptions.UserNotFoundAuthenticationException;
import com.ute.sportswearbe.securities.JwtUserDetailsService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserAuthenticationProvider implements AuthenticationProvider {

    private final JwtUserDetailsService jwtUserDetailsService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserAuthenticationProvider(JwtUserDetailsService jwtUserDetailsService) {
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UserAuthenticationToken customAuth = (UserAuthenticationToken) authentication;
        String phone = customAuth.getName();
        String passWord = customAuth.getCredentials() == null ? null : customAuth.getCredentials().toString();
        boolean verifyCredentials = Boolean.parseBoolean(customAuth.isVerifyCredentials().toString());
        UserDetails userDetails = null;
        try {
            userDetails = jwtUserDetailsService.loadUserByUsername(phone);
        } catch (UsernameNotFoundException ex) {
            throw new UserNotFoundAuthenticationException(ex.getMessage());
        }
        if (!userDetails.isEnabled())
            throw new BadCredentialsException("Tài khoản bị khóa ");
        if (verifyCredentials) { // check username password verify;
            if (passwordEncoder.matches(passWord, userDetails.getPassword())) {
                return new UserAuthenticationToken(phone, passwordEncoder.encode(passWord), verifyCredentials, userDetails.getAuthorities()); //authenticates
            } else { // wrong Password
                throw new BadCredentialsException("Sai mật khẩu");
            }
//            if (passWord.equals(userDetails.getPassword())) {
//                return new UserAuthenticationToken(phone, passWord, verifyCredentials, userDetails.getAuthorities()); //authenticates
//            } else { // wrong Password
//                throw new BadCredentialsException("Sai mật khẩu");
//            }
        } else { // verify google
            return new UserAuthenticationToken(phone, "N/A", verifyCredentials, userDetails.getAuthorities());
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UserAuthenticationToken.class);
    }
}
