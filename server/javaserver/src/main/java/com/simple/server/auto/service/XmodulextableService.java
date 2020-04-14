package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XmodulextableService {
	@Autowired
	XmodulextableRepository dao;
	public List<Xmodulextable> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xmodulextable> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xmodulextable> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xmodulextable findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xmodulextable findById(Long id){
		return dao.findOne(id);
	}
	public Xmodulextable save(Xmodulextable item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xmodulextable> findByXmoduleId(Long id){
        return dao.findByXmoduleId(id);
    }

                             

    public  List<Xmodulextable> findByXmoduleName(Long id){
        return dao.findByXmoduleName(id);
    }

                             

    public  List<Xmodulextable> findByXtableId(Long id){
        return dao.findByXtableId(id);
    }

                             

    public  List<Xmodulextable> findByXtableName(Long id){
        return dao.findByXtableName(id);
    }

                             
}
