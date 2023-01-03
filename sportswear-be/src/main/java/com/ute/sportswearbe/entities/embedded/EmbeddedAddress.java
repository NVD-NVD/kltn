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
public class EmbeddedAddress {
    @ApiModelProperty(notes = "number", example = "01", required = true)
    private String number;
    @ApiModelProperty(notes = "street", example = "Nguyễn Văn Tăng", required = true)
    private String street;
    @ApiModelProperty(notes = "ward", example = "Long Thạch Mỹ", required = true)
    private String ward; //phuong
    @ApiModelProperty(notes = "district", example = "Quận 9", required = true)
    private String district;
    @ApiModelProperty(notes = "city", example = "Hồ Chí Minh", required = true)
    private String city;
    @ApiModelProperty(notes = "country", example = "Việt Nam", required = true)
    private String country;
}
