import React, { Component } from 'react'
import {reqCategoryList,reqAddProduct,reqSearchByIdProduct,reqUpdateProduct} from '../../api'
import PicturesWall from './picture_wall'
import Editor from './editor'
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  message,
} from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons'

const {Item} = Form
const {Option} = Select

class AddUpdate extends Component {
    state = {   
        categoryList: [], 
        Type: 'add', // 判断是更新还是创建
        // 下面保存获取当前商品的信息
        categoryId: '', // 商品分类id
        name: '',
        imgs: [],
        detail: '',
        desc: '',
        price: '',
        _id: '', // 商品id
    }

    formRef = React.createRef() // antd 需要创建的form 实例对象 

    componentDidMount() {
        // console.log(this.props.categoryList)
        const {categoryList,prodList} = this.props
        const {id} = this.props.match.params
        if (categoryList.length) this.setState({categoryList}) 
        else {
          this.getCategoryList()
        }
        if (id) {
          this.setState({Type: 'update'})
          if (prodList.length) {
            let result = prodList.find((item) => {
              return item._id === id
            })
            if (result) {
              // 将 setState() 视为请求而不是立即更新组件的命令。为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。React 并不会保证 state 的变更会立即生效。
              // 使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)）
              // console.log(result)
                this.setState({...result})
                // 将获取到的图片传递
                this.refs.pictureWall.setimgsArr(result.imgs)
                // 将获取到的html传递
                this.refs.editor.setRickText(result.detail)
            } 
          } else {
            this.getProdList(id)
          }
        }
        // this.setState 异步处理(this.setState 进入js 异步回调，将setTimeout 放在异步回调内，排在this.setState 后则成功调用)
        setTimeout(() => {
          this.formRef.current.setFieldsValue({...this.state})
        })
    }

    // componentDidUpdate() {
    //    // 生命函数 组件更新调用 那时候this.state 已经更新成功，可以调用（导致额外的重新渲染,会影响组件性能）
    // // 如果在这里使用componentDidUpdate 将会在初始是商品修改页面成功渲染所有值
    //   this.formRef.current.setFieldsValue({...this.state})
    //   // console.log(this.state)
    // }

    getCategoryList = async() => {
      // 判断商品类型
        let result = await reqCategoryList()
        const {status,data} = result
        if (status === 0) {
            this.setState({categoryList: data})
        }
    }

    getProdList = async(Id) => {
      let result = await reqSearchByIdProduct(Id)
      const {status,data} = result
      if (status === 0) {
          this.setState({...data})
          // 更新state 再次修改form 默认值
          this.formRef.current.setFieldsValue({...this.state})
          // 将获取到的图片传递
          this.refs.pictureWall.setimgsArr(data.imgs)
          // 将获取到的html传递
          this.refs.editor.setRickText(data.detail)
      }
  }

  render() {
    // const {getFieldDecorator} = this.props.form
    const formLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 12 },
      }
  
      const onFinish = async(values) => {
        // console.log(this.refs.pictureWall.getimgsArr())
        // console.log(values)  
        let imgs = this.refs.pictureWall.getimgsArr()
        let detail = this.refs.editor.getRickText()
        const {Type,_id} = this.state
        let result
        if (Type === 'add') {
          result = await reqAddProduct({...values,imgs,detail})
        } else {
          result = await reqUpdateProduct({...values,imgs,detail,_id})
        }
        const {status,msg} = result
        if (status === 0) {
          message.success('操作成功',1)
          this.props.history.replace('/admin/prod_about/product')
        }
        else message.error(msg,1)
      }

    return (
      <Card title={
          <div className="left-top">
              <Button type="link" size="small" onClick={() => {this.props.history.goBack()}}><ArrowLeftOutlined/></Button>
              <span>{this.state.Type === 'add'?'商品添加':'商品修改'}</span>
          </div>
      }>
        <Form {...formLayout} onFinish={onFinish} ref={this.formRef} 
      >
            {/* 在使用rules 时需要添加name 属性才能触发 */}
          <Item label="商品名称" name="name"
            rules= {[
                {required: true, message: '商品名称必须输入'}
            ]}>
                <Input placeholder="商品名称">
                </Input>
          </Item>
          <Item label="商品描述" name="desc"
                rules= {[
                  {required: true, message: '商品描述必须输入'}
                ]} >
                <Input placeholder="商品描述"></Input>
            
          </Item>
          <Item label="商品价格" name="price"
            rules= {[
                {required: true, message: '商品价格必须输入'}
            ]}>
                <Input type="number" addonAfter="元" placeholder="商品价格"></Input>
            
          </Item>
          <Item label="商品分类" name="categoryId"
            rules= {[
                {required: true, message: '商品分类必须选择'}
            ]}>
                <Select >
                      {this.state.categoryList.map((item) => {
                          return  <Option value={item._id} key={item._id}>{item.name}</Option>
                      })}
                </Select>
            
          </Item>
          <Item label="商品图片" wrapperCol={{ span: 9}}>
                <PicturesWall ref="pictureWall"/>
          </Item>

          <Item label="商品详情" wrapperCol={{ span: 14 }}>
            <Editor ref="editor"/>
          </Item>
          
          <Item>
              {/* 设置按钮类型(作用) */}
            <Button type="primary" 
            htmlType="submit"
            >提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default connect(
    state => ({
        categoryList: state.categoryList,
        prodList: state.prodList
    }),
    {

    }
)(AddUpdate)