import { useStaticRendering } from 'mobx-react';
import Store from './Store';
import AuthStore from "./AuthStore";
import TableStore from '../xtable/models/TablesStore.js';
import ColumnStore from '../xtable/models/ColumnStore.js';
import ModuleStore from '../xmodule/models/ModuleStore';
import ProjectStore from '../xproject/models/ProjectStore';
//import TestStore from '../zxtable/models/TestStore.js'
/*import AppStore from "./AppStore";

import PostsStore from "./PostsStore";
import CommentsStore from "./CommentsStore";
import UIStore from "./UIStore";
import authApi from "../api/authApi";
import postApi from "../api/postApi";
import commentApi from "../api/commentApi";*/

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let stores = {
    network:new Store(),
    tablesStore:new TableStore(),
    columnsStore: new ColumnStore(),
    modulesStore: new ModuleStore(),
    projectsStore: new ProjectStore(),

}   


function retainStore(storeName){
    return stores[storeName];
}
function composeStores(storeName,initialData){
    if (storeName && initialData){
        store = retainStore(storeName);
        if(initialData){
            store.initialize(initialData);
        }
        stores[storeName] = store;
    }    
    return stores;
}



export function initializeStore (name,initialData) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return composeStores();
    }else{
        if(name &&  initialData){
            return  composeStores(name, initialData)
        }else{
            return  composeStores();
        }
        
      
    }
}


