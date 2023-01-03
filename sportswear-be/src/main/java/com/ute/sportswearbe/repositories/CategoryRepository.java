package com.ute.sportswearbe.repositories;

import com.ute.sportswearbe.entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
//
    List<Category> findAll();

    @Query(value = "{'title' : { '$regex': ?0, '$options': 'i' }}")
    Optional<Category> getCategoryByTitle(String title);

    Category findCategoryByTitle(String title);

    @Query(value = "{'title' : { '$regex': ?0, '$options': 'i' }}"
            , sort = "{'enable' : -1, 'title' : 1}")
    Page<Category> getCategoryPaging(String search, Pageable pageable);
//
//    Optional<Category> findCategoriesByTitle(String title);
}
