package camt.se331.shoppingcart.repository;

import camt.se331.shoppingcart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by HH on 2016/3/22.
 */
public interface ProductRepository extends JpaRepository<Product,Long>{
    
}

