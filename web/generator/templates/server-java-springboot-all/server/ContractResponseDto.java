package <%=data.packageName%>.entity;

import java.io.Serializable;



import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import <%=data.packageName%>.entity.*;

import java.util.List;


public class <%=data.operation.responseCLS%> implements Serializable {

<%

    var responseType = data.define.operation.responseType;
    for (var field in responseType){
           var fieldName     = field;
           var fieldType     = requestType[field].type;
           var fieldCLS      = requestType[field].nameCLS;

    private <%=fieldType%> <%=fieldName%>;

    }%>
    public <%=data.operation.responseCLS%>() {
	}
    <%
    for (var field in responseType){
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
