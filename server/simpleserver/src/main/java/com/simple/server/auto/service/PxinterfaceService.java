package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxinterfaceService {
	@Autowired
	PxinterfaceRepository dao;
	public List<Pxinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxinterface findById(Long id){
		return dao.findOne(id);
	}
	public Pxinterface save(Pxinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxinterface> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
