package com.simple.server.auto.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.*;

import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import com.simple.server.auto.entity.*;

import java.util.List;


public class Tablecccc implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;  
    
    private String name; 
        
    
    private String type; 
        
    

    public Tablecccc() {
    }
    
    
    public String getName(){
        return this.name;
    }   
    public void setName(String name){
        this.name = name;
    } 
    
    public Long getId(){
        return this.id;
    }   
    public void setId(Long id){
        this.id = id;
    } 
    
    public String getType(){
        return this.type;
    }   
    public void setType(String type){
        this.type = type;
    } 
    
      
	@Override
	public String toString() {
		return "CLASS DATA: [" +"id=" + this.id +'name='+ this.name +"]";
	}
}
