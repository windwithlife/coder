package <%=data.packageName%>.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import <%=data.packageName%>.entity.*;

public interface <%=data.moduleNameCLS%>Repository extends JpaRepository<<%=data.moduleNameCLS%>, Long> {
    public  List<<%=data.moduleNameCLS%>> findByName(String name);
    public  List<<%=data.moduleNameCLS%>> findByNameLike(String name);

    public  <%=data.moduleNameCLS%> findOneByName(String name);

    <% for (var field in data.moduleDefine){
                    var fieldDef  = data.moduleDefine[field];
                    var fieldName = fieldDef.dName;
                    var keyName = field;
                    var fieldNameUpper = fieldDef.nameCLS;
                    var refer = fieldDef.refer;
                    if (refer) {
                        var clsName = refer.moduleCLS;
                        if(refer.map=='ManyToOne'){
                    %>
       public List<<%=data.moduleNameCLS%>> findBy<%=fieldNameUpper%>(Long id);

                       <%}
                    }
            }
        %>
}
