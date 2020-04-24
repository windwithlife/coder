import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    
        id:'',
        
    
        name:'',
        
    
        title:'',
        
    
    children:[],
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('room');
        this.dataObject = Data;
    }
    
    
    @action.bound
    queryAll(inputParams){
        let that = this;
        this.model.queryRaw("/MedicalLive/room/queryAll",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.queryAllResponse= response.data;
            }
        });

    }
  
    @action.bound
    queryById(inputParams){
        let that = this;
        this.model.queryRaw("/MedicalLive/room/queryById",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.queryByIdResponse= response.data;
            }
        });

    }
  
    @action.bound
    add(inputParams){
        let that = this;
        this.model.postRaw("/MedicalLive/room/save",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.addResponse= response.data;
            }
        });

    }
  
    @action.bound
    update(inputParams){
        let that = this;
        this.model.postRaw("/MedicalLive/room/update",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.editResponse= response.data;
            }
        });

    }
  
    @action.bound
    remove(inputParams){
        let that = this;
        this.model.postRaw("/MedicalLive/room/remove",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.removeResponse= response.data;
            }
        });

    }
  
}



