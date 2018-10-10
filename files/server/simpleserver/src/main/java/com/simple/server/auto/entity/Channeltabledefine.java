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
public class Channeltabledefine implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //
    private String name;
       
    //
    private Long channelId;
       
    //
    private String channelName;
       
    //
    private Long tabledefineId;
       
    //
    private String tabledefineName;
       
    public Channeltabledefine() {
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
     public Long getChannelId(){
         return this.channelId;
     };
     public void setChannelId(Long channelId){
         this.channelId = channelId;
     }
     
     //
     public String getChannelName(){
         return this.channelName;
     };
     public void setChannelName(String channelName){
         this.channelName = channelName;
     }
     
     //
     public Long getTabledefineId(){
         return this.tabledefineId;
     };
     public void setTabledefineId(Long tabledefineId){
         this.tabledefineId = tabledefineId;
     }
     
     //
     public String getTabledefineName(){
         return this.tabledefineName;
     };
     public void setTabledefineName(String tabledefineName){
         this.tabledefineName = tabledefineName;
     }
     



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
