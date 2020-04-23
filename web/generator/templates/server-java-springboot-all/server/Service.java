package <%=data.packageName%>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import <%=data.packageName%>.dao.*;
import <%=data.packageName%>.entity.*;


@Service
public class <%=data.nameClassName%>Service {
	@Autowired
	<%=data.nameClassName%>Repository dao;
	public List<<%=data.nameClassName%>> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<<%=data.nameClassName%>> findByName(String name){
		return dao.findByName(name);
	}
	public  List<<%=data.nameClassName%>> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  <%=data.nameClassName%> findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public <%=data.nameClassName%> findById(Long id){
		return dao.findOneById(id);
	}
	public <%=data.nameClassName%> save(<%=data.nameClassName%> item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}
	
	<%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    public List<<%=data.nameClassName%>> findBy<%=field.referModuleClass%>(Long id){
		return dao.findBy<%=field.referModuleClass%>(id);
	}    
    <%}})%>
}
