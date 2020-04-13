package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class TableccccService {
	@Autowired
	TableccccRepository dao;
	public List<Tablecccc> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Tablecccc> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Tablecccc> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Tablecccc findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Tablecccc findById(Long id){
		return dao.findOne(id);
	}
	public Tablecccc save(Tablecccc item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}
	
	
}
