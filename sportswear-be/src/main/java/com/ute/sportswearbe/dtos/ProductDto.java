package com.ute.sportswearbe.dtos;

import com.ute.sportswearbe.entities.embedded.*;
import com.ute.sportswearbe.entities.embedded.reviews.EmbeddedReviews;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    @NotNull(message = "Title can 'not null'")
    @ApiModelProperty(notes = "title", example = "Juventus BD1035", required = true)
    private String title;

    @ApiModelProperty(notes = "descriptions", example = "", required = true)
    private List<EmbeddedDescription> descriptions = new ArrayList<>();

    @ApiModelProperty(notes = "options", example = "", required = true)
    private EmbeddedOption options;

    @ApiModelProperty(notes = "types", example = "", required = true)
    private List<String> types;

    @ApiModelProperty(notes = "trademark", example = "Juventus", required = true)
    private String trademark; // nhãn hiệu

    @ApiModelProperty(notes = "origin", example = "China", required = true)
    private String origin;// nguồn gốc

    @ApiModelProperty(notes = "price", example = "", required = true)
    private EmbeddedPrice price;

    @Min(value = 0, message = "Discount không thể nhỏ hơn 0%")
    @Max(value = 100, message = "Discount không thể lớn hơn 100%")
    @ApiModelProperty(notes = "discount", example = "10.5", required = true)
    private float discount;

    @ApiModelProperty(notes = "quantity", example = "500", required = true)
    private long quantity;

    @ApiModelProperty(notes = "fallIntoCategories", example = "", required = true)
    private List<EmbeddedCategory> fallIntoCategories = new ArrayList<>();

//    @ApiModelProperty(notes = "reviews", example = "", required = true)
//    private EmbeddedReviews reviews;

//    @ApiModelProperty(notes = "createdOn", example = "09-10-2022", required = true)
//    private Date createdOn;
//
//    @ApiModelProperty(notes = "updateOn", example = "09-10-2022", required = true)
//    private Date updateOn;
}
