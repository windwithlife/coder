package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class ChanneltabledefineService {
	@Autowired
	ChanneltabledefineRepository dao;
	public List<Channeltabledefine> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Channeltabledefine> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Channeltabledefine> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Channeltabledefine findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Channeltabledefine findById(Long id){
		return dao.findOne(id);
	}
	public Channeltabledefine save(Channeltabledefine item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Channeltabledefine> findByChannelId(Long id){
        return dao.findByChannelId(id);
    }

                             

    public  List<Channeltabledefine> findByChannelName(Long id){
        return dao.findByChannelName(id);
    }

                             

    public  List<Channeltabledefine> findByTabledefineId(Long id){
        return dao.findByTabledefineId(id);
    }

                             

    public  List<Channeltabledefine> findByTabledefineName(Long id){
        return dao.findByTabledefineName(id);
    }

                             
}
