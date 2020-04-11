package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxtableService {
	@Autowired
	PxtableRepository dao;
	public List<Pxtable> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxtable> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxtable> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxtable findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxtable findById(Long id){
		return dao.findOne(id);
	}
	public Pxtable save(Pxtable item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxtable> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
