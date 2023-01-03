package com.ute.sportswearbe.entities.embedded;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedOption {
    @ApiModelProperty(notes = "sizes", dataType = "List", example = "", required = true)
    private List<EmbeddedSize> sizes;

    @ApiModelProperty(notes = "color", dataType = "List", example = "[\"Trắng\", \" Đen\"]", required = true)
    private List<String> color;

    @ApiModelProperty(notes = "features", example = "", required = true)
    private List<String> features;

}
