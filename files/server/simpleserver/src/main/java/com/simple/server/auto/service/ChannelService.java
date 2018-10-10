package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class ChannelService {
	@Autowired
	ChannelRepository dao;
	public List<Channel> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Channel> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Channel> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Channel findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Channel findById(Long id){
		return dao.findOne(id);
	}
	public Channel save(Channel item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Channel> findByMyproject(Long id){
        return dao.findByMyproject(id);
    }

                             

    public  List<Channel> findByIsenable(Long id){
        return dao.findByIsenable(id);
    }

                             
}
