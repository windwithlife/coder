package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxchannelService {
	@Autowired
	PxchannelRepository dao;
	public List<Pxchannel> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxchannel> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxchannel> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxchannel findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxchannel findById(Long id){
		return dao.findOne(id);
	}
	public Pxchannel save(Pxchannel item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxchannel> findByProjectId(Long id){
        return dao.findByProjectId(id);
    }

                             

    public  List<Pxchannel> findByIsenable(Long id){
        return dao.findByIsenable(id);
    }

                             
}
