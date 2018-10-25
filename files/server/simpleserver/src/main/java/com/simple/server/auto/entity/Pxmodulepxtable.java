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


@Entity
public class Pxmodulepxtable implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //
    private String name;
       
    //
    private Long pxmoduleId;
       
    //
    private String pxmoduleName;
       
    //
    private Long pxtableId;
       
    //
    private String pxtableName;
       
    public Pxmodulepxtable() {
	}
       
     //
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }
     
     //
     public String getName(){
         return this.name;
     };
     public void setName(String name){
         this.name = name;
     }
     
     //
     public Long getPxmoduleId(){
         return this.pxmoduleId;
     };
     public void setPxmoduleId(Long pxmoduleId){
         this.pxmoduleId = pxmoduleId;
     }
     
     //
     public String getPxmoduleName(){
         return this.pxmoduleName;
     };
     public void setPxmoduleName(String pxmoduleName){
         this.pxmoduleName = pxmoduleName;
     }
     
     //
     public Long getPxtableId(){
         return this.pxtableId;
     };
     public void setPxtableId(Long pxtableId){
         this.pxtableId = pxtableId;
     }
     
     //
     public String getPxtableName(){
         return this.pxtableName;
     };
     public void setPxtableName(String pxtableName){
         this.pxtableName = pxtableName;
     }
     



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
