package com.simple.server.auto.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class TestService {
	@Autowired
	TestRepository dao;
	public List<Test> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Test> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Test> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Test findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Test findById(Long id){
		return dao.findOne(id);
	}
	public Test save(Test item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}
	
	
}
