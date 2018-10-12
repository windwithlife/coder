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
@RequestMapping("/channel")
public class ChannelController {
	@Autowired
	ChannelService service;

	@Autowired
    ChannelQueryDao queryDao;

    
    @Autowired
       private  ProjectService projectService;
    
    @Autowired
       private  TabledefineService tabledefineService;
    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByProjectId", method = RequestMethod.GET)
   public List<Channel> queryByProjectId(@RequestParam("id") Long id) {
       List<Channel> result = service.findByProjectId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByIsenable", method = RequestMethod.GET)
   public List<Channel> queryByIsenable(@RequestParam("id") Long id) {
       List<Channel> result = service.findByIsenable(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Channel> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Channel findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Channel result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Channel> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Channel> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Channel save2(@RequestBody Channel item) {

		System.out.println("input device params:" + item.toString());
		Channel result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Channel updateSave(@RequestBody Channel item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Channel result = service.save(item);
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