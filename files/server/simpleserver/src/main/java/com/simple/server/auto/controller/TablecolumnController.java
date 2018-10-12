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
@RequestMapping("/tablecolumn")
public class TablecolumnController {
	@Autowired
	TablecolumnService service;

	@Autowired
    TablecolumnQueryDao queryDao;

    
    @Autowired
       private  TabledefineService tabledefineService;
    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByTableId", method = RequestMethod.GET)
   public List<Tablecolumn> queryByTableId(@RequestParam("id") Long id) {
       List<Tablecolumn> result = service.findByTableId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByFieldType", method = RequestMethod.GET)
   public List<Tablecolumn> queryByFieldType(@RequestParam("id") Long id) {
       List<Tablecolumn> result = service.findByFieldType(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByShowType", method = RequestMethod.GET)
   public List<Tablecolumn> queryByShowType(@RequestParam("id") Long id) {
       List<Tablecolumn> result = service.findByShowType(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByMap", method = RequestMethod.GET)
   public List<Tablecolumn> queryByMap(@RequestParam("id") Long id) {
       List<Tablecolumn> result = service.findByMap(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Tablecolumn> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Tablecolumn findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Tablecolumn result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Tablecolumn> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Tablecolumn> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Tablecolumn save2(@RequestBody Tablecolumn item) {

		System.out.println("input device params:" + item.toString());
		Tablecolumn result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Tablecolumn updateSave(@RequestBody Tablecolumn item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Tablecolumn result = service.save(item);
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


   

    

}