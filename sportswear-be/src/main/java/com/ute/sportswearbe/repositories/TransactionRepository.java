package com.ute.sportswearbe.repositories;

import com.ute.sportswearbe.entities.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface TransactionRepository  extends MongoRepository<Transaction, String> {
//    List<Transaction> findAll();
//
//
//    Page<Transaction> getTransactionPaging(String search, Pageable pageable);

    @Query(value = "{'order.id': ?0}")
    Transaction getTransactionByOrderId(String orderID);

    @Query(value = "{'id': ?0}")
    Transaction getTransactionById(String orderID);

    Transaction findTransactionByOrder_Id(String orderID);

    @Query(value = "{'$or': [{'title' : { '$regex': ?0, '$options': 'i' } }, {'options.size' : { '$regex': ?0, '$options': 'i' } }" +
            ", {'fallIntoCategories.name': { '$regex': ?0, '$options': 'i' }}" +
            ", {'trademark': { '$regex': ?0, '$options': 'i' }}" +
            ", {'origin': { '$regex': ?0, '$options': 'i' }}" +
            ", {'producer': { '$regex': ?0, '$options': 'i' }} ]}"
            , sort = "{'enable' : -1, 'title' : 1}")
    Page<Transaction> getTransactionPaging(String search, Pageable pageable);
}
