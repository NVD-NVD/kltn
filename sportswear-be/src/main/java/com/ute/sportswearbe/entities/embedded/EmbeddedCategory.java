package com.ute.sportswearbe.entities.embedded;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmbeddedCategory {
    @ApiModelProperty(notes = "id", value = "", required = false)
    private String id;
    @ApiModelProperty(notes = "title", example = "New", required = false)
    private String title;
}