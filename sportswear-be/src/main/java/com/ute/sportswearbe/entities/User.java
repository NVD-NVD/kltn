package com.ute.sportswearbe.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ute.sportswearbe.entities.embedded.EmbeddedAddress;
import com.ute.sportswearbe.utils.validator.Phone;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    @Phone
    private String phone;

    @Indexed(unique = true)
    @Email
    private String email;

    @JsonIgnore
    private String password;

    private String name;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthday;

    private String gender;

    private EmbeddedAddress address;

    private String avatar;

    private List<String> roles = new ArrayList<>();

    private Date createdOn;

    private Date updateOn;

    private boolean enable = true;

}