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
	public <%=data.responseListDtoClassName%> findAll(){
		return  transfterEntity2ResponseListDto(dao.findAll());
		//return items;
	}
	public <%=data.responseListDtoClassName%> findByName(String name){
		return transfterEntity2ResponseListDto(dao.findByName(name));
	}
	public  <%=data.responseListDtoClassName%> findByNameLike(String name){
    		return transfterEntity2ResponseListDto(dao.findByNameLike(name));
    }

	public  <%=data.responseDtoClassName%> findOneByName(String name){
    		return transfterEntity2ResponseDto(dao.findOneByName(name));
    	}

	public <%=data.responseDtoClassName%> findById(Long id){
		return transfterEntity2ResponseDto(dao.findOneById(id));
	}
	public <%=data.responseDtoClassName%> save(<%=data.requestDtoClassName%> item){
		<%=data.nameClassName%> entityObj = transfterRequestDto2Entity(item);
		return transfterEntity2ResponseDto(this.dao.save(entityObj));
	}

	public <%=data.responseDtoClassName%> update(<%=data.requestDtoClassName%> item){

		<%=data.responseDtoClassName%> result= null;
		<%=data.nameClassName%> entityObj = null;
        try{
            <%=data.nameClassName%> oldEntity = dao.findById(id);
          <%
          data.fields.forEach(function(field){
              if(field.mapType=='NULL'){%>
                old.set<%=field.nameClassName%>(item.get<%=field.nameClassName%>());
          <%}})%>
		  entityObj = dao.save(oldEntity);
		  return transfterEntity2ResponseDto(entityObj);
        }catch (Exception e){
                System.out.println("***************failed to update item******  ***********");
                e.printStackTrace();
                return null;
        }
		
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}
	
	<%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    public <%=data.responseListDtoClassName%> findBy<%=field.referModuleClass%>(Long id){
		return transfterEntity2ResponseListDto(dao.findBy<%=field.referModuleClass%>(id));
	}    
	<%}})%>
	
    public <%=data.nameClassName%> transfterRequestDto2Entity(<%=data.requestDtoClassName%> inputDto){
		<%=data.nameClassName%> newEntity = new <%=data.nameClassName%>();
		<%
		data.fields.forEach(function(field){
			if(field.mapType=='NULL'){%>
				newEntity.set<%=field.nameClassName%>(inputDto.get<%=field.nameClassName%>());
		<%}})%>
		return new Entity;
	}

	public <%=data.responseDtoClassName%> transfterEntity2ResponseDto(<%=data.nameClassName%> entityObj){
		<%=data.responseDtoClassName%> response = new <%=data.responseDtoClassName%>();
		<%
		data.fields.forEach(function(field){
			if(field.mapType=='NULL'){%>
				response.set<%=field.nameClassName%>(entityObj.get<%=field.nameClassName%>());
		<%}})%>
		return new Entity;
	}

	public <%=data.responseDtoClassName%> transfterEntity2ResponseListDto(List<<%=data.nameClassName%>> entityObjs){

		<%=data.responseListDtoClassName%> responseList = new <%=data.responseListDtoClassName%>();

	    for(int i; i< entityObjs.length(); i++){
			<%=data.responseDtoClassName%> response = transfterEntity2ResponseDto(entityObjs.get(i));
			
			responseList.getItems().push(response);
		}
		responseList.setItemCountentityObjs.length());
		return responseList;
		
	}

}
