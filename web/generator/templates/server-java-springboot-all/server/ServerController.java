package <%=data.packageName%>.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

import com.simple.core.base.user.entity.*;
import com.simple.core.base.user.service.*;

import com.simple.server.bz.entity.*;
import com.simple.server.bz.service.*;

import <%=data.packageName%>.entity.*;
import <%=data.packageName%>.service.*;
import <%=data.packageName%>.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/<%=data.className%>")
public class <%=data.className%>Controller {
	@Autowired
	<%=data.className%>Service service;

	// @Autowired
    // <%=data.className%>QueryDao queryDao;

    <% data.refers.forEach(function(referModule){%>
    @Autowired
    private  <%=referModule.className%>Service <%=referModule.name%>Service;
    
    <%})%>
   
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<<%=data.className%>> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public <%=data.className%> findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	<%=data.className%> result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<<%=data.className%>> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<<%=data.className%>> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public <%=data.className%> addSave(@RequestBody <%=data.className%> item) {

		System.out.println("input device params:" + item.toString());
		<%=data.className%> result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public <%=data.className%> updateSave(@RequestBody <%=data.className%> item,@PathVariable Long id) {
     	System.out.println("input params id and name:" + item.toString());
     	
        try{
          <%=data.className%> old = service.findById(id);
          <%
          data.fields.forEach(function(field){
              if(field.mapType=='NULL'){%>
                old.set<%=field.className%>(item.get<%=field.className%>());
          <%}})%>
          <%=data.className%> result = service.save(old);
        }catch (Exception e){
                System.out.println("***************failed to update item******  ***********");
                e.printStackTrace();
                return null;
        }
    }

    @ResponseBody
   	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
   	public Long remove(@PathVariable Long id) {
		service.remove(id);
        return id;
    }
    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable Long id) {
    	service.remove(id);
    	return id;
    }

    <%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    @ResponseBody
    @RequestMapping(value = "/queryBy<%=fieldNameUpper%>", method = RequestMethod.GET)
    
    public List<<%=data.className%>> queryBy<%=field.referModuleClass%>(@RequestParam("id") Long id) {
        return List<<%=data.className%>> result = service.findBy<%=field.referModuleClass%>(id);
      
    <%}})%>


    <%
    var operations = data.interfaces;
    operations.forEach(function(operation){
   %>
   @ResponseBody
   @RequestMapping(value = "/<%=operation.name%>", method = RequestMethod.<%operation.requestMethodType%>)
   public <%=operation.outputType%> <%=operation.name%>(@RequestBody <%=operation.inputType%> request) {

   }
   <%
     }
    %>
   
   
}