package com.ute.sportswearbe.config;

import com.ute.sportswearbe.entities.*;
import com.ute.sportswearbe.entities.embedded.EmbeddedProductsInOrder;
import com.ute.sportswearbe.repositories.*;
import com.ute.sportswearbe.services.category.CategoryService;
import com.ute.sportswearbe.services.order.OrderService;
import com.ute.sportswearbe.services.product.ProductService;
import com.ute.sportswearbe.services.user.UserService;
import com.ute.sportswearbe.utils.enums.EnumGender;
import com.ute.sportswearbe.utils.enums.EnumRole;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class DataSeedingListener implements CommandLineRunner {
    @Value("${host}")
    private String host;
    @Value("${default.avatar}")
    private String avatar;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void run(String... args) throws Exception {
//        userRepository.deleteAll();
//        orderRepository.deleteAll();
//        categoryRepository.deleteAll();
//        productRepository.deleteAll();
//        transactionRepository.deleteAll();
        if (userRepository.count() == 0){
            User user = new User();
            user.setName("Datng");
            user.setEmail("zerodev247@gmail.com");
            user.setPassword(passwordEncoder.encode("12345678"));
            user.setRoles(Arrays.asList(EnumRole.ROLE_ADMIN.name(), EnumRole.ROLE_MEMBER.name()));
            user.setPhone("0989542812");
            user.setGender(EnumGender.Male.name());
            user.setBirthday(new SimpleDateFormat("dd-MM-yyyy").parse("20-03-1997"));
            user.setAvatar(host+"/rest/image/avatar/"+avatar);
            user.setCreatedOn(new Date());
            user.setUpdateOn(new Date());
            userRepository.save(user);
        }
//        List<Order> orders = orderService.getAllOrder();
//        List<Order> order_n= new ArrayList<>();
//        Iterator<Order> iterator= orders.iterator();
//        while (iterator.hasNext()){
//            Order order_iter = iterator.next();
//            Order order = new Order();
//            order.setId(order_iter.getId());
//            order.setUser(order_iter.getUser());
//
//            List<EmbeddedProductsInOrder> productsInOrder_iter = order_iter.getProductsInOrder();
//            List<EmbeddedProductsInOrder> productsInOrder_new = new ArrayList<>();
//            Iterator<EmbeddedProductsInOrder> products_iter = productsInOrder_iter.iterator();
//            while (products_iter.hasNext()){
//                EmbeddedProductsInOrder inOrder= products_iter.next();
//                EmbeddedProductsInOrder newProInOrder = new EmbeddedProductsInOrder();
//                Product product = productService.getProductById(inOrder.getProduct().getId());
//                newProInOrder.setProduct(product);
//                newProInOrder.setQuantity(inOrder.getQuantity());
//                newProInOrder.setOptions(inOrder.getOptions());
//                newProInOrder.setPrice(inOrder.getPrice());
//                newProInOrder.setDiscount(inOrder.getDiscount());
//                newProInOrder.setTotal(inOrder.getTotal());
//                productsInOrder_new.add(newProInOrder);
//            }
//            order.setProductsInOrder(productsInOrder_new);
//            order.setTotal(order_iter.getTotal());
//            order.setAddress(order_iter.getAddress());
//            order.setPhone(order_iter.getPhone());
//            order.setNote(order_iter.getNote());
//            order.setProcessing(order_iter.getProcessing());
//            order.setPayment(order_iter.getPayment());
//            order.setCreatedOn(order_iter.getCreatedOn());
//            order.setUpdateOn(order_iter.getUpdateOn());
//            order.setEnable(order_iter.isEnable());
//            order_n.add(order);
//        }
//        orderRepository.deleteAll();
//        order_n.forEach((e) -> orderService.save(e));
//        if (userRepository.count() == 0){
//            User user = new User();
//            user.setName("Admin");
//            user.setEmail("zerodev247@gmail.com");
//            user.setPassword(passwordEncoder.encode("12345678"));
//            user.setRoles(Arrays.asList(EnumRole.ROLE_ADMIN.name(), EnumRole.ROLE_MEMBER.name()));
//            user.setPhone("0989542812");
//            user.setGender(EnumGender.Male.name());
//            user.setBirthday(new SimpleDateFormat("dd-MM-yyyy").parse("20-03-1997"));
//            user.setAvatar(host+"/rest/image/avatar/"+avatar);
//            user.setCreatedOn(new Date());
//            user.setUpdateOn(new Date());
//            userRepository.save(user);
//        } else{
//            List<User> users = userService.getAllUser();
//            Iterator<User> iterator = users.iterator();
//            while (iterator.hasNext()){
//                User user = iterator.next();
//                user.setAvatar(host+"/rest/image/avatar/"+avatar);
//                userService.save(user);
//            }
//        }
//        if (productService.getAllProduct().size() > 0){
//            List<Product> products = productService.getAllProduct();
//            Iterator<Product> iterator = products.iterator();
//            while (iterator.hasNext()){
//                Product product = iterator.next();
//                List<String> images = product.getImages()
//                                        .stream().map(e ->{
//                                            return host+"/rest/image/"+e;
//                        }).collect(Collectors.toList());
//                System.out.printf(product.getId());
//                images.forEach(e -> System.out.printf(" " +e));
//            }
//        }
//        if (categoryRepository.count() == 0){
//            List<Category> list = new ArrayList<>();
//            if (categoryService.getCategoryByTitle("New") == null)
//                list.add(new Category(null, "New", null, new Date(), new Date(), true));
//            else
//                System.out.println("Category NEW đã tồn tại");
//            list.add(categoryService.createNewCategory("Nam"));
//
//            categoryRepository.saveAll(list);
//        }
    }
    

}
