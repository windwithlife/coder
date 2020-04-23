package com.simple.server.auto.dto;

import java.io.Serializable;

import com.simple.server.auto.entity.*;

import java.util.List;

public class MedicalLiveRequest implements Serializable {
	private static final long serialVersionUID = 1L;

    
    private Long id;         
    
    private String name;         
    
    private String liveUrl;         
    
    private String manager;         
    

    public MedicalLiveRequest() {
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
    
       
    public String getLiveUrl(){
        return this.liveUrl;
    }   
    public void setLiveUrl(String liveUrl){
        this.liveUrl = liveUrl;
    }        
    
       
    public String getManager(){
        return this.manager;
    }   
    public void setManager(String manager){
        this.manager = manager;
    }        
    

  
}
