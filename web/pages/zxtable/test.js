import React from 'react';
import router from 'next/router';
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Clock from './Clock'
import { Form, Input,Button} from 'antd';

//import '../common/styles/App.less';

//const FormItem = Form.Item;

@inject('tablesStore') @observer
class EditForm extends React.Component {

    componentDidMount () {
        this.props.tablesStore.fetchAllTables();
    }

    componentWillUnmount () {
        //this.props.s.stop()
    }

    render () {
        return (
            <div>


            <nav>
                <h1> 总记录条数:{this.props.tablesStore.items.length}</h1>
            {this.props.tablesStore.items.map(function (item, i) {
                //item.key = item.id
                return(<Link>{item.name}</Link>)
            })}
            <Link ><a>Navigate</a></Link>
            </nav>
            </div>
            )
    }
}




const MyForm = Form.create()(EditForm);

export default class Page extends React.Component{

    render(){
        return (<MyForm query={this.props.query}/>)
    }
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

