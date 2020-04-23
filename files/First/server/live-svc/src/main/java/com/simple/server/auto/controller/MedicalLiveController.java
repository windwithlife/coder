package com.simple.server.auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

import com.simple.server.auto.entity.*;
import com.simple.server.auto.service.*;
import com.simple.server.auto.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/MedicalLive")
public class MedicalLiveController {
	@Autowired
	MedicalLiveService service;

	// @Autowired
    // QueryDao queryDao;

    
   
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<MedicalLive> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public MedicalLive findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	MedicalLive result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<MedicalLive> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<MedicalLive> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public MedicalLive addSave(@RequestBody MedicalLive item) {

		System.out.println("input device params:" + item.toString());
		MedicalLive result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public MedicalLive updateSave(@RequestBody MedicalLive item,@PathVariable Long id) {
     	System.out.println("input params id and name:" + item.toString());
     	MedicalLive result= null;
        try{
          MedicalLive old = service.findById(id);
          
          result = service.save(old);
        }catch (Exception e){
                System.out.println("***************failed to update item******  ***********");
                e.printStackTrace();
                return null;
        }
        return result;
    }

    
    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable Long id) {
    	service.remove(id);
    	return id;
    }

    
   
   
}