package com.ute.sportswearbe.controllers;

import com.ute.sportswearbe.services.transaction.TransactionService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @ApiOperation(value = "")
    @GetMapping("/{id}")
    public ResponseEntity<?> getTransactionById(@PathVariable String id){
        return new ResponseEntity<>(transactionService.getTransactionByID(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllTransactions(){
        return  new ResponseEntity<>(transactionService.getAllTransaction(), HttpStatus.OK);
    }
    @ApiOperation(value = "Get danh sach Transaction có phân trang")
    @GetMapping("/paging")
    public ResponseEntity<Page<?>> getProductPaging(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @RequestParam(name = "page", required = false, defaultValue = "${paging.default.page}") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${paging.default.size}") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sort,
            @RequestParam(name = "column", required = false, defaultValue = "id") String column){
        return new ResponseEntity<>(transactionService.getTransactionPaging(search, page, size, sort, column), HttpStatus.OK);
    }

}
