package com.ute.sportswearbe.dtos.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private String gateway;
    private String orderId;
    private int amount;
    private String description;
    private String bankCode;
    private String total;
}
