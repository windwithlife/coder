import App, {Container} from 'next/app'
import React from 'react'
import { initializeStore } from './stores/index'
import { Provider } from 'mobx-react'
import Layout from './common/pages/layout.js'

class MyMobxApp extends App {
    static async getInitialProps(appContext) {
        // Get or Create the store with `undefined` as initialState
        // This allows you to set a custom default initialState
        const mobxStore = initializeStore()
        // Provide the store to getInitialProps of pages
        appContext.ctx.mobxStore = mobxStore

        let appProps = await App.getInitialProps(appContext)

        return {
            ...appProps,
            initialMobxState: mobxStore
        };
    }

    constructor(props) {
        super(props)
        this.mobxStore = initializeStore(props.initialMobxState)
        //this.context = this.props.con
    }

    render() {

        const { Component, pageProps } = this.props

        let  layoutName = "originNamePage";
        if (Component.getLayoutName){
            layoutName = Component.getLayoutName();
        }
        console.log("current PATH:" + pageProps.path)
        console.log(layoutName + Component.name)
        console.log(pageProps);


        return (<Container>
            <Provider {...this.mobxStore}>
                <Layout path={pageProps.path}>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </Container>)


    }
}
export default MyMobxApp
