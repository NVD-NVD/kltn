package com.ute.sportswearbe.services.payment;

import com.ute.sportswearbe.dtos.TransactionStatusDto;
import com.ute.sportswearbe.models.PaymentResp;

import java.io.IOException;
import java.security.Principal;

public interface PaymentService {
    PaymentResp createPayment(String orderID, String url, Principal principal) throws IOException;
    TransactionStatusDto transactionHandle (
            String amount, String bankCode, String bankTranNo,
            String cardType, String orderInfo, String payDate,
            String responseCode, String tmnCode, String transactionNo,
            String txnRef, String secureHashType, String secureHash, Principal principal);
}
