package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface TabledefineRepository extends JpaRepository<Tabledefine, Long> {
    public  List<Tabledefine> findByName(String name);
    public  List<Tabledefine> findByNameLike(String name);

    public  Tabledefine findOneByName(String name);

    
       public List<Tabledefine> findByStatus(Long id);

                   
}
