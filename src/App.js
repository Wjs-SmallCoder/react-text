import {Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import 'antd/dist/antd.less';

import Login from './containers/login/login'
import Admin from './containers/admin/admin' // 后台主要页面

export default class App extends Component {
  render() {
    return (
      <div className="root">
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Redirect to="/admin"/>
        </Switch>
      </div>
    )
  }
}