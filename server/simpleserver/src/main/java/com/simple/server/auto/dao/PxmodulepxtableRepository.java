package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxmodulepxtableRepository extends JpaRepository<Pxmodulepxtable, Long> {
    public  List<Pxmodulepxtable> findByName(String name);
    public  List<Pxmodulepxtable> findByNameLike(String name);

    public  Pxmodulepxtable findOneByName(String name);

    
       public List<Pxmodulepxtable> findByPxmoduleId(Long id);

                   
       public List<Pxmodulepxtable> findByPxmoduleName(Long id);

                   
       public List<Pxmodulepxtable> findByPxtableId(Long id);

                   
       public List<Pxmodulepxtable> findByPxtableName(Long id);

                   
}
