package com.ute.sportswearbe.entities.embedded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddedPayment {
    private String transactionID;
    private String paymentID;
    private String processing;
    private Date createDate;
    private Date updateDate;

}
