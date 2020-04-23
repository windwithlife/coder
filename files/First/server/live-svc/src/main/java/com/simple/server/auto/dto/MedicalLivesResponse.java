package com.simple.server.auto.dto;

import java.io.Serializable;

import com.simple.server.auto.entity.*;

import java.util.List;

public class MedicalLivesResponse implements Serializable {
	private static final long serialVersionUID = 1L;

    
    private Long itemsCount;         
    
    private List<MedicalLiveResponse> items;         
    

    public MedicalLivesResponse() {
    } 
   


    
       
    public Long getItemsCount(){
        return this.itemsCount;
    }   
    public void setItemsCount(Long itemsCount){
        this.itemsCount = itemsCount;
    }        
    
       
    public List<MedicalLiveResponse> getItems(){
        return this.items;
    }   
    public void setItems(List<MedicalLiveResponse> items){
        this.items = items;
    }        
    

  
}
