package <%=data.packageName%>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import <%=data.packageName%>.dao.*;
import <%=data.packageName%>.entity.*;


@Service
public class <%=data.moduleNameCLS%>Service {
	@Autowired
	<%=data.moduleNameCLS%>Repository dao;
	public List<<%=data.moduleNameCLS%>> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<<%=data.moduleNameCLS%>> findByName(String name){
		return dao.findByName(name);
	}
	public  List<<%=data.moduleNameCLS%>> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  <%=data.moduleNameCLS%> findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public <%=data.moduleNameCLS%> findById(Long id){
		return dao.findOne(id);
	}
	public <%=data.moduleNameCLS%> save(<%=data.moduleNameCLS%> item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	<% for (var field in data.moduleDefine){
                             var fieldDef  = data.moduleDefine[field];
                             var fieldName = fieldDef.dName;
                             var keyName = field;
							 var fieldNameUpper = fieldDef.nameCLS;
                             var refer = fieldDef.refer;
                             if (refer) {
                                 if(refer.map=='ManyToOne'){
                             %>

    public  List<<%=data.moduleNameCLS%>> findBy<%=fieldNameUpper%>(Long id){
        return dao.findBy<%=fieldNameUpper%>(id);
    }

                                <%}
                             }
    }%>
}
