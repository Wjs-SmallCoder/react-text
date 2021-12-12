import {Component} from 'react'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom' // 将组件添加为路由(在非路由组件使用路由组件的api)
import { createDeleteUser } from '../../../redux/actions/login-action-creator'
import dayjs from 'dayjs'
import './css/header.less'
import { Modal,Button } from 'antd';
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import { reqWeather } from '../../../api'

class Header extends Component {
    state = {
        isFull: false,
        date: dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
    }


    fullscreen = () => {
        screenfull.toggle()
    }

    getWeather = async() => {
        let result = await reqWeather()
        console.log(result)
    }

    componentDidMount() {
        screenfull.on('change',() => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        })
        this.timer = setInterval(() => {
            this.setState({date: dayjs().format('YYYY年 MM月 DD日 HH:mm:ss')})
        },1000)
        this.getWeather()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }   

    loginOut = () => {
        const { confirm } = Modal
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <Button>是否要退出登录？</Button>,
            cancelText: '取消',
            okText: '确认',
            onOk:() => {
                // 这里使用箭头函数是为了指定this
                this.props.deleteUser()   
            },
            onCancel() {
            },
          });
    }

    render() {
        let {isFull,date} = this.state
        let {username} = this.props.loginData.user
        return (
            <header className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullscreen}>
                        {isFull?<FullscreenExitOutlined />:<FullscreenOutlined/>}
                    </Button>
                    <span className="username">欢迎 {username}</span>
                    {/* type=link 变为a 标签的效果 react/redux 不建议使用a 标签 */}
                    <Button type="link" onClick={this.loginOut}>退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {
                            this.props.location.pathname // 获取路径需要使用withRouter 来使用路由的api
                        } 
                    </div>
                    <div className="header-bottom-right">
                        {date}
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="" />
                        晴 温度 2~5
                    </div>
                </div>
            </header>
        )
    }
}

export default connect(
    state => ({
        loginData: state.loginData
    }),{
        deleteUser: createDeleteUser
    }
)(withRouter(Header))

