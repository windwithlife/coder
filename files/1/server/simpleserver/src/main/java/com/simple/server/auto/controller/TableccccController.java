package com.simple.server.auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

import com.simple.core.base.user.entity.*;
import com.simple.core.base.user.service.*;

import com.simple.server.bz.entity.*;
import com.simple.server.bz.service.*;

import com.simple.server.auto.entity.*;
import com.simple.server.auto.service.*;
import com.simple.server.auto.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/Tablecccc")
public class TableccccController {
	@Autowired
	TableccccService service;

	// @Autowired
    // TableccccQueryDao queryDao;

    
   

   
   
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<TableccccResponse> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Tablecccc findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Tablecccc result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Tablecccc> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Tablecccc> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Tablecccc addSave(@RequestBody Tablecccc item) {

		System.out.println("input device params:" + item.toString());
		Tablecccc result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Tablecccc updateSave(@RequestBody Tablecccc item,@PathVariable Long id) {
     	System.out.println("input params id and name:" + item.toString());
     	
        try{
          Tablecccc old = service.findById(id);
          
                old.setName(item.getName())
          
                old.setId(item.getId())
          
                old.setType(item.getType())
          
          Tablecccc result = service.save(old);
        }catch (Exception e){
                System.out.println("***************failed to update item*****************");
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

    
   
   
}