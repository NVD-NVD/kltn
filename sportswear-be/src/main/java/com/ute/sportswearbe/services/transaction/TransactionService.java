package com.ute.sportswearbe.services.transaction;

import com.ute.sportswearbe.entities.Transaction;
import org.springframework.data.domain.Page;

import java.security.Principal;
import java.util.List;

public interface TransactionService {
    Transaction getTransactionByID(String id);
    Transaction getTransactionByOrderID(String orderID);

    List<Transaction> getAllTransaction();

    Page<Transaction> getTransactionPaging(String search, int page, int size, String sort, String column);
    Transaction createTransaction(Transaction transaction);
    Transaction createTransaction(String amount, String bankCode, String bankTranNo, String cardType,
                      String orderInfo, String payDate, String responseCode, String tmnCode,
                      String transactionNo, String txnRef, String secureHashType,
                      String secureHash);
    Transaction updateTransaction(Transaction transaction);
    Transaction changeStatusTransaction(Transaction transaction);
    Transaction save(Transaction transaction);
}
