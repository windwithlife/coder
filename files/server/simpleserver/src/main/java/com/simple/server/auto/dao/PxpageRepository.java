package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxpageRepository extends JpaRepository<Pxpage, Long> {
    public  List<Pxpage> findByName(String name);
    public  List<Pxpage> findByNameLike(String name);

    public  Pxpage findOneByName(String name);

    
       public List<Pxpage> findByStatus(Long id);

                   
}
