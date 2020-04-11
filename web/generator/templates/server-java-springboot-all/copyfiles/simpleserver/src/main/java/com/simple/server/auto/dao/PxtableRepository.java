package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxtableRepository extends JpaRepository<Pxtable, Long> {
    public  List<Pxtable> findByName(String name);
    public  List<Pxtable> findByNameLike(String name);

    public  Pxtable findOneByName(String name);

    
       public List<Pxtable> findByStatus(Long id);

                   
}
