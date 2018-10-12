package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PageService {
	@Autowired
	PageRepository dao;
	public List<Page> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Page> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Page> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Page findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Page findById(Long id){
		return dao.findOne(id);
	}
	public Page save(Page item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Page> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
