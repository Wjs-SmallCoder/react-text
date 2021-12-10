import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {createSaveUser} from '../../redux/actions/login-action-creator'
import './css/login.less'
import logo from './images/logo.png'

import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api'

class Login extends Component {
    componentDidMount() {
        // console.log(this.props)
    }

    render() {
        // v4 定义提交表单且数据验证失败后回调事件 该事件仅当校验通过后才会执行
          const onFinishFailed = ({ values, errorFields, outOfDate }) => {
            console.log('Received values of form: ', values, errorFields, outOfDate);
          }

        //  表单通过验证调用
          const onFinish = (values) => {
            // 发送网络请求
              const {username,password} = values
            //   console.log(username,password)
            reqLogin(username,password) // 返回promise
            .then((result) => {
                const {status,msg,data} = result
                // console.log(result)
                if (status === 0) {
                    // console.log(data)
                    this.props.saveUser(data)
                    this.props.history.replace('/admin') // 替换地址栏(跳转)
                    // console.log(this.props.history)
                } else {
                    message.warning(msg,1)
                }
            })
            .catch((reason) => {
                console.log(reason)
            })
          }

          const {isLogin} = this.props

          if (isLogin) {
            return <Redirect to='/admin'/>
          }

        return (
            <div className="login">
                <div className="banner-top">
                    <img src={logo} alt="" />
                    <h1>后台系统</h1>
                </div>
                <div className="banner-bottom">
                    <h1>用户登录</h1>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                        {/* Form 拿出item后可以简写 */}
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '用户名错误' },
                            {max: 8,message: '用户名称不能超过8位'},
                            {min: 2,message: '用户名称不能小于2位'},
                            {pattern: /^\w+$/,message: '用户名称只能是字母、数字、下划线'}
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" style={{color: 'rgba(0,0,0,.25)'}}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: async (_,value) => 
                                // value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')), 必须返回(return)一个promise
                                {
                                    if (!value) {
                                        return Promise.reject(new Error('密码不能为空'))
                                    } else if (value.length > 8) {
                                        return Promise.reject(new Error('密码长度不能大于8位'))
                                    } else if (value.length < 4) {
                                        return Promise.reject(new Error('密码长度不能小于4位'))
                                    } else if ((/^\w+$/).test(value)) {
                                        // 上面是正则 判断是否符合这个表达式
                                        return Promise.resolve()
                                    }
                                }
                            },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        style={{color: 'rgba(0,0,0,.25)'}}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    // connect return dispatch() 将action 交给store  
    state => ({
        isLogin: state.loginData.isLogin
    }),{
        saveUser: createSaveUser // 存放的是props
    }
)(Login)