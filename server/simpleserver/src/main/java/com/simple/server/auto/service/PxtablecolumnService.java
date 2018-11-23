package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class PxtablecolumnService {
	@Autowired
	PxtablecolumnRepository dao;
	public List<Pxtablecolumn> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Pxtablecolumn> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Pxtablecolumn> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Pxtablecolumn findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Pxtablecolumn findById(Long id){
		return dao.findOne(id);
	}
	public Pxtablecolumn save(Pxtablecolumn item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Pxtablecolumn> findByTableId(Long id){
        return dao.findByTableId(id);
    }

                             

    public  List<Pxtablecolumn> findByFieldType(Long id){
        return dao.findByFieldType(id);
    }

                             

    public  List<Pxtablecolumn> findByShowType(Long id){
        return dao.findByShowType(id);
    }

                             

    public  List<Pxtablecolumn> findByMap(Long id){
        return dao.findByMap(id);
    }

                             
}
