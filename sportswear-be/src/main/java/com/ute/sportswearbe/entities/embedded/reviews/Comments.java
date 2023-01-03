package com.ute.sportswearbe.entities.embedded.reviews;

import com.ute.sportswearbe.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class Comments {
    @DBRef
    private User user;
    private List<EmbeddedComment> comments;
    private long commentTotal;
}
