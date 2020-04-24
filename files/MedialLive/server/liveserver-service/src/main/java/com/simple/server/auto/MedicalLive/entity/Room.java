package com.simple.server.auto.MedicalLive.entity;

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


import com.simple.server.auto.MedicalLive.entity.*;

import java.util.List;

@Entity
public class Room implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;  
    
    private  name; 
        
    
    private  title; 
        
    

    public Room() {
    }
    
    
    public  get(){
        return this.id;
    }   
    public void set( id){
        this.id = id;
    } 
    
    public  get(){
        return this.name;
    }   
    public void set( name){
        this.name = name;
    } 
    
    public  get(){
        return this.title;
    }   
    public void set( title){
        this.title = title;
    } 
    
      
	@Override
	public String toString() {
		return "CLASS DATA: [" +"id=" + this.id +"name="+ this.name +"]";
	}
}
