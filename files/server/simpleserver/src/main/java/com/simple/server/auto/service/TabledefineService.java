package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class TabledefineService {
	@Autowired
	TabledefineRepository dao;
	public List<Tabledefine> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Tabledefine> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Tabledefine> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Tabledefine findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Tabledefine findById(Long id){
		return dao.findOne(id);
	}
	public Tabledefine save(Tabledefine item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Tabledefine> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
