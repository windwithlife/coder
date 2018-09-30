package <%=data.packageName%>.entity;

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
import <%=data.packageName%>.entity.*;

import java.util.List;


@Entity
public class <%=data.moduleNameCLS%> implements Serializable {
	private static final long serialVersionUID = 1L;

    <%
    var  columns = [];

    for (var field in data.moduleDefine){
           var fieldDef = data.moduleDefine[field];
           var keyName     = field;
           var fieldNameUpper = fieldDef.nameCLS;
           var displayName = fieldDef.dName;

           var type        = fieldDef.type;
           var refer       = fieldDef.refer;
           if ((field =='id')||(field=='_id'))
           {%>
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private <%=type%> <%=keyName%>;
          <% } else if (refer){
            var referModule = refer.moduleCLS;
            var relation = refer.map;
           %>

    private Long <%=field%>;
        <%}else{%>
    //<%-displayName%>
    private <%=type%> <%=keyName%>;
       <%}}%>
    public <%=data.moduleNameCLS%>() {
	}
       <%
       for (var field in data.moduleDefine){
           var fieldDef = data.moduleDefine[field];
           var keyName     = fieldDef.nameCLS;
           var displayName = fieldDef.dName;
           var type        = fieldDef.type;
           var refer       = fieldDef.refer;
           if (refer){
               referModule=refer.moduleCLS;
                %>


    public Long get<%=keyName%>(){
         return this.<%=field%>;
    };
    public void set<%=keyName%>(Long <%=field%>){
         this.<%=field%> = <%=field%>;
    }


          <%}else {%>
     //<%-displayName%>
     public <%=type%> get<%=keyName%>(){
         return this.<%=field%>;
     };
     public void set<%=keyName%>(<%=type%> <%=field%>){
         this.<%=field%> = <%=field%>;
     }
     <%}}%>



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
