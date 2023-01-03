package com.ute.sportswearbe.repositories;

import com.ute.sportswearbe.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Query(value = "{'$or': [{'email' : { '$regex': ?0, '$options': 'i' } }, {'name' : { '$regex': ?0, '$options': 'i' } }] }"
            , sort = "{'enable' : -1, 'email' : 1}")
    Page<User> getUserPaging(String search, Pageable pageable);

    @Query(value = "{'email' : ?0}")
    Optional<User> getUser(String email);

    @Query(value = "{'phone': ?0}")
    Optional<User> getUserCoreByPhone(String phone);

    @Query(value = "{'email': ?0}")
    Optional<User> getUserCoreByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findByIdAndEnableTrue(String id);

    Optional<User> findByPhone(String phone);
}