package com.ute.sportswearbe.controllers;

import com.ute.sportswearbe.dtos.TransactionStatusDto;
import com.ute.sportswearbe.entities.Order;
import com.ute.sportswearbe.entities.Transaction;
import com.ute.sportswearbe.models.PaymentResp;
import com.ute.sportswearbe.services.order.OrderService;
import com.ute.sportswearbe.services.payment.PaymentService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/rest/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @ApiOperation(value = "Create payment")
    @PostMapping
    @PreAuthorize("hasRole('MEMBER')")
    public ResponseEntity<?> createPayment(
            Principal principal,
            @RequestParam(value = "gateway", required = false, defaultValue = "vnpay") String gateway,
            @RequestParam(value = "orderID") String orderID,
            @RequestParam(value = "url_return") String url) throws IOException {
        PaymentResp resp = paymentService.createPayment(orderID, url, principal);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @ApiOperation(value = "Thông tin thanh toán sau khi thanh toán thành công")
    @GetMapping("/success-payment")
//    @PreAuthorize("hasRole('MENBER')")
    public ResponseEntity<?> uploadPayment(
            HttpServletResponse response,
            @RequestParam(value = "vnp_Amount", required = false) String amount,//vnp_Amount=52800000&
          @RequestParam(value = "vnp_BankCode", required = false) String bankCode,// vnp_BankCode=NCB&
          @RequestParam(value = "vnp_BankTranNo", required = false) String bankTranNo,// vnp_BankTranNo=VNP13905627&
          @RequestParam(value = "vnp_CardType", required = false) String cardType,// vnp_CardType=ATM&
          @RequestParam(value = "vnp_OrderInfo", required = false) String orderInfo,// vnp_OrderInfo=639b1e740d1db239339cd62c&
          @RequestParam(value = "vnp_PayDate", required = false) String payDate,// vnp_PayDate=20221215203820&
          @RequestParam(value = "vnp_ResponseCode", required = false) String responseCode,// vnp_ResponseCode=00&
          @RequestParam(value = "vnp_TmnCode", required = false) String tmnCode,// vnp_TmnCode=20DZLTJ9&
          @RequestParam(value = "vnp_TransactionNo", required = false) String transactionNo,// vnp_TransactionNo=13905627&
          @RequestParam(value = "vnp_TransactionStatus", required = false) String vnp_TransactionStatus,// vnp_TransactionStatus=00&
          @RequestParam(value = "vnp_TxnRef", required = false) String txnRef,// vnp_TxnRef=639b1e740d1db239339cd62c&
          @RequestParam(value = "vnp_SecureHashType", required = false, defaultValue = "") String secureHashType,
          @RequestParam(value = "vnp_SecureHash", required = false) String secureHash,// vnp_SecureHash=ff5e6e4489e0e5e2b
          Principal principal) throws IOException{

        TransactionStatusDto result =  paymentService.transactionHandle(amount, bankCode, bankTranNo, cardType, orderInfo,
                payDate, responseCode, tmnCode, transactionNo,txnRef, secureHashType, secureHash, principal);
        if (result.getStatus().equals("02")){
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
        if (result.getStatus().equals("11"))
        {
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }

        response.sendRedirect("http://localhost:3000/order");
        return null;
    }

}