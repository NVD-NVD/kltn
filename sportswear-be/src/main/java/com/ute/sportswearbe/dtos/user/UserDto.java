package com.ute.sportswearbe.dtos.user;

import com.ute.sportswearbe.utils.validator.Phone;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @Phone
    private String phone;
    private String email;

    private String password;

    private String name;

    private List<String> roles = new ArrayList<>();
}
