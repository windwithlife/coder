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

    public List<<%=data.moduleNameCLS%>Response> transformEntityListToDto(List<<%=data.moduleNameCLS%>> list){
         List<<%=data.moduleNameCLS%>Response> result = new List<<%=data.moduleNameCLS%>Response>()
         for(<%=data.moduleNameCLS%> item:list){
              <%=data.moduleNameCLS%>Response response =   <%=data.moduleNameCLS%>Response.createByEntity(item);
              result.add(response);
         }
         return result;
    }
	public List<<%=data.moduleNameCLS%>Response> findAll(){

		return transformEntityListToDto(dao.findAll());


	}
	public  List<<%=data.moduleNameCLS%>Response> findByName(String name){
		return transformEntityListToDto(dao.findByName(name));
	}
	public  List<<%=data.moduleNameCLS%>Response> findByNameLike(String name){

        return transformEntityListToDto(dao.findByNameLike(name));

    }

	public  <%=data.moduleNameCLS%>Response findOneByName(String name){
    		return <%=data.moduleNameCLS%>Response.createByEntity(dao.findOneByName(name));
    	}

	public <%=data.moduleNameCLS%>Response findById(Long id){
		return <%=data.moduleNameCLS%>Response.createByEntity(dao.findOne(id));
	}
	public <%=data.moduleNameCLS%>Response save(<%=data.moduleNameCLS%>Request item){

		 <%=data.moduleNameCLS%> result = this.dao.save(item.getEntity());
		 return <%=data.moduleNameCLS%>Response.createByEntity(result);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	<% for (var field in data.moduleDefine){
							if ((field == 'id')||(field == 'name')){continue;}
                             var fieldDef  = data.moduleDefine[field];
                             var fieldName = fieldDef.dName;
                             var keyName = field;
							 var fieldNameUpper = fieldDef.nameCLS;
                             var refer = fieldDef.refer;
                              if (((refer) && (refer.map=='ManyToOne'))|| (data.isAssociation == 'yes')) {

                             %>

    public  List<<%=data.moduleNameCLS%>Response> findBy<%=fieldNameUpper%>(Long id){
        return transformEntityListToDto(dao.findBy<%=fieldNameUpper%>(id));
    }

                             <%}

    }%>
}
