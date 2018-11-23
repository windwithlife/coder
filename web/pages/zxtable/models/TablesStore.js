import { observable, action, computed,toJS } from "mobx";
import model from './model.js';

class PostsStore {

    @observable item={id:0,name:'name',description:'desc',defineText:'',status:''};
    @observable items = [];  // 数组的元素是PostModel的实例

  constructor(appStore) {
      this.appStore = appStore;
  }

   @computed get
    dataLength() {
        return this.items.length;
    }
   @action fetchAllTables() {
        console.log("begin to load data from server")
        let that = this;
        model.queryAll(function (response) {
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

    @action
    getItemById(id) {
        let that = this;
        console.log("begin to load data item from server and ID =" + id)
        model.queryById(id, function (response) {
            if (response && response.data) {
                console.log(response.data);
                Object.assign(that.item,response.data);
            }
        })
    }
    @action
    updateItem(callback){
        let data = this.item;
        console.log("mobx real data:",this.item);
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                callback();

            }else{}
        })
    }
    @action
    addItem(callback){
        let data = this.item;
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                callback();
            }else{}
        })
    }
    @action
    removeById(index, record) {
        let that = this;
        model.removeById(record.id, function () {
            console.log('successful to remove: ID:' + record.id);
            that.items.splice(index, 1);
        });
    }
    onFieldsChange(fields){
        for (var field in this.item){
            if(fields[field]){
                var values = fields[field];
                this.item[field] = values.value;
                console.log('changed filed is ', values.name, 'changed value is', values.value);
            }
        }
        console.log("notified by form value change in store", fields)
    }

}

export default PostsStore;
