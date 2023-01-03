package com.ute.sportswearbe.entities.embedded;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedDescription {
    @ApiModelProperty(notes = "language", example = "vi", required = true)
    private String language;
    @ApiModelProperty(notes = "description", example = "Quần áo thi đấu của câu lạc bộ Juventus, với màu trăng đen", required = true)
    private String description;
}
