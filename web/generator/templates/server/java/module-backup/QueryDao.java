package <%=data.packageName%>.dao;


import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.simple.core.base.user.entity.User;
import com.simple.server.bz.entity.*;
import <%=data.packageName%>.entity.*;


import java.util.List;

import org.apache.ibatis.annotations.*;



@Mapper
public interface <%=data.moduleNameCLS%>QueryDao {

    @Select("SELECT * FROM <%=data.moduleNameCLS%> WHERE NAME = #{name}")
    List<<%=data.moduleNameCLS%>> findByName(@Param("name") String name);

}