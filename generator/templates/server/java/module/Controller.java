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
@RequestMapping("/<%=data.moduleName%>")
public class <%=data.moduleNameCLS%>Controller {
	@Autowired
	<%=data.moduleNameCLS%>Service service;

	@Autowired
    <%=data.moduleNameCLS%>QueryDao queryDao;

    <% for (var referName in data.refers){
            var refer  = data.refers[referName];
    %>
    @Autowired
       private  <%=refer.moduleCLS%>Service <%=refer.module%>Service;
    <% }%>


   <% for (var field in data.moduleDefine){
                var fieldDef  = data.moduleDefine[field];
                var fieldName = fieldDef.dName;
                var keyName = field;

                var refer = fieldDef.refer;
                if ((refer) && (refer.map=='ManyToOne')){
                    var fieldNameUpper = fieldDef.nameCLS;

   %>
   @ResponseBody
   @RequestMapping(value = "/queryBy<%=fieldNameUpper%>", method = RequestMethod.GET)
   public List<<%=data.moduleNameCLS%>> findBy<%=fieldNameUpper%>(@RequestParam("id") Long id) {
       List<<%=data.moduleNameCLS%>> result = service.findBy<%=fieldNameUpper%>(id);
       return result;
   }

   <%
                }
        }
    %>


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<<%=data.moduleNameCLS%>> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public <%=data.moduleNameCLS%> findById(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	<%=data.moduleNameCLS%> result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<<%=data.moduleNameCLS%>> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<<%=data.moduleNameCLS%>> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public <%=data.moduleNameCLS%> save2(@RequestBody <%=data.moduleNameCLS%> item) {

		System.out.println("input device params:" + item.toString());
		<%=data.moduleNameCLS%> result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public <%=data.moduleNameCLS%> updateSave(@RequestBody <%=data.moduleNameCLS%> item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 <%=data.moduleNameCLS%> result = service.save(item);
     	 System.out.println("output device result data:" + result.toString());
     	 return result;
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


   <%if(data.moduleName=='dictionary'){%>
   	@ResponseBody
       @RequestMapping(value = "/queryByCategoryName/", method = RequestMethod.GET)
       public List<Dictionary> findByCategoryName(@RequestParam("category") String categoryName) {
           	System.out.println("input param category:" + categoryName);
            Category cItem  = categoryService.findOneByName(categoryName);
            if(cItem==null){return null;}else{
                List<Dictionary> result = service.findByCategory(cItem.getId());
                return result;
            }
       }
    <%}%>

}