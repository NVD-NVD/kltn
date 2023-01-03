package com.ute.sportswearbe.entities.embedded.reviews;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.crypto.Data;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedReviews {
    private List<Like> likes;

    private List<Comments> comments;

    private long likeTotal;

    private long commentTotal;
}

