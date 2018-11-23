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
@RequestMapping("/pxchannel")
public class PxchannelController {
	@Autowired
	PxchannelService service;

	@Autowired
    PxchannelQueryDao queryDao;

    
    @Autowired
       private  XmoduleService xmoduleService;
    
    @Autowired
       private  ProjectService projectService;
    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByProjectId", method = RequestMethod.GET)
   public List<Pxchannel> queryByProjectId(@RequestParam("id") Long id) {
       List<Pxchannel> result = service.findByProjectId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByIsenable", method = RequestMethod.GET)
   public List<Pxchannel> queryByIsenable(@RequestParam("id") Long id) {
       List<Pxchannel> result = service.findByIsenable(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Pxchannel> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Pxchannel findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Pxchannel result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Pxchannel> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Pxchannel> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Pxchannel save2(@RequestBody Pxchannel item) {

		System.out.println("input device params:" + item.toString());
		Pxchannel result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Pxchannel updateSave(@RequestBody Pxchannel item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Pxchannel result = service.save(item);
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