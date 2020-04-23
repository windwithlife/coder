package <%=data.packageName%>.entity;

import java.io.Serializable;

import <%=data.packageName%>.entity.*;

import java.util.List;

public class <%=data.className%> implements Serializable {
	private static final long serialVersionUID = 1L;

    <%
    data.fields.forEach(function(field){
        if(field.mapType=='NULL'){%>
    private <%=field.columnType%> <%=field.name%>;         
    <%}})%>

    public <%=data.className%>RequestDTO() {
    } 
   


    <%
    data.fields.forEach(function(field){
        if(field.mapType=='NULL'){%>
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
}
