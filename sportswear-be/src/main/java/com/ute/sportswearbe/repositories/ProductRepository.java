package com.ute.sportswearbe.repositories;

import com.ute.sportswearbe.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query(value = "{'title': {'$regex' : ?0, '$options': 'i'}} ")
    Optional<Product> getProductByTitle(String id);

//    List<Product> findAll();
//
    @Query(value = "{'$or': [{'title' : { '$regex': ?0, '$options': 'i' } }, {'options.size' : { '$regex': ?0, '$options': 'i' } }" +
            ", {'fallIntoCategories.name': { '$regex': ?0, '$options': 'i' }}" +
            ", {'trademark': { '$regex': ?0, '$options': 'i' }}" +
            ", {'origin': { '$regex': ?0, '$options': 'i' }}" +
            ", {'producer': { '$regex': ?0, '$options': 'i' }} ]}"
            , sort = "{'enable' : -1, 'title' : 1}")
    Page<Product> getProductsPaging(String search, Pageable pageable);


}
