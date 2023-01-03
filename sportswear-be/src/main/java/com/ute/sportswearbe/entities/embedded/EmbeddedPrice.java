package com.ute.sportswearbe.entities.embedded;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedPrice {
    @ApiModelProperty(notes = "currency", example = "VND", required = true)
    private String currency = "vnd";

    @ApiModelProperty(notes = "discount", example = "250000", required = true)
    private float price;
}
