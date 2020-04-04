import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    <% data.fields.forEach(function(field){
       if(field.fieldType =='int'){%>
        <%=field.name%>:-1,
       <%}else{%>
        <%=field.name%>:'',
        <%}%>
    <%})%>
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('<%=data.tableName%>');
        this.dataObject = Data;
    }
}



