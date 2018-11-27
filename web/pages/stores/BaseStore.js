import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseModel from '../common/components/models/modelCommon.js';

class BaseStore {
    @observable items = [];
    model= BaseModel
    commonModel = BaseModel
  constructor(moduleName) {
      if (moduleName){
          this.model = new BaseModel(moduleName);
      }
  }

   @computed get
    dataLength() {
        return this.items.length;
    }
   @action fetchAll() {
        console.log("begin to load data from server")
        let that = this;
        this.model.queryAll(function (response) {
            if (response && response.data) {
                console.log("have received data!")
                //console.log(JSON.stringify(response.data));
                console.log(response.data);
                that.items.length =0;
                response.data.map(function (item, i) {
                    item.key = item.id
                    that.items.push(item);
                });
                console.log(that.items)
                //that.items = response.data;

            }
        });
    }

    @action fetchByNameLike(keywork) {
        console.log("begin to load data from server")
        let that = this;
        this.model.queryByNameLike(keyword,function (response) {
            if (response && response.data) {
                console.log("have received data!")
                //console.log(JSON.stringify(response.data));
                console.log(response.data);
                that.items.length =0;
                response.data.map(function (item, i) {
                    item.key = item.id
                    that.items.push(item);
                });
                console.log(that.items)
                //that.items = response.data;
            } //the end of if
        });
    }

    @action
    getItemById(id) {
        let that = this;
        this.model.queryById(id, action("确保只触发一次数据更新通知",function (response) {
            if (response && response.data) {
                console.log(" loaded data is",response.data);
                that.name = response.data.name;
                for(let [key,value] of Object.entries(that)){
                    if ((key=='model')||(key=='commonModel')||(key=='items')){
                        console.log("skipped Key",key);
                        continue;
                    }else{
                        console.log("each Key",Object.getOwnPropertyDescriptor(that,key));
                        let descriptor = Object.getOwnPropertyDescriptor(that,key);
                        if (descriptor.set){
                            descriptor.set.bind(that)(response.data[key]);
                        }
                    }

                }
            }
        }))
    }
    @action
    updateItem(callback){
        let data = {};
        for(let [key,value] of Object.entries(this)){
            if ((key != 'items')||(key!='model')||(key!='commontModel')){
                data[key] = value;
            }
        }
        console.log("mobx real data:",data);
        this.model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                callback();

            }else{}
        })
    }
    @action
    addItem(callback){
        let data = {};
        for(let [key,value] of Object.entries(this)){
            if ((key != 'items')||(key!='model')||(key!='commontModel')){
                data[key] = value;
            }
        }
        this.model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                callback(response.data);
            }else{}
        })
    }
    @action
    removeItemById(index, record) {
        let that = this;
        this.model.removeById(record.id, function () {
            console.log('successful to remove: ID:' + record.id);
            that.items.splice(index, 1);
        });
    }
    onFieldChange(field,value) {
        if (this[field]){
            this[field] = value;
            console.log("found the value changed Field:",field,"Value:", value);
        }
    }
    onFormFieldsChange(fields){
        for (var field in this){
            if(fields[field]){
                var values = fields[field];
                this[field] = values.value;
                console.log('changed filed is ', values.name, 'changed value is', values.value);

            }
        }
        console.log("notified by form value change in store", fields)
    }
}

export default BaseStore;
