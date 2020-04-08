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
        //console.log('moduleid is :' + id);
        this.model.post("/firstinterface",inputParams,function (response) {
            if (response && response.data) {
                //console.log(JSON.stringify(response.data));
                console.log(response.data);
                that.dataObject.firstinterfaceResponse= response.data;
            }
        });

    }
  
}



