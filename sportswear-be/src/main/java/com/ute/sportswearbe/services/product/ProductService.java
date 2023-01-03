package com.ute.sportswearbe.services.product;

import com.ute.sportswearbe.dtos.ProductDto;
import com.ute.sportswearbe.entities.Product;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Product getProductById(String id);

    Product getProductByIdReturnNull(String id);

    Product getProductByTitle(String title);

    List<Product> getAllProduct();

    Page<Product> getProductsPaging(String search, int page, int size, String sort, String column);

    Product createNewProduct(ProductDto dto, MultipartFile[] images);

    Product updateProduct(String id, Product dto, MultipartFile[] images);

    Product changeStatusProduct(String id);

    Product addCategoryToProduct(String proId, List<String> cateId);

    Product removeCategoryFromProduct(String proId, List<String> cateId);

    Resource getImage(String filename);

    Product addImagesProduct(String id, MultipartFile[] images);

    Product deleteImagesProduct(String id, List<String> images);

    Product save(Product product);
}
