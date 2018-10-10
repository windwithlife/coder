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
@RequestMapping("/channeltabledefine")
public class ChanneltabledefineController {
	@Autowired
	ChanneltabledefineService service;

	@Autowired
    ChanneltabledefineQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByChannelId", method = RequestMethod.GET)
   public List<Channeltabledefine> queryByChannelId(@RequestParam("id") Long id) {
       List<Channeltabledefine> result = service.findByChannelId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByChannelName", method = RequestMethod.GET)
   public List<Channeltabledefine> queryByChannelName(@RequestParam("id") Long id) {
       List<Channeltabledefine> result = service.findByChannelName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByTabledefineId", method = RequestMethod.GET)
   public List<Channeltabledefine> queryByTabledefineId(@RequestParam("id") Long id) {
       List<Channeltabledefine> result = service.findByTabledefineId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByTabledefineName", method = RequestMethod.GET)
   public List<Channeltabledefine> queryByTabledefineName(@RequestParam("id") Long id) {
       List<Channeltabledefine> result = service.findByTabledefineName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Channeltabledefine> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Channeltabledefine findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Channeltabledefine result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Channeltabledefine> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Channeltabledefine> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Channeltabledefine save2(@RequestBody Channeltabledefine item) {

		System.out.println("input device params:" + item.toString());
		Channeltabledefine result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Channeltabledefine updateSave(@RequestBody Channeltabledefine item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Channeltabledefine result = service.save(item);
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
    public int addNewByList(@RequestBody List<Channeltabledefine> items) {
            for(Channeltabledefine item:items){
                System.out.println("input device params:" + item.toString());
                Channeltabledefine result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Channeltabledefine> items) {
                for(Channeltabledefine item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}