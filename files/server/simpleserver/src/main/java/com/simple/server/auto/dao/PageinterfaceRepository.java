package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PageinterfaceRepository extends JpaRepository<Pageinterface, Long> {
    public  List<Pageinterface> findByName(String name);
    public  List<Pageinterface> findByNameLike(String name);

    public  Pageinterface findOneByName(String name);

    
       public List<Pageinterface> findByStatus(Long id);

                   
}
