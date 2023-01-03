package com.ute.sportswearbe.dtos.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ute.sportswearbe.entities.embedded.EmbeddedAddress;
import com.ute.sportswearbe.utils.validator.Phone;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.Past;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCoreDto {
    @ApiModelProperty(notes = "phone", example = "0989999999", required = true)
    @Phone
    private String phone;

    @ApiModelProperty(notes = "email", example = "member01@gmail.com", required = true)
    @Email
    private String email;

    @ApiModelProperty(notes = "password", example = "password01", required = true)
    private String password;

    @ApiModelProperty(notes = "name", example = "Nguyễn Văn A", required = true)
    private String name;

    @ApiModelProperty(notes = "birthday", example = "01-12-1999", required = true)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthday;

    @ApiModelProperty(notes = "gender", example = "Male", required = true)
    private String gender;

    private EmbeddedAddress address;
}
