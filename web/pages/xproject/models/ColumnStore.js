import { observable, action, computed, toJS, runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';

let ColumnData = {currentItem: {
    id: 1,
        name: "oldName",
            fieldType: 1,
            referModule:"project",
            mapField:"id",
                description: "oldDescription",
                    xtableId: 9999
},
list: []};

class ColumnStore extends BaseStore {
    @observable dataObject = ColumnData;

    constructor(data) {
        super('xtablecolumn');
        if (data) {
            this.dataObject = data;
        }
    }

    @action.bound
    initializeByTableId(id) {
        let that = this;
        this.model.query("/queryByXtableId", { id: 9999 }, function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.list.splice(0, that.dataObject.list.length);
                response.data.forEach(element => {
                    that.dataObject.list.push(element);
                });
                //that.dataObject.list = response.data;
                console.log(that.dataObject.list);
            } else { console.log('failed to fetch table columns'); }
        })
    }

    @action
    removeById(id,index){
        let that = this;
        this.model.removeById(id, function () {
            console.log('successful to remove: ID:' + id);
            that.dataObject.list.splice(index, 1);
        });
    }
    @action
    addItem(callback) {
        let that = this;
        let data = this.dataObject.currentItem;
        this.model.add(data, function (response) {
            if (response && response.data) {
                console.log(response.data);
                callback(response.data);
                that.initializeByTableId(9999);
            } else { }
        })
    }

}

export default ColumnStore;

