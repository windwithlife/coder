package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface TestRepository extends JpaRepository<Test, Long> {
    public  List<Test> findByName(String name);
    public  List<Test> findByNameLike(String name);

    public  Test findOneByName(String name);

    
        
}
