package com.ute.sportswearbe.entities.embedded;

import com.ute.sportswearbe.utils.enums.EnumSize;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedSize {
    @ApiModelProperty(notes = "size", example = "M", required = true)
    private String size;
    @ApiModelProperty(notes = "quantity",example = "100", required = true)
    private int quantity;
}
