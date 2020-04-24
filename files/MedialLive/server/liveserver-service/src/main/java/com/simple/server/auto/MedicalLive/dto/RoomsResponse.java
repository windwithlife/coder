package com.simple.server.auto.MedicalLive.dto;

import java.io.Serializable;

import com.simple.server.auto.MedicalLive.entity.*;

import java.util.List;

public class RoomsResponse implements Serializable {
	private static final long serialVersionUID = 1L;

    
    private Long itemsCount;         
    
    private List<RoomResponse> items;         
    

    public RoomsResponse() {
    } 
   


    
       
    public Long getItemsCount(){
        return this.itemsCount;
    }   
    public void setItemsCount(Long itemsCount){
        this.itemsCount = itemsCount;
    }        
    
       
    public List<RoomResponse> getItems(){
        return this.items;
    }   
    public void setItems(List<RoomResponse> items){
        this.items = items;
    }        
    

  
}
