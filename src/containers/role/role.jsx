import React, { Component } from 'react'
import {reqRoleList,reqAddRole,reqAuthRole} from '../../api'
import {connect} from 'react-redux'
import {ROLE_PAGESIZE} from '../../config'
import menuList from '../../config/menu-config' // 引入所有左侧菜单的值
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Form, 
  Input,
  Tree,
} from 'antd'

import dayjs from 'dayjs'

const {Item} = Form

// import Auth from './auth'
// import {
//   getRolesAsync,
//   addRoleAsync,
//   updateRoleAsync
// } from '../../redux/action-creators/roles'
// import AddForm from './add-form'


/* 
Admin的角色管理子路由组件
roles
*/

class Role extends Component {

  state = {
    isShowAdd: false,
    isShowAuth: false,
    roleList: [],
    menuList: menuList,
    checkedKeys: [], // 被选中的
    _id: ''
  }

  componentDidMount() {
    this.getRoleList()
  }

  authRef = React.createRef()
  formRef = React.createRef()

  columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: create_time => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: auth_time => auth_time?dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss'):''
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
    {
      title: '操作',
      render: (item) => <Button type="link" onClick={() => this.showAuth(item._id)}>设置权限</Button>
    },
  ]

  getRoleList = async() => {
    let result = await reqRoleList()
    const {status,data,msg} = result 
    if (status === 0) {
        this.setState({roleList: data})
    } else {
        message.error(msg,1)
    }
  }

  addRole = () => {
    this.formRef.current.validateFields() // antd v4 将validateFields 变为promise
    .then(
        async(values) => {
          // 
            // console.log(typeof(values))
            // 这里的values 是一个obj，通过取出里面的roleName 获取值 
            let result = await reqAddRole(values.roleName)
            const {status,msg} = result
            if (status === 0) {
                message.success('添加成功',1)
                this.getRoleList()
                this.setState({isShowAdd: false})
                this.formRef.current.resetFields() // 输入框变为空
            } else {
                message.error(msg,1)
            }
        }
    )
    .catch(
        errInfo => {
            console.log(errInfo)
        }
    )
  }

  hideAdd = () => {
    this.formRef.current.resetFields()
    this.setState({
      isShowAdd: false
    })
  }

  updateRole = async () => {
    const {_id,checkedKeys} = this.state
    const {username} = this.props.loginData.user
    let result = await reqAuthRole({_id,menus:checkedKeys,auth_name:username})
    // console.log(_id,checkedKeys,username)
    const {status,msg} = result
    if (status === 0) {
      message.success('更新成功',1)
    } else {
      message.error(msg,1)
    }
  }

  showAuth = (id) => {
    const {roleList} = this.state
    let result = roleList.find((item) => {
      return item._id === id
    })
      if (result) {
        this.setState({checkedKeys: result.menus})
      }
    // 缓存要更新的role
      this.setState({
        isShowAuth: true,
        _id: id
      })
  }

  hideUpdate = () => {
    this.setState({
      isShowAuth: false
    })
  }

  onCheck = checkedKeys => this.setState({checkedKeys})

  render() {
    const {isShowAdd, isShowAuth} = this.state
    const title = <Button type="primary" onClick={() => {this.setState({isShowAdd: true})}}>添加角色</Button>

    // const {getFieldDecorator} = this.props.form
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={this.state.roleList}
          columns={this.columns}
          pagination={{
            pageSize: ROLE_PAGESIZE,
          }}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.hideAdd}
        >
            {/* ref 需要在form 包裹使用，不然就会报function 组件不会获取到ref  (其实这是在class 组件使用[可能将item 当作function 组件]) */}
            <Form ref={this.formRef} > 
            {/* name 属性是触发rules 里面message 或者说是提交表单的key 必须要(不能触发onFinish 和message)*/}
                <Item label="角色名称" {...formLayout} name="roleName"
                    rules={[
                        {required: true, message: '角色名称必须输入'}
                    ]}>
                    <Input placeholder="请输入角色名称"/>
                </Item>
            </Form>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={this.hideUpdate}
        >
          {/* <Auth role={this.role || {}} ref={this.authRef}/> */}
          <Tree treeData={this.state.menuList} 
            defaultExpandAll 
            checkable 
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
          >
          </Tree>
         </Modal>
       </Card>
    )
  }
}

export default connect(
    state => ({
        // roles: state.roles, 
        loginData: state.loginData
    }),
    {
        // getRolesAsync, 
        // addRoleAsync, 
        // updateRoleAsync
    }
)(Role)