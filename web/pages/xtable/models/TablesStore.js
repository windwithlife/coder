import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  TableItem = {
    id:1,
    name:"oldName",
    description:"oldDescription",
    defineText:'',
    status:-1
}
let TableData = {
    currentItem :TableItem,
    list:[]
}
class TableStore extends BaseStore {
    @observable dataObject = TableData;
    constructor() {
        super('xtable');
    }

    @action.bound
    add(values,callback){
        
        this.model.add(values, function(response) {
            if (response && response.data) {
                console.log(response.data);
                callback(response.data);
            }
        })
    }
    @action.bound
    queryAll(){
        let that = this;
        this.model.queryAll(function (response) {
            if (response && response.data) {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.dataObject.list= response.data;
            }
        });
    }
    @action.bound
    queryByModuleId(id){
        let that = this;
        this.model.query("/queryByModule",{id:id},function (response) {
            if (response && response.data) {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.dataObject.list= response.data;
            }
        });

    }
    @action.bound
    queryById(id){
        let that = this;
        that.model.queryById(id,function(response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem = response.data;
            }
        })
    }

    @action.bound
    removeById(index,id){
        let that = this;
        this.model.removeById(id, function() {
            console.log('successful to remove: ID:' + id);
            //const dataSource = [...that.];
            //dataSource.splice(index, 1);
            that.dataObject.list.splice(index,1);
        });

    }
   
    
}

export default TableStore;
