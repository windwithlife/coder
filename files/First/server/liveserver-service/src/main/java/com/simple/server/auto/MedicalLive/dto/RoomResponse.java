package com.simple.server.auto.MedicalLive.dto;

import java.io.Serializable;

import com.simple.server.auto.MedicalLive.entity.*;

import java.util.List;

public class RoomResponse implements Serializable {
	private static final long serialVersionUID = 1L;

    
    private Long id;         
    
    private String name;         
    
    private String title;         
    

    public RoomResponse() {
    } 
   


    
       
    public Long getId(){
        return this.id;
    }   
    public void setId(Long id){
        this.id = id;
    }        
    
       
    public String getName(){
        return this.name;
    }   
    public void setName(String name){
        this.name = name;
    }        
    
       
    public String getTitle(){
        return this.title;
    }   
    public void setTitle(String title){
        this.title = title;
    }        
    

  
}
