import { useStaticRendering } from 'mobx-react';
import Store from './Store';
import TableStore from '../zxtable/models/TablesStore.js'
/*import AppStore from "./AppStore";
import AuthStore from "./AuthStore";
import PostsStore from "./PostsStore";
import CommentsStore from "./CommentsStore";
import UIStore from "./UIStore";
import authApi from "../api/authApi";
import postApi from "../api/postApi";
import commentApi from "../api/commentApi";*/

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

function composeStores(initialData){
    const store = new Store(isServer, initialData)
    const tablesStore = new TableStore();
    /*const appStore = new AppStore();
    const authStore = new AuthStore(authApi, appStore);
    const postsStore = new PostsStore(postApi, appStore, authStore);
    const commentsStore = new CommentsStore(commentApi, appStore, authStore);
    const uiStore = new UIStore();*/

    const stores = {
        store,
        tablesStore
       /* appStore,
        authStore,
        postsStore,
        commentsStore,
        uiStore*/
    };
    return stores;
}


let stores = null;
export function initializeStore (initialData) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return composeStores(initialData);
    }else{
        if (stores === null) {
           stores = composeStores(initialData)
        }
        return stores;
    }
}


