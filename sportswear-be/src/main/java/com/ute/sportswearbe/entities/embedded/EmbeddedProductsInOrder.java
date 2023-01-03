package com.ute.sportswearbe.entities.embedded;

import com.ute.sportswearbe.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedProductsInOrder {
    @DBRef
    private Product product;
    private long quantity;
    private EmbeddedOption options;
    private EmbeddedPrice price;
    private float discount = 0;
    private float total;
}
