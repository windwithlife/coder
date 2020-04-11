package <%=data.packageName%>.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import <%=data.packageName%>.entity.*;

public interface <%=data.className%>Repository extends JpaRepository<<%=data.className%>, Long> {
    public  List<<%=data.className%>> findByName(String name);
    public  List<<%=data.className%>> findByNameLike(String name);

    public  <%=data.className%> findOneByName(String name);

    <%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    public List<<%=data.className%>> findBy<%=field.referModuleClass%>(Long id);    
    <%}})%>
        
}
