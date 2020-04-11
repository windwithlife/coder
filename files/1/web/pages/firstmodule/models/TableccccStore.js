import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    
        secondcol:'',
        
    
        colthree:'',
        
    
        fieldList:'',
        
    
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('tablecccc');
        this.dataObject = Data;
    }
    
    
    @action.bound
    firstinterface(inputParams){
        let that = this;
        this.model.post("/firstinterface",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.firstinterfaceResponse= response.data;
            }
        });

    }
  
    @action.bound
    testmyinterface(inputParams){
        let that = this;
        this.model.query("/testmyinterface",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.testmyinterfaceResponse= response.data;
            }
        });

    }
  
    @action.bound
    test(inputParams){
        let that = this;
        this.model.query("/test",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.testResponse= response.data;
            }
        });

    }
  
}



