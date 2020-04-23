package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class MedicalLiveService {
	@Autowired
	MedicalLiveRepository dao;
	public List<MedicalLive> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<MedicalLive> findByName(String name){
		return dao.findByName(name);
	}
	public  List<MedicalLive> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  MedicalLive findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public MedicalLive findById(Long id){
		return dao.findOneById(id);
	}
	public MedicalLive save(MedicalLive item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}
	
	
}
