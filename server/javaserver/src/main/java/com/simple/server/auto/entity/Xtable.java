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
public class Xtable implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //名称
    private String name;
       
    //说明
    private String description;
       

    @Column(columnDefinition="text")
    private String defineText;
          

    private Long status;
    private Long moduleId;

    //@OneToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    @OneToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    @JoinColumn(name="tableId")//设置在表中的关联字段(外键)
    private List<Xtablecolumn> columns;
        
    public Xtable() {
	}

    //编号
    public List<Xtablecolumn> getColumns(){
        return this.columns;
    };
    public void setColumns(List<Xtablecolumn> cols){
        this.columns = cols;
    }
     //编号
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }
     
     //名称
     public String getName(){
         return this.name;
     };
     public void setName(String name){
         this.name = name;
     }
     
     //说明
     public String getDescription(){
         return this.description;
     };
     public void setDescription(String description){
         this.description = description;
     }
     
     //表结构定义
     public String getDefineText(){
         return this.defineText;
     };
     public void setDefineText(String defineText){
         this.defineText = defineText;
     }
     


    public Long getStatus(){
         return this.status;
    };
    public void setStatus(Long status){
         this.status = status;
    }

    public Long getModuleId(){
        return this.moduleId;
    };
    public void setModuleId(Long moduleId){
        this.moduleId = moduleId;
    }

	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
