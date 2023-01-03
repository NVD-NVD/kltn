package com.ute.sportswearbe.services.order;

import com.ute.sportswearbe.dtos.OrderDto;
import com.ute.sportswearbe.entities.Order;
import com.ute.sportswearbe.entities.Product;
import com.ute.sportswearbe.entities.User;
import com.ute.sportswearbe.entities.embedded.EmbeddedOption;
import com.ute.sportswearbe.entities.embedded.EmbeddedPrice;
import com.ute.sportswearbe.entities.embedded.EmbeddedProductsInOrder;
import com.ute.sportswearbe.entities.embedded.EmbeddedSize;
import com.ute.sportswearbe.exceptions.InvalidException;
import com.ute.sportswearbe.exceptions.NotFoundException;
import com.ute.sportswearbe.repositories.OrderRepository;
import com.ute.sportswearbe.services.product.ProductService;
import com.ute.sportswearbe.services.user.UserService;
import com.ute.sportswearbe.utils.PageUtils;
import com.ute.sportswearbe.utils.enums.EnumProcessing;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Override
    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getAllOrderByPrincipal(Principal principal) {
        User user = userService.getUserByPrincipal(principal);
        if (user == null){
            throw new NotFoundException("Không tìm thấy user");
        }
        List<Order> orders = getOrderByUserId(user.getId());
        return orders;
    }

    @Override
    public Page<Order> getOrdersPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return orderRepository.getOrdersPaging(search, pageable);
    }

    @Override
    public Order getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Order có id %s không tồn tại", id)));
    }

    @Override
    public List<Order> getOrderByUserId(String userId) {
        return orderRepository.getOrderByUserId(userId);
    }

    @Override
    public Page<Order> getAllOrderByUserIdPaging(String userId, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return orderRepository.getAllOrderByUserIdPaging(userId, pageable);
    }

    @Override
    public Order createNewOrder(Principal principal, OrderDto dto) {
        User user = userService.getUserByPrincipal(principal);
        if (user == null){
            throw new NotFoundException("Không tìm thấy user");
        }
        Order order = new Order();
        order.setUser(user);

        List<EmbeddedProductsInOrder> productsInOrder = new ArrayList<>();
        dto.getProductsInOrder().forEach(
                e -> {
                    Product product = productService.getProductById(e.getProductID());
                    EmbeddedProductsInOrder embeddedProductsInOrder = new EmbeddedProductsInOrder();
                    embeddedProductsInOrder.setProduct(product);
                    embeddedProductsInOrder.setQuantity(e.getQuantity());
                    embeddedProductsInOrder.setOptions(e.getOptions());
                    embeddedProductsInOrder.setDiscount(product.getDiscount());
                    float price = product.getPrice().getPrice();
                    float total = (price - price*(product.getDiscount()/100)) * e.getQuantity();
                    embeddedProductsInOrder.setTotal(total);
                    productsInOrder.add(embeddedProductsInOrder);
                });
        order.setProductsInOrder(productsInOrder);

        List<Product> products = new ArrayList<>();
        for (int i = 0; i < productsInOrder.size(); i++) {
            EmbeddedProductsInOrder emp = productsInOrder.get(i);
            Product product = emp.getProduct();
            if (!product.isEnable()){
                throw new InvalidException(String.format("Product có id %s đã bị khoá.", product.getId()));
            }

            List<EmbeddedSize> emSize = emp.getOptions().getSizes();
            List<EmbeddedSize> proSize = product.getOptions().getSizes();
            for (int j = 0; j < emSize.size(); j++) {
                String emSizeTitle = emSize.get(j).getSize().toLowerCase();
                int emSizeQuantity = emSize.get(j).getQuantity();

                for (int k = 0; k < proSize.size(); k++) {
                    EmbeddedSize size = proSize.get(k);
                    String proSizeTitle = size.getSize().toLowerCase();
                    int proSizeQuantity = size.getQuantity();
                    if (emSizeTitle.toLowerCase().equals(proSizeTitle.toLowerCase())){
                        if (emSizeQuantity <= proSizeQuantity){
                            proSizeQuantity = proSizeQuantity - emSizeQuantity;
                            size.setQuantity(proSizeQuantity);
                            proSize.set(k, size);
                            product.setQuantity(product.getQuantity()-emSizeQuantity);
                        }else {
                            throw new InvalidException(String.format("Product có id %s không đủ số lượng cho Size %s.", product.getId(), emSizeTitle.toUpperCase()));
                        }
                    }
                }
            }
            EmbeddedOption option = product.getOptions();
            option.setSizes(proSize);
            product.setOptions(option);
            products.add(product);
        }

        float total = 0.0F;
        for (EmbeddedProductsInOrder embeddedBookInOrder : productsInOrder) {
            total += embeddedBookInOrder.getTotal();
        }
        EmbeddedPrice price = new EmbeddedPrice();
        price.setPrice(total);
        order.setTotal(price);
        if (dto.getAddressForShipping() != null)
            order.setAddress(dto.getAddressForShipping());
        order.setPhone(dto.getPhone());
        order.setNote(dto.getNote());

        order.setCreatedOn(new Date());
        order.setUpdateOn(new Date());
        order.setPayment(null);
        order.setProcessing(EnumProcessing.Chua_Xu_Ly.name());

        order.setEnable(true);

        products.forEach((e) -> productService.save(e));

        return orderRepository.save(order);
    }

    @Override
    public Order disableOrder(Principal principal, String orderID) {
        User user = userService.getUserByPrincipal(principal);
        if (user == null){
            throw new NotFoundException("Không tìm thấy user");
        }
        Order order = getOrderById(orderID);
        order.setEnable(false);
        return save(order);
    }

    @Override
    public Order callOffOrder(String userID, String orderID) {
        User user = userService.getUserByID(userID);
        if (user == null){
            throw new NotFoundException("Không tìm thấy user");
        }
        Order order = getOrderById(orderID);
//        if (order.getUser().getId().equals(userID)){
//            throw new NotFoundException(String.format("Huy đơn không thành công, đơn không đúng user"));
//        }
        if (!order.getProcessing().equals("Chua_Xu_Ly")){
            throw new InvalidException("Đơn hàng không thể huy, do đã được xử lý.");
        }
        order.setEnable(false);
        return save(order);
    }

    @Override
    public Order changeStatusOrder(String id) {
        Order order = getOrderById(id);
        order.setEnable(!order.isEnable());
        return save(order);
    }

    @Override
    public Object changeProcessingOrder(String id, String processing) {
        Order order = getOrderById(id);
        if (order == null)
            throw new NotFoundException(String.format("Order có id %s không tồn tại.", id));

        order.setProcessing(processing);

        return save(order);
    }

    @Override
    public List<Order> getListOrderByUserIdWithIf(String id, int status, Principal principal) {
        return null;
    }

    @Override
    public List<Order> getOrderSuccessByUserId(String id) {
        return null;
    }

    @Override
    public Order getOrderByIdForPayment(String id) {
        return null;
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

}
