package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxmoduleRepository extends JpaRepository<Pxmodule, Long> {
    public  List<Pxmodule> findByName(String name);
    public  List<Pxmodule> findByNameLike(String name);

    public  Pxmodule findOneByName(String name);

    
       public List<Pxmodule> findByIsenable(Long id);

                   
}
