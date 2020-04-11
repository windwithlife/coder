package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxinterfaceRepository extends JpaRepository<Pxinterface, Long> {
    public  List<Pxinterface> findByName(String name);
    public  List<Pxinterface> findByNameLike(String name);

    public  Pxinterface findOneByName(String name);

    
       public List<Pxinterface> findByStatus(Long id);

                   
}
