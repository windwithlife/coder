package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxpagexinterfaceRepository extends JpaRepository<Pxpagexinterface, Long> {
    public  List<Pxpagexinterface> findByName(String name);
    public  List<Pxpagexinterface> findByNameLike(String name);

    public  Pxpagexinterface findOneByName(String name);

    
       public List<Pxpagexinterface> findByPxpageId(Long id);

                   
       public List<Pxpagexinterface> findByPxpageName(Long id);

                   
       public List<Pxpagexinterface> findByXinterfaceId(Long id);

                   
       public List<Pxpagexinterface> findByXinterfaceName(Long id);

                   
}
