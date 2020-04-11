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
@RequestMapping("/pxmodulepxtable")
public class PxmodulepxtableController {
	@Autowired
	PxmodulepxtableService service;

	@Autowired
    PxmodulepxtableQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByPxmoduleId", method = RequestMethod.GET)
   public List<Pxmodulepxtable> queryByPxmoduleId(@RequestParam("id") Long id) {
       List<Pxmodulepxtable> result = service.findByPxmoduleId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPxmoduleName", method = RequestMethod.GET)
   public List<Pxmodulepxtable> queryByPxmoduleName(@RequestParam("id") Long id) {
       List<Pxmodulepxtable> result = service.findByPxmoduleName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPxtableId", method = RequestMethod.GET)
   public List<Pxmodulepxtable> queryByPxtableId(@RequestParam("id") Long id) {
       List<Pxmodulepxtable> result = service.findByPxtableId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPxtableName", method = RequestMethod.GET)
   public List<Pxmodulepxtable> queryByPxtableName(@RequestParam("id") Long id) {
       List<Pxmodulepxtable> result = service.findByPxtableName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Pxmodulepxtable> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Pxmodulepxtable findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Pxmodulepxtable result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Pxmodulepxtable> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Pxmodulepxtable> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Pxmodulepxtable save2(@RequestBody Pxmodulepxtable item) {

		System.out.println("input device params:" + item.toString());
		Pxmodulepxtable result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Pxmodulepxtable updateSave(@RequestBody Pxmodulepxtable item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Pxmodulepxtable result = service.save(item);
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


   

    
    @ResponseBody
    @RequestMapping(value = "/addNewByList", method = RequestMethod.POST)
    public int addNewByList(@RequestBody List<Pxmodulepxtable> items) {
            for(Pxmodulepxtable item:items){
                System.out.println("input device params:" + item.toString());
                Pxmodulepxtable result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Pxmodulepxtable> items) {
                for(Pxmodulepxtable item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}