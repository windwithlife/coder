import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'

class TableStore extends BaseStore {
    @observable id = 0;
    @observable name = "oldName";
    @observable description = "oldDescription";
    @observable defineText;
    @observable status;

    searchText;
    constructor() {
        super('pxtable')
    }

}

export default TableStore;

