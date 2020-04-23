package com.simple.server.auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping("/Test")
public class TestController {
	@Autowired
	TestService service;

	// @Autowired
    // TestQueryDao queryDao;

    
   
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Test> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Test findByKeyId(@PathVariable final Long id) {
        System.out.println("input param Id:" + id);
        final Test result = service.findById(id);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Test> findByNameLike(@RequestParam("name") final String name) {
        System.out.println("input param Name:" + name);
        return service.findByNameLike(name);

    }

    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Test> findByName(@RequestParam("name") final String name) {
        System.out.println("input param Name:" + name);
        return queryDao.findByName(name);

    }

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Test addSave(@RequestBody final Test item) {

        System.out.println("input device params:" + item.toString());
        final Test result = service.save(item);
        System.out.println("output device result data:" + result.toString());
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Test updateSave(@RequestBody final Test item, @PathVariable final Long id) {
        System.out.println("input params id and name:" + item.toString());

        try {
            final Test old = service.findById(id);

            old.setName(item.getName());

            old.setId(item.getId());

            old.setType(item.getType());

            final Test result = service.save(old);
        } catch (final Exception e) {
            System.out.println("***************failed to update item*****************");
            e.printStackTrace();
            return null;
        }
    }

    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Long remove(@PathVariable final Long id) {
        service.remove(id);
        return id;
    }

    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable final Long id) {
    	service.remove(id);
    	return id;
    }

    
   
   
}