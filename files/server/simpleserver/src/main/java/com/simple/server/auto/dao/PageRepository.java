package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PageRepository extends JpaRepository<Page, Long> {
    public  List<Page> findByName(String name);
    public  List<Page> findByNameLike(String name);

    public  Page findOneByName(String name);

    
       public List<Page> findByStatus(Long id);

                   
}
