import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu} from 'antd'
import {connect} from "react-redux"
import { createSaveTitle } from '../../../redux/actions/save-action-creator'

import './left-nav.less'
import menulist from '../../../config/menu-config'
import logo from '../../../static/img/logo.png'

const { SubMenu } = Menu;

class Left extends Component {
    componentDidMount() {
        // this.props.saveTitle(menulist[0].title) // 默认登入后第一个页面的展示的当前页面值
    }

    createMenu = (target) => {
        return target.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} onClick={() => {this.props.saveTitle(item.title)}}>
                        <Link to={item.path}>
                            {item.icon}
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.createMenu(item.children)}
                    </SubMenu> 
                )
            }
        })
    }

    render() {
        let {pathname} = this.props.location
        return (
            <div>
                <header className="left-nav-header">
                    <img src={logo} alt="" />
                    <h1>后台系统</h1>
                </header>
                <Menu
                defaultSelectedKeys={pathname.indexOf('product') !== -1?'product':pathname.split('/').reverse()[0]} // 拿到location 里面的pathname // 解决product 子菜单点击后左导航少了title
                defaultOpenKeys={pathname.split('/').splice(2)} // 拿到pathname 路径后两位
                mode="inline"
                theme="dark"
                >
                    {
                       this.createMenu(menulist)
                    }
                {/* <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/admin/home">
                        首页
                    </Link>
                </Menu.Item>
                <SubMenu key="prod_about" icon={<ShoppingOutlined />} title="商品">
                    <Menu.Item key="category">
                        <Link to="/admin/prod_about/category">
                            <UnorderedListOutlined />
                            分类管理
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="product">
                        <Link to="/admin/prod_about/product">
                            <ToolOutlined />
                            商品管理
                        </Link>
                    </Menu.Item>
                </SubMenu> */}
                </Menu>
            </div>
        )
    }
}


export default connect(
    state => ({

    }),{
        saveTitle : createSaveTitle
    }
)(withRouter(Left)) // 这里使用withRouter 是因为实现点击刷新后的位置与刷新前一样，需要获取路由路径，需要将该组件添加到路由去(通过this.props.location 获取))