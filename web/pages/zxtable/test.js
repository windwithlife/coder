import React from 'react'
//import { inject, observer } from 'mobx-react'
import { Form, Input,Button} from 'antd';

/*
class XXXForm extends React.Component {

    componentDidMount () {
        //this.props.tablesStore.fetchAllTables();
        console.log("did mount");
    }
    render () {
        console.log("record render coutn");
        return (
            <div>
                <h1> 总记录条数:</h1>
            </div>
            )
    }
}

const MyForm = Form.create()(XXXForm);
*/

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
/*Page.getInitialProps = async function(context){
    //return {query:context.query,path:context.pathname};
}*/

