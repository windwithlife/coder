package .entity;

import java.io.Serializable;



import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import .entity.*;

import java.util.List;

public class TestRequestDTO implements Serializable {
	private static final long serialVersionUID = 1L;

    
    private String name;         
    
    private int id;         
    
    private String type;         
    

    public TestRequestDTO() {
    } 
   


    
       
    public String getName(){
        return this.name;
    }   
    public void setName(String name){
        this.name = name;
    }        
    
       
    public int getId(){
        return this.id;
    }   
    public void setId(int id){
        this.id = id;
    }        
    
       
    public String getType(){
        return this.type;
    }   
    public void setType(String type){
        this.type = type;
    }        
    

    @Override
	public String toString() {
		return "CLASS DATA: [" +"id=" + this.id +'name='+ this.name +"]";
	}
}
