import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    
        name:'',
        
    
        id:-1,
       
    
        type:'',
        
    
}
let Data = {
    currentItem :DataItem,
    
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('test');
        this.dataObject = Data;
    }
    
    
    @action.bound
    queryAll(inputParams){
        let that = this;
        this.model.("/",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.queryAllResponse= response.data;
            }
        });

    }
  
    @action.bound
    queryById(inputParams){
        let that = this;
        this.model.("/",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.queryByIdResponse= response.data;
            }
        });

    }
  
    @action.bound
    add(inputParams){
        let that = this;
        this.model.("/",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.addResponse= response.data;
            }
        });

    }
  
    @action.bound
    edit(inputParams){
        let that = this;
        this.model.("/",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.editResponse= response.data;
            }
        });

    }
  
    @action.bound
    remove(inputParams){
        let that = this;
        this.model.("/",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.removeResponse= response.data;
            }
        });

    }
  
}



