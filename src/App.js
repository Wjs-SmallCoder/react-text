import {Component} from 'react'
import {Route,Switch} from 'react-router-dom'

import 'antd/dist/antd.less';

import Login from './containers/login/login'
import Admin from './containers/admin/admin'

export default class App extends Component {
  render() {
    return (
      <div className="root">
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
        </Switch>
      </div>
    )
  }
}