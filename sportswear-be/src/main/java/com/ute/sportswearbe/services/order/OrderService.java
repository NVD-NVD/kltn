package com.ute.sportswearbe.services.order;

import com.ute.sportswearbe.dtos.OrderDto;
import com.ute.sportswearbe.entities.Order;
import org.springframework.data.domain.Page;

import java.security.Principal;
import java.util.List;

public interface OrderService {
    List<Order> getAllOrder();
    List<Order> getAllOrderByPrincipal(Principal principal);

    Page<Order> getOrdersPaging(String search, int page, int size, String sort, String column);

    Order getOrderById(String id);

    List<Order> getOrderByUserId(String userId);

    Page<Order> getAllOrderByUserIdPaging(String userId, int page, int size, String sort, String column);

    Order createNewOrder(Principal principal, OrderDto dto);

    Order disableOrder(Principal principal, String orderID);

    Order changeStatusOrder(String id);

    Object changeProcessingOrder(String id, String processing);

    Order callOffOrder(String userID, String orderID);

    List<Order> getListOrderByUserIdWithIf(String id, int status, Principal principal);

    List<Order> getOrderSuccessByUserId(String id);

    Order getOrderByIdForPayment(String id);

    Order save(Order order);

}
