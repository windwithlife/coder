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
@RequestMapping("/xmodulextable")
public class XmodulextableController {
	@Autowired
	XmodulextableService service;

	@Autowired
    XmodulextableQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByXmoduleId", method = RequestMethod.GET)
   public List<Xmodulextable> queryByXmoduleId(@RequestParam("id") Long id) {
       List<Xmodulextable> result = service.findByXmoduleId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXmoduleName", method = RequestMethod.GET)
   public List<Xmodulextable> queryByXmoduleName(@RequestParam("id") Long id) {
       List<Xmodulextable> result = service.findByXmoduleName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXtableId", method = RequestMethod.GET)
   public List<Xmodulextable> queryByXtableId(@RequestParam("id") Long id) {
       List<Xmodulextable> result = service.findByXtableId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXtableName", method = RequestMethod.GET)
   public List<Xmodulextable> queryByXtableName(@RequestParam("id") Long id) {
       List<Xmodulextable> result = service.findByXtableName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xmodulextable> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xmodulextable findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xmodulextable result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xmodulextable> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Xmodulextable> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xmodulextable save2(@RequestBody Xmodulextable item) {

		System.out.println("input device params:" + item.toString());
		Xmodulextable result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xmodulextable updateSave(@RequestBody Xmodulextable item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Xmodulextable result = service.save(item);
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
    public int addNewByList(@RequestBody List<Xmodulextable> items) {
            for(Xmodulextable item:items){
                System.out.println("input device params:" + item.toString());
                Xmodulextable result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Xmodulextable> items) {
                for(Xmodulextable item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}