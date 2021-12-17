import React,{Component} from 'react'
import { reqCategoryList ,reqAddCategory,reqUpdateCategory } from '../../api';
import {connect} from 'react-redux'
import { createSaveCateList } from '../../redux/actions/category-action-creator';
import {Table,Card,Button, message,Modal,Form,Input} from 'antd' 
import {PlusCircleOutlined} from '@ant-design/icons';
import {PAGESIZE} from '../../config'

class Category extends Component {
    state = {
        categoryList: [],
        visible: false,
        operType: '',
        isLoading: true,
        currentValue: '',
        currentId: '',
      }
    
    componentDidMount() {
      this.getCategoryList()  
  }

    getCategoryList = async() => {
        let result = await reqCategoryList()
        this.setState({isLoading: false})
        const {status,msg,data} = result
        if (status === 0) {
            this.setState({categoryList: data.reverse()})
            this.props.categoryList(data)
        } else message.error(msg,1)
    }
    
    showAdd = () => {
        this.setState({
          operType: 'add',
          currentValue: '',
          currentId: '',
          visible: true
        })
      };

      showUpdate = (item) => {
        const {_id,name} = item
        console.log(name)
        this.setState({
          // bug this.state 异步，this.setState 生效但是this.state 不会
            currentValue: name,
            currentId: _id,
            operType: 'update',
            visible: true
        },() => {
          //  添加回调解决this.setState ，没有更新的问题
          console.log(this.state.currentValue)
        })
      };

      toAdd = async(values) => {
        let result = await reqAddCategory(values)
        const {status,data,msg} = result
        if (status === 0) {
          message.success('新增商品成功')
          let categoryList = [...this.state.categoryList] // 当state 和里面的值是数组或对象时使用
          categoryList.unshift(data)
          this.setState({
            categoryList: data
          })
          this.setState({
            visible: false
          })
          this.formRef.current.resetFields();
        }
        else message.error(msg,1) 
      }

      toUpdate = async(categoryObj) => {
        let result = await reqUpdateCategory(categoryObj)
        // console.log(categoryObj,result)
        const {status,msg} = result
        if (status === 0) {
          message.success('修改成功',1)
          this.getCategoryList()
          this.setState({
            visible: false
          })
        } 
        else {
          message.error(msg,1)
        }
      }
    
      handleOk = () => {
        let {operType} = this.state
        // console.log(this.formRef.current )
        this.formRef.current.validateFields() // 使用表单里的rule return promise
          .then((values) => {
            if (operType === 'add') {
              this.toAdd(values)
            } else if (operType === 'update') {
              const categoryId = this.state.currentId
              const categoryName = values.categoryName
              const categoryObj = {categoryId,categoryName}
              this.toUpdate(categoryObj)
            }
          })
          .catch((errorInfo) => {
            message.warning(errorInfo.errorFields[0].errors)
          })
      };
    
      handleCancel = () => {
        this.formRef.current.resetFields();
        this.setState({
            visible: false
        })
      };

      formRef = React.createRef();

    render() {
      
        const dataSource = 
            this.state.categoryList
          ;

          
          const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              // dataIndex: 'operation', // 当使用render 和dataIndex 时，dataIndex 作为传递的数据name 来控制数据(单独使用render 时将传递所有数据)
              key: 'operation',
              align: 'center',
              width: '25%',
              render: (item) => {return <Button type="link" onClick={() => {this.showUpdate(item)}}>修改分类</Button>}
            }
          ];

        return (
            <div>
                <Card  extra={<Button href="#" type="primary" onClick={this.showAdd}><PlusCircleOutlined />添加</Button>}>
                    {/* bordered 边框 rowKey key 的值 pagination 每页展示条数*/}
                    {/* table 自动分页 (真分页 后端(每次分页需发送请求)  假分页 前端(获取全部数据通过前端分别展示)) */}
                    <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" pagination={{pageSize: PAGESIZE,showQuickJumper:true}} loading={this.state.isLoading}/>
                </Card>
                <Modal title={this.state.operType === 'add'?'添加分类':'修改分类'} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText="确定" cancelText="取消" >
                  <Form ref={this.formRef}>
                    <Form.Item
                      name="categoryName"
                      initialValue={
                          this.state.currentValue
                      }
                      rules={[
                        { required: true, message: '必须输入分类名' },
                      ]}
                    >
                      <Input placeholder='请输入分类名'/>
                    </Form.Item>
                  </Form>
                </Modal>
            </div>
        )
    }
}

export default connect(
  state => ({
    // 获取redux 里的state 的值
    
  }),{
    // 看作添加到redux 里的state 去的方法 
    categoryList: createSaveCateList
  }
)(Category)