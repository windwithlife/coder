package com.simple.server.auto.MedicalLive.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.MedicalLive.dao.*;
import com.simple.server.auto.MedicalLive.entity.*;


@Service
public class RoomService {
	@Autowired
	RoomRepository dao;
	public List<Room> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Room> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Room> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Room findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Room findById(Long id){
		return dao.findOneById(id);
	}
	public Room save(Room item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}
	
	
}
