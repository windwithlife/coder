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
@RequestMapping("/pxpagexinterface")
public class PxpagexinterfaceController {
	@Autowired
	PxpagexinterfaceService service;

	@Autowired
    PxpagexinterfaceQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByPxpageId", method = RequestMethod.GET)
   public List<Pxpagexinterface> queryByPxpageId(@RequestParam("id") Long id) {
       List<Pxpagexinterface> result = service.findByPxpageId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPxpageName", method = RequestMethod.GET)
   public List<Pxpagexinterface> queryByPxpageName(@RequestParam("id") Long id) {
       List<Pxpagexinterface> result = service.findByPxpageName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXinterfaceId", method = RequestMethod.GET)
   public List<Pxpagexinterface> queryByXinterfaceId(@RequestParam("id") Long id) {
       List<Pxpagexinterface> result = service.findByXinterfaceId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXinterfaceName", method = RequestMethod.GET)
   public List<Pxpagexinterface> queryByXinterfaceName(@RequestParam("id") Long id) {
       List<Pxpagexinterface> result = service.findByXinterfaceName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Pxpagexinterface> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Pxpagexinterface findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Pxpagexinterface result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Pxpagexinterface> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Pxpagexinterface> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Pxpagexinterface save2(@RequestBody Pxpagexinterface item) {

		System.out.println("input device params:" + item.toString());
		Pxpagexinterface result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Pxpagexinterface updateSave(@RequestBody Pxpagexinterface item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Pxpagexinterface result = service.save(item);
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
    public int addNewByList(@RequestBody List<Pxpagexinterface> items) {
            for(Pxpagexinterface item:items){
                System.out.println("input device params:" + item.toString());
                Pxpagexinterface result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Pxpagexinterface> items) {
                for(Pxpagexinterface item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}