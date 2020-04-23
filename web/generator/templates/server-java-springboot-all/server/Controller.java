package <%=data.packageName%>.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

import <%=data.packageName%>.entity.*;
import <%=data.packageName%>.service.*;
import <%=data.packageName%>.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/<%=data.name%>")
public class <%=data.nameClassName%>Controller {
	@Autowired
	<%=data.nameClassName%>Service service;

	// @Autowired
    // <%=data.className%>QueryDao queryDao;

    <% data.refers.forEach(function(referModule){%>
    @Autowired
    private  <%=referModule.className%>Service <%=referModule.name%>Service;
    
    <%})%>
   
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<<%=data.nameClassName%>> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public <%=data.nameClassName%> findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	<%=data.nameClassName%> result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<<%=data.nameClassName%>> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<<%=data.nameClassName%>> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public <%=data.nameClassName%> addSave(@RequestBody <%=data.nameClassName%> item) {

		System.out.println("input device params:" + item.toString());
		<%=data.nameClassName%> result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public <%=data.nameClassName%> updateSave(@RequestBody <%=data.nameClassName%> item,@PathVariable Long id) {
     	System.out.println("input params id and name:" + item.toString());
     	<%=data.nameClassName%> result= null;
        try{
          <%=data.nameClassName%> old = service.findById(id);
          <%
          data.fields.forEach(function(field){
              if(field.mapType=='NULL'){%>
                old.set<%=field.nameClassName%>(item.get<%=field.nameClassName%>());
          <%}})%>
          result = service.save(old);
        }catch (Exception e){
                System.out.println("***************failed to update item******  ***********");
                e.printStackTrace();
                return null;
        }
        return result;
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
    
    public List<<%=data.nameClassName%>> queryBy<%=field.referModuleClass%>(@RequestParam("id") Long id) {
        return List<<%=data.nameClassName%>> result = service.findBy<%=field.referModuleClass%>(id);
      
    <%}})%>
   
   
}