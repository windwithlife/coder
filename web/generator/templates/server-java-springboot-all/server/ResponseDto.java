package <%=data.packageName%>.entity;

import java.io.Serializable;

import <%=data.packageName%>.entity.*;

import java.util.List;


@Entity
public class <%=data.moduleNameCLS%>Response implements Serializable {
    private static final long serialVersionUID = 1L;
    

    <%
    data.fields.forEach(function(field){
        if((field.mapType=='ManyToMany')||(field.mapType=='OneToMany')){%>
    private List<<%=field.referModuleClass%>> <%=field.referModule%>s;
    <%}else if(field.mapType=='ManyToOne')){%>
    private Long <%=field.referModule%>Id; 
    private String <%=field.referModule%>Name;
    <%}else {%> 
        private <%=field.columnType%> <%=field.name%>;            
    <%}})%>

    public <%=data.className%>ResposeDTO() {
    } 
   

    <%
    data.fields.forEach(function(field){
        if((field.mapType=='ManyToMany')||(field.mapType=='OneToMany')){%>
    private List<<%=field.referModuleClass%>> get<%%>(){return this.<%=field.referModule%>s;}
    private List<<%=field.referModuleClass%>> get<%%>(List<<%=field.referModuleClass%>> <%=field.referModule%>s){
        this.<%=field.referModule%>s = <%=field.referModule%>;
    }

    <%}else if(field.mapType=='ManyToOne')){%>
    private Long get<%=field.referModuleClass%>Id(){
        return  <%=field.referModule%>Id; 
    }; 
    private void set<%=field.referModuleClass%>Id(Long <%=field.referModule%>Id){
        this.<%=field.referModule%>Id = <%=field.referModule%>Id;
    }; 

    private String get<%=field.referModuleClass%>Name(){
        return this.<%=field.referModule%>Name;
    }
    private void set<%=field.referModuleClass%>Name(String <%=field.referModule%>Name){
        this.<%=field.referModule%>Name = <%=field.referModule%>Name;
    }
    //private <%=field.referModuleClass%> <%=field.referModule%>Name;
    <%}else {%> 
    public <%=field.columnType%> get<%=field.className%>(){
        return this.<%=field.name%>;
    }   
    public void set<%=field.className%>(<%=field.columnType%> <%=field.name%>){
        this.<%=field.name%> = <%=field.name%>;
    }               
    <%}})%>

    
    @Override
	public String toString() {
		return "CLASS DATA: [" +"id=" + this.id +'name='+ this.name +"]";
}
