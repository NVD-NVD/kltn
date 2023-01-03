package com.ute.sportswearbe.services.category;

import com.ute.sportswearbe.dtos.CategoryDto;
import com.ute.sportswearbe.entities.Category;
import com.ute.sportswearbe.entities.Product;
import com.ute.sportswearbe.exceptions.InvalidException;
import com.ute.sportswearbe.exceptions.ServerException;
import com.ute.sportswearbe.repositories.CategoryRepository;
import com.ute.sportswearbe.services.product.ProductService;
import com.ute.sportswearbe.utils.PageUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductService productService;

    @Override
    public Category getCategoryByTitle(String title) {
        return categoryRepository.findCategoryByTitle(title);
//        return categoryRepository.getCategoryByTitle(title).orElse(null);
    }

    @Override
    public Category getCategoryById(String id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> getCategoryPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return categoryRepository.getCategoryPaging(search, pageable);
    }

    @Override
    public Page<Product> getProductFromCategoryPaging(String search, int page, int size, String sort, String column) {
        return null;
    }

    @Override
    public Category createNewCategory(String title) {
        if (getCategoryByTitle(title)!= null)
            throw new InvalidException(String.format("Category có Title %s đã tồn tại.", title));
        return save(new Category(null, title, null, new Date(), new Date(), true));
    }

    @Override
    public String deleteCategory(String id) {
        Category category = getCategoryById(id);
        if (category == null)
            throw new InvalidException(String.format("Category có ID %s không tồn tại.", id));
        category.setEnable(false);
        categoryRepository.delete(category);
        return "Đã xóa thành công.";
    }

    @Override
    public Category addProductsToCategory(String categoryId, List<String> productID) {
        Category category = getCategoryById(categoryId);
        List<Product> productsOfCategory = category.getProductsOfCategory();

        //Get list product by productID
        List<Product> products = getProductList(productID);
        //Create iterator from products(created above)
        Iterator<Product> iteratorProID = products.iterator();

        while (iteratorProID.hasNext()){
            Product product = iteratorProID.next();
            Iterator<Product> iterator = productsOfCategory.iterator();
            while (iterator.hasNext()){
                Product prod = iterator.next();
                if (!prod.getId().equals(product.getId())){
                    products.add(product);
                    break;
                }
            }
        }
        productsOfCategory.addAll(products);

        category.setProductsOfCategory(productsOfCategory);
        return save(category);
    }

    @Override
    public Category removeProductsFromCategory(String categoryId, List<String> productID) {
        Category category = getCategoryById(categoryId);
        Iterator<Product> iterator = category.getProductsOfCategory().iterator();
        List<Product> products = getProductList(productID);

        while (iterator.hasNext()){
            boolean flag = false;
            Product product = iterator.next();
            Iterator<Product> iteratorProd = products.iterator();
            while (iteratorProd.hasNext()){
                Product prod = iteratorProd.next();
                if (!prod.getId().equals(product.getId())){
                    iteratorProd.remove();
                    flag = true;
                    break;
                }
            }
            if (flag) iterator.remove();
        }
        return null;
    }

    @Override
    public Category changeStatusCategory(String id) {
        Category category = getCategoryById(id);
        category.setEnable(!category.isEnable());
        return save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        if (category.getId() ==  null){
            throw new InvalidException(String.format("Category có id %s không tồn tại.", category.getId()));
        }
        return save(category);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<String> getListNameCategory() {
        List<Category> categories = categoryRepository.findAll();
        List<String> titles = new ArrayList<>();
        for (int i = 0; i < categories.size(); i++) {
            titles.set(i, categories.get(i).getTitle());
        }
        return titles;
    }

    private List<Product> getProductList(List<String> id){
        List<Product> products = new ArrayList<>();
        for (int i = 0; i <id.size(); i++) {
            Product product = productService.getProductByIdReturnNull(id.get(i));
            if (product != null){
                products.add(product);
            }
        }
        return products;
    }
}
