package com.ute.sportswearbe.repositories;

import com.ute.sportswearbe.entities.Order;
import com.ute.sportswearbe.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    @Query(value = "{'$or': [{'user.id' : { '$regex': ?0, '$options': 'i' } }, {'orderDate' : { '$regex': ?0, '$options': 'i' } }" +
            ", {'phone': { '$regex': ?0, '$options': 'i' }} ]}"
            , sort = "{'enable' : -1, 'title' : 1}")
    Page<Order> getOrdersPaging(String search, Pageable pageable);

    @Query(value = "{'user.id': ?0}")
    List<Order> getOrderByUserId(String userId);

    @Query(value = "{'user.id': ?0}")
    Page<Order> getAllOrderByUserIdPaging(String userId, Pageable pageable);
}
