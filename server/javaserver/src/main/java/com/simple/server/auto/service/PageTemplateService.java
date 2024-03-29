package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PageTemplateService {
	@Autowired
	PageTemplateRepository dao;
	public List<PageTemplate> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<PageTemplate> findByName(String name){
		return dao.findByName(name);
	}
	public  List<PageTemplate> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public PageTemplate findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public PageTemplate findById(Long id){
		return dao.findOne(id);
	}
	public PageTemplate save(PageTemplate item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<PageTemplate> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
