package com.ute.sportswearbe.controllers;

import com.ute.sportswearbe.utils.enums.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/rest/enum")
public class EnumController {

    @ApiOperation(value = "Get enum size")
    @GetMapping("/size")
    public ResponseEntity<?> getEnumSize(){
        List<String> enumSize = new ArrayList<>();
        return new ResponseEntity<>(Arrays.asList(EnumSize.S.name(), EnumSize.M.name(),
                                    EnumSize.L.name(), EnumSize.XL.name(), EnumSize.XXL.name()),
                HttpStatus.OK);
    }
    @ApiOperation(value = "Get enum Gender")
    @GetMapping("/gender")
    public ResponseEntity<?> getEnumGender(){
        List<String> enumSize = new ArrayList<>();
        return new ResponseEntity<>(Arrays.asList(EnumGender.Male.name(), EnumGender.Female.name(),EnumGender.Other.name()),
                HttpStatus.OK);
    }
    @ApiOperation(value = "Get enum size")
    @GetMapping("/order/processing")
    public ResponseEntity<?> getEnumOrderProcessing(){
        List<String> enumSize = new ArrayList<>();
        return new ResponseEntity<>(Arrays.asList(EnumProcessing.Chua_Xu_Ly.name(),
                                        EnumProcessing.Dang_Xu_Ly.name(),
                                        EnumProcessing.Da_Giao_Hang.name()),
                HttpStatus.OK);
    }
    @ApiOperation(value = "Get enum Role")
    @GetMapping("/role")
    public ResponseEntity<?> getEnumRole(){
        List<String> enumSize = new ArrayList<>();
        return new ResponseEntity<>(Arrays.asList(EnumRole.ROLE_MEMBER.name(), EnumRole.ROLE_ADMIN.name()),
                HttpStatus.OK);
    }
    @ApiOperation(value = "Get enum size")
    @GetMapping("/payment/processing")
    public ResponseEntity<?> getEnumPaymentProcessing(){
        List<String> enumSize = new ArrayList<>();
        return new ResponseEntity<>(Arrays.asList(EnumPaymentProcess.Chua_Thanh_Toan.name(),
                                        EnumPaymentProcess.Dang_Thanh_Toan.name(), EnumPaymentProcess.Da_Thanh_Toan.name()),
                HttpStatus.OK);
    }
}
