package <%=data.packageName%>.entity;

import java.io.Serializable;



import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import <%=data.packageName%>.entity.*;

import java.util.List;



public class <%=data.operation.requestCLS%> implements Serializable {

    <%

    var requestType = data.define.operation.requestType;
    for (var field in requestType){
           var fieldName     = field;
           var fieldType     = requestType[field].type;
           var fieldCLS      = requestType[field].nameCLS;

    private <%=fieldType%> <%=fieldName%>;

    }%>
    public <%=data.operation.requestCLS%>() {
	}
    <%
    for (var field in requestType){
           var fieldName     = field;
           var fieldType     = requestType[field].type;
           var fieldCLS      = requestType[field].nameCLS;


     public void set<%=fieldCLS%>(<%=fieldType%> <%=fieldName%>){
         this.<%=fieldName%> = <%=fieldName%>;
     }

     public <%=fieldType%> get<%=fieldCLS%>(){
        return this.<%=fieldName%>;
     }
     <%}%>

   	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
