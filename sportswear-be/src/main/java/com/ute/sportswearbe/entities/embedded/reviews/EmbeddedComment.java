package com.ute.sportswearbe.entities.embedded.reviews;

import com.ute.sportswearbe.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.xml.crypto.Data;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class EmbeddedComment {
    private String comment;
    private Data time;
}
