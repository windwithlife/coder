package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PagepageinterfaceRepository extends JpaRepository<Pagepageinterface, Long> {
    public  List<Pagepageinterface> findByName(String name);
    public  List<Pagepageinterface> findByNameLike(String name);

    public  Pagepageinterface findOneByName(String name);

    
       public List<Pagepageinterface> findByPageId(Long id);

                   
       public List<Pagepageinterface> findByPageName(Long id);

                   
       public List<Pagepageinterface> findByPageinterfaceId(Long id);

                   
       public List<Pagepageinterface> findByPageinterfaceName(Long id);

                   
}
