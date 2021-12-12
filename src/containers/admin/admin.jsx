import {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';
// import {
//   DesktopOutlined,
//   PieChartOutlined,
//   FileOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';

// import {reqCategoryList} from '../../api'
import {createDeleteUser} from '../../redux/actions/login-action-creator'
import Left from './left-nav/left-nav'
import Header from './header/header'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import './css/admin.less'

class Admin extends Component {
    loginExit = () => {
        // 这里用的是通过props 获取到store 再引入action 来操作reucer (下面的connect return) 都是通过dispatch
        this.props.deleteUser()
    }

    // get = async() => {
    //     // 使用axios 返回promise(异步)
    //     let result = await reqCategoryList()
    //     console.log(result)
    // }
    
    render() {
        const { Content, Footer, Sider } = Layout;
        const {isLogin} = this.props.loginData
        if (!isLogin) {
            // this.props.history.replace('/login')
            return <Redirect to="/login"/>
        } else {
            return (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider>
                        <Left/>
                    </Sider>
                    <Layout className="site-layout">
                        <Header/>
                        <Content>
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/prod_about/category" component={Category}/>
                                <Route path="/admin/prod_about/product" component={Product}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/role" component={Role}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Redirect to="/admin/home"/>
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>footer</Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}

// connect 做了return 和添加dispatch 
// function connect(createDeleteUser) {return (value) => {dispatch(createDeleteUser(value))}}
export default connect(
    state => ({
        loginData: state.loginData
    }),
    {
       deleteUser: createDeleteUser
    }
)(Admin)