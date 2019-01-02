package <%=data.packageName%>.entity;


import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import <%=data.packageName%>.entity.*;

import java.util.List;

package <%=data.packageName%>.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import com.simple.core.base.user.entity.*;
import com.simple.core.base.user.service.*;

import com.simple.server.bz.entity.*;
import com.simple.server.bz.service.*;

import <%=data.packageName%>.entity.*;
import <%=data.packageName%>.service.*;
import <%=data.packageName%>.dao.*;


@Controller
@RequestMapping("/<%=data.serviceName%>")
public class <%=data.serviceCLS%>Controller {
	//@Autowired
	//<%=data.moduleNameCLS%>Service service;

	//@Autowired
    //<%=data.moduleNameCLS%>QueryDao queryDao;


   <%
    var operations = data.define.operations;
    operations.forEach(function (operation) {
        var operationName = operation.name;
        var requestType  = operation.requestCLS;
        var responseType = operation.responseCLS;

   %>
   @ResponseBody
   @RequestMapping(value = "/<%=operationName%>", method = RequestMethod.POST)
   public <%=responseType%> <%=operationName%>(@RequestBody <%=requestType%>Request request) {


   <%
     }
    %>


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<<%=data.moduleNameCLS%>Response> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public <%=data.moduleNameCLS%>Response findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	<%=data.moduleNameCLS%> result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<<%=data.moduleNameCLS%>Response> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<<%=data.moduleNameCLS%>Response> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public <%=data.moduleNameCLS%>Response save2(@RequestBody <%=data.moduleNameCLS%>Request item) {

		System.out.println("input device params:" + item.toString());
		<%=data.moduleNameCLS%> result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



}