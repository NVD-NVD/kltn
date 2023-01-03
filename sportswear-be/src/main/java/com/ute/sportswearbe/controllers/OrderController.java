package com.ute.sportswearbe.controllers;

import com.ute.sportswearbe.dtos.OrderDto;
import com.ute.sportswearbe.entities.Order;
import com.ute.sportswearbe.entities.User;
import com.ute.sportswearbe.exceptions.NotFoundException;
import com.ute.sportswearbe.services.order.OrderService;
import com.ute.sportswearbe.services.user.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/rest/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @ApiOperation(value = "Get tất cả Order của User bàng token", notes = "User")
    @PreAuthorize("hasRole('MEMBER')")
    @GetMapping()
    public ResponseEntity<?> getAllOrderByPrincipal(Principal principal){
        return new ResponseEntity<>(orderService.getAllOrderByPrincipal(principal), HttpStatus.OK);
    }

    @ApiOperation(value = "Get tất cả Order của User", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/")
    public ResponseEntity<?> getOrderOfUser(@PathVariable String id){
        return new ResponseEntity<>(orderService.getOrderByUserId(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Get tất cả Order không phân trang cho admin", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrder(){
        return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
    }

    @ApiOperation(value = "Get list Order có phân trang cho admin", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<Page<Order>> getOrdersPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "orderDate") String column){
        return new ResponseEntity<>(
                orderService.getOrdersPaging(search,page,size,sort,column), HttpStatus.OK);
    }

    @ApiOperation(value = "Get list order by order ID")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderByOrderID(
            @PathVariable(value = "id") String id){
        return new ResponseEntity<>(orderService.getOrderById(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Get list order success by userId", notes="Admin")
    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @GetMapping("/success/{id}")
    public ResponseEntity<List<Order>> getOrderSuccessByUserID(
            @PathVariable(value = "id") String id){
        return new ResponseEntity<>(orderService.getOrderSuccessByUserId(id), HttpStatus.OK);
    }

    @ApiOperation(value = "User tạo đơn đặt hàng", notes = "User")
    @PreAuthorize("hasRole('MEMBER')")
    @PostMapping
    public ResponseEntity<Order> createNewOrder(Principal principal, @RequestBody OrderDto dto){
        return new ResponseEntity<>(orderService.createNewOrder(principal, dto), HttpStatus.OK);
    }

    @ApiOperation(value = "User hủy đơn hàng(nếu đơn hàng chưa được xử lý)", notes = "User")
    @PreAuthorize("hasRole('MEMBER')")
    @DeleteMapping("/{orderID}")
    public ResponseEntity<Order> callOffOrder(
            @PathVariable(value = "orderID") String orderID,
            Principal principal){
        User user = userService.getUserByPrincipal(principal);
        if (user == null){
            throw new NotFoundException(String.format("Huỹ đơn không thành công. Không tìm thấy user có id %s", user.getId()));
        }
        User userToken = userService.getUserByPrincipal(principal);
        if (userToken == null){
            throw new NotFoundException("Không tìm thấy user");
        }
        return new ResponseEntity<>(orderService.callOffOrder(user.getId(), orderID), HttpStatus.OK);
    }

    @ApiOperation(value = "Admin thay đổi trang thái đơn hàng", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Order> changeStatusOrder(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(orderService.changeStatusOrder(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Admin xử lý đơn hàng", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/processing")
    public ResponseEntity<?> changeProcessingOrder(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "processing") String processing){
        return new ResponseEntity<>(orderService.changeProcessingOrder(id, processing), HttpStatus.OK);
    }
}
