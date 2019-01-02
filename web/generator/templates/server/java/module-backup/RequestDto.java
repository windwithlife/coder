package <%=data.packageName%>.entity;

import java.io.Serializable;



import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import <%=data.packageName%>.entity.*;

import java.util.List;


@Entity
public class <%=data.moduleNameCLS%> implements Serializable {
	private static final long serialVersionUID = 1L;

    <%


    for (var field in data.moduleDefine){
           var fieldDef = data.moduleDefine[field];
           var keyName     = field;
           var fieldNameUpper = fieldDef.nameCLS;
           var displayName = fieldDef.dName;

           var type        = fieldDef.type;
           var refer       = fieldDef.refer;
           if (type=='Text'){ type = 'String'};

           if (refer)&&(refer.map =='OneToMany'){ continue;}%>

    private <%=type%> <%=field%>;

    }%>
    public <%=data.moduleNameCLS%>RequestDto() {
	}
    <%
    for (var field in data.moduleDefine){
           var fieldDef = data.moduleDefine[field];
           var keyName     = fieldDef.nameCLS;
           var displayName = fieldDef.dName;
           var type        = fieldDef.type;
           var refer       = fieldDef.refer;
           if (type=='Text'){ type = 'String'};

           if (refer)&&(refer.map =='OneToMany'){ continue;}%>
     public void set<%=keyName%>(<%=type%> <%=field%>){
         this.<%=field%> = <%=field%>;
     }

     public <%=type%> get<%=keyName%>(){
        return this.<%=field%>;
     }
     <%}%>



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
