package com.simple.server.auto.MedicalLive.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;



import com.simple.server.auto.MedicalLive.entity.*;
import com.simple.server.auto.MedicalLive.service.*;
import com.simple.server.auto.MedicalLive.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/MedicalLive")
public class MedicalLiveModuleController {
	
	// @Autowired
    // QueryDao queryDao;

    
    @Autowired
    private  RoomService roomService;
    
  
 	


    
   
   
}