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
           if (refer){
                var referModule = refer.moduleCLS;
                var relation = refer.map;
                if ((relation=='ManyToOne')||(relation=='ManyToMany)){%>

    private String <%=field%>;
                <%}else if(relation=='OneToMany'){%>
    //<%-displayName%>
    private List<<%=refer.moduleCLS%>> <%=keyName%>;
                              <%}
                 }
            }else{
                if ((type =='Text')||(type=='String')){%>


    private String <%=field%>;
                <%} else {
    private <%=type%> <%=field%>;
            }
    }%>
    public <%=data.moduleNameCLS%>ResponseDto() {
	}
    <%
    for (var field in data.moduleDefine){
           var fieldDef = data.moduleDefine[field];
           var keyName     = fieldDef.nameCLS;
           var displayName = fieldDef.dName;
           var type        = fieldDef.type;
           var refer       = fieldDef.refer;
           if (refer){
                var referModule = refer.moduleCLS;
                var relation = refer.map;
                if ((relation=='ManyToOne')||(relation=='ManyToMany)){%>


    public String get<%=keyName%>(){
         return this.<%=field%>;
    };
    public void set<%=keyName%>(String <%=field%>){
         this.<%=field%> = <%=field%>;
    }


                 <%}else if(relation=='OneToMany'){%>
     //<%-displayName%>
     public List<<%=refer.moduleCLS%>> get<%=keyName%>(){
         return this.<%=field%>;
     };
     public void set<%=keyName%>(List<<%=refer.moduleCLS%>> <%=field%>){
         this.<%=field%> = <%=field%>;
     }
               <%}
          }else{

                if (type =='Text'){type ='String'}%>
     public void set<%=keyName%>(<%=type%> <%=field%>){
         this.<%=field%> = <%=field%>;
     }

     public <%=type%> get<%=keyName%>(){
        return this.<%=field%>;
     }

          <%}
     }%>



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
