import {Component} from 'react'
import './css/login.less'
import logo from './images/logo.png'

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default class Login extends Component {
    render() {
        // v4 定义提交表单且数据验证失败后回调事件 该事件仅当校验通过后才会执行
          const onFinishFailed = ({ values, errorFields, outOfDate }) => {
            console.log('Received values of form: ', values, errorFields, outOfDate);
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