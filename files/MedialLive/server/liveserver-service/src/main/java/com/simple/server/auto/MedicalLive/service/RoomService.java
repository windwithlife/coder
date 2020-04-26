package com.simple.server.auto.MedicalLive.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.MedicalLive.dao.*;
import com.simple.server.auto.MedicalLive.entity.*;
import com.simple.server.auto.MedicalLive.dto.*;


@Service
public class RoomService {
	@Autowired
	RoomRepository dao;
	public RoomsResponse findAll(){
		return  transferEntity2ResponseListDto(dao.findAll());
		//return items;
	}
	public RoomsResponse findByName(String name){
		return transferEntity2ResponseListDto(dao.findByName(name));
	}
	public  RoomsResponse findByNameLike(String name){
    		return transferEntity2ResponseListDto(dao.findByNameLike(name));
    }

	public  RoomResponse findOneByName(String name){
    		return transferEntity2ResponseDto(dao.findOneByName(name));
    	}

	public RoomResponse findById(Long id){
		return transferEntity2ResponseDto(dao.findOneById(id));
	}
	public RoomResponse save(RoomRequest item){
		Room entityObj = transferRequestDto2Entity(item);
		return transferEntity2ResponseDto(this.dao.save(entityObj));
	}

	public RoomResponse update(RoomRequest item){

		RoomResponse result= null;
		
        try{
            Room oldEntity = dao.findOneById(item.getId());
          
                oldEntity.setId(item.getId());
          
                oldEntity.setName(item.getName());
          
                oldEntity.setTitle(item.getTitle());
          
		  Room entityObj = dao.save(oldEntity);
		  return transferEntity2ResponseDto(entityObj);
        }catch (Exception e){
                System.out.println("***************failed to update item******  ***********");
                e.printStackTrace();
                return null;
        }
		
	}
	public void remove(Long id){
		this.dao.delete(id);
	}
	
	
	
    public Room transferRequestDto2Entity(RoomRequest inputDto){
		Room newEntity = new Room();
		
				newEntity.setId(inputDto.getId());
		
				newEntity.setName(inputDto.getName());
		
				newEntity.setTitle(inputDto.getTitle());
		
		return newEntity;
	}

	public RoomResponse transferEntity2ResponseDto(Room entityObj){
		RoomResponse response = new RoomResponse();
		
				response.setId(entityObj.getId());
		
				response.setName(entityObj.getName());
		
				response.setTitle(entityObj.getTitle());
		
		return response;
	}

	public RoomsResponse transferEntity2ResponseListDto(List<Room> entityObjs){

		RoomsResponse responseList = new RoomsResponse();

	    for(int i=0; i< entityObjs.size(); i++){
			RoomResponse response = transferEntity2ResponseDto(entityObjs.get(i));
			
			responseList.getItems().add(response);
		}
		responseList.setItemsCount(new Long(entityObjs.size()));
		return responseList;
		
	}

}
