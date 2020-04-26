package xyz.staffjoy.account.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import xyz.staffjoy.account.AccountConstant;
import xyz.staffjoy.account.dto.*;
import xyz.staffjoy.common.api.BaseResponse;
import xyz.staffjoy.common.auth.AuthConstant;
import xyz.staffjoy.common.validation.Group1;
import xyz.staffjoy.common.validation.PhoneNumber;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import com.simple.server.auto.MedicalLive.dto.*;

@FeignClient(name ="MedicalLive", path = /v1/MedicalLive, url = "${staffjoy.account-service-endpoint}")
// TODO Client side validation can be enabled as needed
// @Validated
public interface MedicalLiveClient {
    
   @ResponseBody
   @RequestMapping(value = "/room/queryAll", method = RequestMethod.GET)
   public RoomsResponse queryAll(@RequestBody  request);
   
   @ResponseBody
   @RequestMapping(value = "/room/queryById", method = RequestMethod.GET)
   public RoomResponse queryById(@RequestBody Long request);
   
   @ResponseBody
   @RequestMapping(value = "/room/save", method = RequestMethod.POST)
   public RoomResponse save(@RequestBody RoomRequest request);
   
   @ResponseBody
   @RequestMapping(value = "/room/update", method = RequestMethod.POST)
   public RoomResponse update(@RequestBody RoomRequest request);
   
   @ResponseBody
   @RequestMapping(value = "/room/remove", method = RequestMethod.POST)
   public Long remove(@RequestBody Long request);
   
   
}
