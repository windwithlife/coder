package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxmodulepxtableService {
	@Autowired
	PxmodulepxtableRepository dao;
	public List<Pxmodulepxtable> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxmodulepxtable> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxmodulepxtable> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxmodulepxtable findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxmodulepxtable findById(Long id){
		return dao.findOne(id);
	}
	public Pxmodulepxtable save(Pxmodulepxtable item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxmodulepxtable> findByPxmoduleId(Long id){
        return dao.findByPxmoduleId(id);
    }

                             

    public  List<Pxmodulepxtable> findByPxmoduleName(Long id){
        return dao.findByPxmoduleName(id);
    }

                             

    public  List<Pxmodulepxtable> findByPxtableId(Long id){
        return dao.findByPxtableId(id);
    }

                             

    public  List<Pxmodulepxtable> findByPxtableName(Long id){
        return dao.findByPxtableName(id);
    }

                             
}
