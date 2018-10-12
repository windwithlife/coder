package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PageinterfaceService {
	@Autowired
	PageinterfaceRepository dao;
	public List<Pageinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pageinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pageinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pageinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pageinterface findById(Long id){
		return dao.findOne(id);
	}
	public Pageinterface save(Pageinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pageinterface> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
