package com.ute.sportswearbe.controllers;

import com.ute.sportswearbe.dtos.CategoryDto;
import com.ute.sportswearbe.entities.Category;
import com.ute.sportswearbe.services.category.CategoryService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @ApiOperation(value = "Get all category")
    @GetMapping("/all")
    public ResponseEntity<?> getAllCategory(){
        return new ResponseEntity<>(categoryService.getAllCategory(), HttpStatus.OK);
    }

    @ApiOperation(value = "Get Category by id")
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id){
        return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Get danh sách Category có phân trang")
    @PostMapping("/paging")
    public ResponseEntity<Page<Category>> getCategoryPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "title") String column) {
        return new ResponseEntity<>(categoryService.getCategoryPaging(search, page, size, sort, column), HttpStatus.OK);
    }

//    @ApiOperation(value = "Get danh sách sản phẩm của 1 Category có phân trang")
//    @PostMapping("/paging/{id}")
//    public ResponseEntity<Page<?>> getproductOfCategoryPaging(
//            @PathVariable String id,
//            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
//            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
//            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
//            @RequestParam(name = "column", required = false, defaultValue = "productsOfCategory") String column) {
//        return new ResponseEntity<>(categoryService.getProductFromCategoryPaging(id, page, size, sort, column), HttpStatus.OK);
//    }

    @ApiOperation(value = "Admin tạo mới 1 category(name)", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<Category> createNewCategory(@RequestParam(name = "title") String title){
        return new ResponseEntity<>(categoryService.createNewCategory(title), HttpStatus.OK);
    }

    @ApiOperation(value = "Admin delete(xóa dưới db) category", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping()
    public ResponseEntity<String> deleteCategory(@RequestParam(name = "id") String id){
        return new ResponseEntity<>(categoryService.deleteCategory(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Admin thay đổi trạng thái kích hoạt của 1 category", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/status/change")
    public ResponseEntity<Category> changeStatusCategory(@RequestParam(name = "id") String id){
        return new ResponseEntity<>(categoryService.changeStatusCategory(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Admin update category", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/add/products")
    public ResponseEntity<Category> addProductsToCategory(
            @RequestParam(name = "cateID") String cateId,
            @RequestParam(name = "proID") List<String> proId){
        return new ResponseEntity<>(categoryService.addProductsToCategory(cateId, proId), HttpStatus.OK);
    }

    @ApiOperation(value = "Admin xóa product khỏi category", notes = "Admin")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/remove/products")
    public ResponseEntity<Category> removeProductsFromCategory(
            @RequestParam(name = "cateID") String cateId,
            @RequestParam(name = "proID") List<String> proId){
        return new ResponseEntity<>(categoryService.removeProductsFromCategory(cateId, proId), HttpStatus.OK);
    }
}
