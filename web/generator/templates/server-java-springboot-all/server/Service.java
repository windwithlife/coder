package <%=data.packageName%>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import <%=data.packageName%>.dao.*;
import <%=data.packageName%>.entity.*;


@Service
public class <%=data.className%>Service {
	@Autowired
	<%=data.className%>Repository dao;
	public List<<%=data.className%>> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<<%=data.className%>> findByName(String name){
		return dao.findByName(name);
	}
	public  List<<%=data.className%>> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  <%=data.className%> findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public <%=data.className%> findById(Long id){
		return dao.findOne(id);
	}
	public <%=data.className%> save(<%=data.className%> item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}
	
	<%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    public List<<%=data.className%>> findBy<%=field.referModuleClass%>(Long id){
		return dao.findBy<%=field.referModuleClass%>(id);
	}    
    <%}})%>
}
