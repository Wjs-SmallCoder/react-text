import React, { Component } from 'react'
import {reqCategoryList} from '../../api'
import PicturesWall from './picture_wall'
import {
  Card,
  Form,
  Input,
  Select,
  Button,
} from 'antd'
import {connect} from 'react-redux'

const {Item} = Form
const {Option} = Select

class AddUpdate extends Component {
    state = {   
        categoryList: []
    }

    componentDidMount() {
        // console.log(this.props.categoryList)
        const {categoryList} = this.props
        if (categoryList.length) this.setState({categoryList}) 
        else {
            this.getCategoryList()
        }
    }

    getCategoryList = async() => {
        let result = await reqCategoryList()
        const {status,data} = result
        if (status === 0) {
            this.setState({categoryList: data})
        }
    }

  render() {
    // const {getFieldDecorator} = this.props.form
    const formLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
      }
  
      const onFinish = (values) => {
        console.log(values)
      }
    
    return (
      <Card>
        <Form {...formLayout} onFinish={onFinish}>
            {/* 在使用rules 时需要添加name 属性才能触发 */}
          <Item label="商品名称" name="categoryName" 
            rules= {[
                {required: true, message: '商品名称必须输入'}
            ]}>
            {
              (
                <Input placeholder="商品名称">
                </Input>
              )
            }
            
          </Item>
          <Item label="商品描述"  name="categoryDesc"
                rules= {[
                  {required: true, message: '商品描述必须输入'}
                ]} >
            {
              (
                <Input placeholder="商品描述"></Input>
              )
            }
            
          </Item>
          <Item label="商品价格" name="categoryPirce"
            rules= {[
                {required: true, message: '商品价格必须输入'}
            ]}>
            {
              (
                <Input type="number" addonAfter="元" placeholder="商品价格"></Input>
              )
            }
            
          </Item>
          <Item label="商品分类" name="categorize"
            rules= {[
                {required: true, message: '商品分类必须选择'}
            ]}>
            {
              (
                <Select>
                      {this.state.categoryList.map((item) => {
                          return  <Option value={item.name} key={item._id}>{item.name}</Option>
                      })}
                </Select>
              )
            }
            
          </Item>
          <Item label="商品图片" wrapperCol={{ span: 9}}>
                <PicturesWall/>
          </Item>

          <Item label="商品详情" wrapperCol={{ span: 20 }}>
          </Item>
          
          <Item>
              {/* 设置按钮类型(作用) */}
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default connect(
    state => ({
        categoryList: state.categoryList
    }),
    {

    }
)(AddUpdate)