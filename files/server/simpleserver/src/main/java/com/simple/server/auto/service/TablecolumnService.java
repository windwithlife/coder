package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class TablecolumnService {
	@Autowired
	TablecolumnRepository dao;
	public List<Tablecolumn> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Tablecolumn> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Tablecolumn> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Tablecolumn findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Tablecolumn findById(Long id){
		return dao.findOne(id);
	}
	public Tablecolumn save(Tablecolumn item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Tablecolumn> findByTableId(Long id){
        return dao.findByTableId(id);
    }

                             

    public  List<Tablecolumn> findByFieldType(Long id){
        return dao.findByFieldType(id);
    }

                             

    public  List<Tablecolumn> findByShowType(Long id){
        return dao.findByShowType(id);
    }

                             

    public  List<Tablecolumn> findByMap(Long id){
        return dao.findByMap(id);
    }

                             
}
