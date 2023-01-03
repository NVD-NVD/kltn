package com.ute.sportswearbe.entities.embedded;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedOrigin {
    @ApiModelProperty(notes = "producer", example = "China", required = true)
    private String producer;
    @ApiModelProperty(notes = "sizes", dataType = "List", example = "", required = true)
    private String manufacturerIn; // sản xuất tại
}
