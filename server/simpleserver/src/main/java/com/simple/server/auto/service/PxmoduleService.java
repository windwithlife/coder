package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxmoduleService {
	@Autowired
	PxmoduleRepository dao;
	public List<Pxmodule> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxmodule> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxmodule> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxmodule findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxmodule findById(Long id){
		return dao.findOne(id);
	}
	public Pxmodule save(Pxmodule item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxmodule> findByIsenable(Long id){
        return dao.findByIsenable(id);
    }

                             
}
