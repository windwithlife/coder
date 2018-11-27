import React from 'react'
//import { inject, observer } from 'mobx-react'
import { Form, Input,Button} from 'antd';
class test {
    x = 3;
    constructor(){
        this.y =5;
    }
}

class Child extends test{
    constructor(){
        super();
    }
    print(){
        console.log(this.x);
        console.log(this.y);
    }
}

export default class Page extends React.Component{
    componentDidMount () {
        //this.props.tablesStore.fetchAllTables();
        console.log("did mount");
    }

    render(){
        console.log("record render coutn");
        return (<div>test   </div>)
    }
}
Page.getInitialProps = async function(context){
    var x = new Child();
    x.print();
    return {query:context.query,path:context.pathname};
}

