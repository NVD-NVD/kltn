package com.ute.sportswearbe.dtos;

import com.ute.sportswearbe.entities.embedded.EmbeddedAddress;
import com.ute.sportswearbe.entities.embedded.EmbeddedProductsInOrder;
import com.ute.sportswearbe.entities.embedded.EmbeddedProductsInOrderDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private List<EmbeddedProductsInOrderDto> productsInOrder = new ArrayList<>();
    private EmbeddedAddress addressForShipping;
    private String phone;
    private String note;
}
