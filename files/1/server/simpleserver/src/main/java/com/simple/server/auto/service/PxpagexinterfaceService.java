package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxpagexinterfaceService {
	@Autowired
	PxpagexinterfaceRepository dao;
	public List<Pxpagexinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxpagexinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxpagexinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxpagexinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxpagexinterface findById(Long id){
		return dao.findOne(id);
	}
	public Pxpagexinterface save(Pxpagexinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxpagexinterface> findByPxpageId(Long id){
        return dao.findByPxpageId(id);
    }

                             

    public  List<Pxpagexinterface> findByPxpageName(Long id){
        return dao.findByPxpageName(id);
    }

                             

    public  List<Pxpagexinterface> findByXinterfaceId(Long id){
        return dao.findByXinterfaceId(id);
    }

                             

    public  List<Pxpagexinterface> findByXinterfaceName(Long id){
        return dao.findByXinterfaceName(id);
    }

                             
}
