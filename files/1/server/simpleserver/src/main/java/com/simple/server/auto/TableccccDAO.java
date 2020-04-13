package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface TableccccRepository extends JpaRepository<Tablecccc, Long> {
    public  List<Tablecccc> findByName(String name);
    public  List<Tablecccc> findByNameLike(String name);

    public  Tablecccc findOneByName(String name);

    
        
}
