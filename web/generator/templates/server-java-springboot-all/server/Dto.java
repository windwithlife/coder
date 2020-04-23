package <%=data.packageName%>.dto;

import java.io.Serializable;

import <%=data.packageName%>.entity.*;

import java.util.List;

public class <%=data.nameClassName%> implements Serializable {
	private static final long serialVersionUID = 1L;

    <%
    data.fields.forEach(function(field){%>
    private <%-field.type%> <%=field.name%>;         
    <%})%>

    public <%=data.nameClassName%>() {
    } 
   


    <%
    data.fields.forEach(function(field){%>
       
    public <%-field.type%> get<%=field.className%>(){
        return this.<%=field.name%>;
    }   
    public void set<%=field.className%>(<%-field.type%> <%=field.name%>){
        this.<%=field.name%> = <%=field.name%>;
    }        
    <%})%>

  
}
