package com.ute.sportswearbe.services.payment;

import com.ute.sportswearbe.dtos.TransactionStatusDto;
import com.ute.sportswearbe.entities.Order;
import com.ute.sportswearbe.entities.Transaction;
import com.ute.sportswearbe.entities.User;
import com.ute.sportswearbe.entities.embedded.EmbeddedOption;
import com.ute.sportswearbe.entities.embedded.EmbeddedPayment;
import com.ute.sportswearbe.exceptions.InvalidException;
import com.ute.sportswearbe.models.PaymentResp;
import com.ute.sportswearbe.models.VNPay;
import com.ute.sportswearbe.services.order.OrderService;
import com.ute.sportswearbe.services.transaction.TransactionService;
import com.ute.sportswearbe.services.user.UserService;
import com.ute.sportswearbe.utils.enums.EnumPaymentProcess;
import com.ute.sportswearbe.utils.enums.EnumProcessing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Primary
public class VNPayService implements PaymentService{
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private TransactionService transactionService;

    @Override
    public PaymentResp createPayment(String orderID, String url, Principal principal) throws IOException {
        User user = userService.getUserByPrincipal(principal);
        Order order = orderService.getOrderById(orderID);

        int amount = (int) (order.getTotal().getPrice() * 100);
//        double amount = order.getTotal()
        Map<String, String> vnp_params = new HashMap<>();

        Map vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPay.vnp_Version);
        vnp_Params.put("vnp_Command", VNPay.vnp_Command);
        vnp_Params.put("vnp_TmnCode", VNPay.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", VNPay.vnp_CurrCode);
//        String bank_code = paymentDto.getBankCode();
        String bank_code = "";
        if (bank_code != null && !bank_code.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bank_code);
        }
        vnp_Params.put("vnp_TxnRef", order.getId());
        vnp_Params.put("vnp_OrderInfo", orderID);
        vnp_Params.put("vnp_OrderType", VNPay.vnp_OrderType);

        vnp_Params.put("vnp_Locale", VNPay.vnp_Locale);

        vnp_Params.put("vnp_ReturnUrl", VNPay.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", VNPay.vnp_IpAddr);
        //vnp_Params.put("vnp_SecureHash", VNPay.vnp_HashSecret);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.DATE, 1);
//        cld.add(Calendar.);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        //Add Params of 2.1.0 Version
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        //Build data to hash and querystring
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPay.hmacSHA512(VNPay.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPay.vnp_PayUrl + "?" + queryUrl;

        Transaction transaction = createTransaction(String.valueOf(amount), bank_code, "", "",orderID, "",
                                        "", VNPay.vnp_TmnCode, "", VNPay.vnp_TxnRef, VNPay.vnp_HashSecret, VNPay.vnp_SecureHash);
        transaction.setCreatedOn(new Date());
        transaction.setUpdateOn(new Date());
        Transaction t = transactionService.save(transaction);

        EmbeddedPayment ep = new EmbeddedPayment();
        ep.setPaymentID(t.getId());
        ep.setTransactionID(t.getId());
        ep.setProcessing(EnumPaymentProcess.Chua_Thanh_Toan.name());
        ep.setCreateDate(new Date());
        ep.setUpdateDate(new Date());
        order.setPayment(ep);
        order.setProcessing(EnumProcessing.Chua_Xu_Ly.name());
        Order o = orderService.save(order);
        transaction.setOrder(o);
        t = transactionService.save(transaction);

        PaymentResp result = new PaymentResp();
        result.setStatus("00");
        result.setMessage("success");
        result.setUrl(paymentUrl);
        return result;
    }

    @Override
    public TransactionStatusDto transactionHandle(String amount, String bankCode, String bankTranNo,
                                                  String cardType, String orderInfo, String payDate,
                                                  String responseCode, String tmnCode, String transactionNo,
                                                  String txnRef, String secureHashType, String secureHash,
                                                  Principal principal) {
        TransactionStatusDto result = new TransactionStatusDto();
        if (!responseCode.equalsIgnoreCase("00")){
            result.setStatus("02");
            result.setMessage("Failed");
            result.setData(null);
            return result;
        }
        Order order = orderService.getOrderById(orderInfo);
        if (order == null){
            result.setStatus("11");
            result.setMessage("Order does not exist");
            result.setData(null);
            return result;
        }


        //User user = userService.getUser(principal);
        Transaction transaction = updateTransaction(amount, bankCode, bankTranNo,
                                        cardType, orderInfo,payDate, responseCode, tmnCode, transactionNo,
                                        txnRef,secureHashType,secureHash);
        EmbeddedPayment payment = order.getPayment();
        payment.setProcessing(EnumPaymentProcess.Da_Thanh_Toan.name());
        order.setPayment(payment);
        order = orderService.save(order);
        transaction.setOrder(order);
        transactionService.save(transaction);

        result.setStatus("00");
        result.setMessage("success");
        result.setData(order.toString());
        return result;
    }

    private Transaction updateTransaction(String amount, String bankCode, String bankTranNo,
                                          String cardType, String orderInfo, String payDate,
                                          String responseCode, String tmnCode, String transactionNo,
                                          String txnRef, String secureHashType, String secureHash){
        Transaction transaction = transactionService.getTransactionByOrderID(orderInfo);

        transaction.setAmount(amount);
        transaction.setBankCode(bankCode);
        transaction.setBankTranNo(bankTranNo);
        transaction.setCardType(cardType);
        transaction.setOrderInfo(orderInfo);
        transaction.setPayDate(payDate);
        transaction.setResponseCode(responseCode);
        transaction.setTmnCode(tmnCode);
        transaction.setTransactionNo(transactionNo);
        transaction.setTxnRef(txnRef);
        transaction.setSecureHashType(secureHashType);
        transaction.setSecureHash(secureHash);
        transaction.setUpdateOn(new Date());

        return transaction;
    }

    private Transaction createTransaction(String amount, String bankCode, String bankTranNo,
                              String cardType, String orderInfo, String payDate,
                              String responseCode, String tmnCode, String transactionNo,
                              String txnRef, String secureHashType, String secureHash){
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setBankCode(bankCode);
        transaction.setBankTranNo(bankTranNo);
        transaction.setCardType(cardType);
        transaction.setOrderInfo(orderInfo);
        transaction.setPayDate(payDate);
        transaction.setResponseCode(responseCode);
        transaction.setTmnCode(tmnCode);
        transaction.setTransactionNo(transactionNo);
        transaction.setTxnRef(txnRef);
        transaction.setSecureHashType(secureHashType);
        transaction.setSecureHash(secureHash);
        transaction.setCreatedOn(new Date());
        transaction.setUpdateOn(new Date());

        return transaction;
    }
}
