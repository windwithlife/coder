package <%=data.packageName%>.entity;

import java.io.Serializable;



import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import <%=data.packageName%>.entity.*;

import java.util.List;

public class <%=data.className%> implements Serializable {
	private static final long serialVersionUID = 1L;

    <%
    data.fields.forEach(function(field){%>
    private <%=field.type%> <%=field.name%>;         
    <%})%>

    public <%=data.className%>() {
    } 
   


    <%
    data.fields.forEach(function(field){%>
       
    public <%=field.type%> get<%=field.className%>(){
        return this.<%=field.name%>;
    }   
    public void set<%=field.className%>(<%=field.type%> <%=field.name%>){
        this.<%=field.name%> = <%=field.name%>;
    }        
    <%})%>

    @Override
	public String toString() {
		return "CLASS DATA: [" +"id=" + this.id +'name='+ this.name +"]";
	}
}
