package com.simple.server.auto.dao;

import java.util.List;

import com.simple.server.auto.entity.Test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TestDAO extends JpaRepository<Test, Long> {
    public  List<Test> findByName(String name);
    public  List<Test> findByNameLike(String name);

    public  Test findOneByName(String name);

    
        
}
