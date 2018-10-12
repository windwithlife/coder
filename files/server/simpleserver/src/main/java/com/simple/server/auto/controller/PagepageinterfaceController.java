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
@RequestMapping("/pagepageinterface")
public class PagepageinterfaceController {
	@Autowired
	PagepageinterfaceService service;

	@Autowired
    PagepageinterfaceQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByPageId", method = RequestMethod.GET)
   public List<Pagepageinterface> queryByPageId(@RequestParam("id") Long id) {
       List<Pagepageinterface> result = service.findByPageId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPageName", method = RequestMethod.GET)
   public List<Pagepageinterface> queryByPageName(@RequestParam("id") Long id) {
       List<Pagepageinterface> result = service.findByPageName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPageinterfaceId", method = RequestMethod.GET)
   public List<Pagepageinterface> queryByPageinterfaceId(@RequestParam("id") Long id) {
       List<Pagepageinterface> result = service.findByPageinterfaceId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPageinterfaceName", method = RequestMethod.GET)
   public List<Pagepageinterface> queryByPageinterfaceName(@RequestParam("id") Long id) {
       List<Pagepageinterface> result = service.findByPageinterfaceName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Pagepageinterface> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Pagepageinterface findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Pagepageinterface result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Pagepageinterface> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Pagepageinterface> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Pagepageinterface save2(@RequestBody Pagepageinterface item) {

		System.out.println("input device params:" + item.toString());
		Pagepageinterface result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Pagepageinterface updateSave(@RequestBody Pagepageinterface item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Pagepageinterface result = service.save(item);
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
    public int addNewByList(@RequestBody List<Pagepageinterface> items) {
            for(Pagepageinterface item:items){
                System.out.println("input device params:" + item.toString());
                Pagepageinterface result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Pagepageinterface> items) {
                for(Pagepageinterface item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}