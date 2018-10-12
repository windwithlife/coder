package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PagepageinterfaceService {
	@Autowired
	PagepageinterfaceRepository dao;
	public List<Pagepageinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pagepageinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pagepageinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pagepageinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pagepageinterface findById(Long id){
		return dao.findOne(id);
	}
	public Pagepageinterface save(Pagepageinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pagepageinterface> findByPageId(Long id){
        return dao.findByPageId(id);
    }

                             

    public  List<Pagepageinterface> findByPageName(Long id){
        return dao.findByPageName(id);
    }

                             

    public  List<Pagepageinterface> findByPageinterfaceId(Long id){
        return dao.findByPageinterfaceId(id);
    }

                             

    public  List<Pagepageinterface> findByPageinterfaceName(Long id){
        return dao.findByPageinterfaceName(id);
    }

                             
}
