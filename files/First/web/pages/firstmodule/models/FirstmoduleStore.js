import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    
}
let Data = {
    currentItem :DataItem,
    
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('firstmodule');
        this.dataObject = Data;
    }
    
    
    @action.bound
    mytestsoa(inputParams){
        let that = this;
        this.model.("/",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.mytestsoaResponse= response.data;
            }
        });

    }
  
}



