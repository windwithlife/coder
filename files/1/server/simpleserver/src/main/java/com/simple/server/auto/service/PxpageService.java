package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxpageService {
	@Autowired
	PxpageRepository dao;
	public List<Pxpage> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxpage> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxpage> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxpage findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxpage findById(Long id){
		return dao.findOne(id);
	}
	public Pxpage save(Pxpage item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxpage> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
