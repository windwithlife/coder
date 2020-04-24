package com.simple.server.auto.MedicalLive.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.MedicalLive.dao.*;
import com.simple.server.auto.MedicalLive.entity.*;


@Service
public class RoomService {
	@Autowired
	RoomRepository dao;
	public RoomsResponse findAll(){
		return  transfterEntity2ResponseListDto(dao.findAll());
		//return items;
	}
	public RoomsResponse findByName(String name){
		return transfterEntity2ResponseListDto(dao.findByName(name));
	}
	public  RoomsResponse findByNameLike(String name){
    		return transfterEntity2ResponseListDto(dao.findByNameLike(name));
    }

	public  RoomRequest findOneByName(String name){
    		return transfterEntity2ResponseDto(dao.findOneByName(name));
    	}

	public RoomRequest findById(Long id){
		return transfterEntity2ResponseDto(dao.findOneById(id));
	}
	public RoomRequest save(RoomRequest item){
		Room entityObj = transfterRequestDto2Entity(item);
		return transfterEntity2ResponseDto(this.dao.save(entityObj));
	}

	public RoomRequest update(RoomRequest item){

		RoomRequest result= null;
		Room entityObj = null;
        try{
            Room oldEntity = dao.findById(id);
          
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
	
	
	
    public Room transfterRequestDto2Entity(RoomRequest inputDto){
		Room newEntity = new Room();
		
		return new Entity;
	}

	public RoomRequest transfterEntity2ResponseDto(Room entityObj){
		RoomRequest response = new RoomRequest();
		
		return new Entity;
	}

	public RoomRequest transfterEntity2ResponseListDto(List<Room> entityObjs){

		RoomsResponse responseList = new RoomsResponse();

	    for(int i; i< entityObjs.length(); i++){
			RoomRequest response = transfterEntity2ResponseDto(entityObjs.get(i));
			
			responseList.getItems().push(response);
		}
		responseList.setItemCountentityObjs.length());
		return responseList;
		
	}

}
