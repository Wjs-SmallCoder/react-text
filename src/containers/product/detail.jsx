import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Card,Button,List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {BASE_URL} from '../../config'
import {reqSearchByIdProduct,reqCategoryList} from '../../api'
import './css/detail.less'

class Detail extends Component {
    state = {
        categoryId: '',
        categoryName: '',
        desc: '',
        detail: '',
        imgs: [],
        name: '',
        price: '',
        isLoading: true
    }

    componentDidMount() {
        // console.log(this.props) // 里面的match 能够拿到url 的值
        this.getIdProduct()
    }

    getIdProduct = () => {
        // let result = await reqSearchByIdProduct()
        const getProdList = this.props.prodList
        const categoryList = this.props.categoryList
        const {id} = this.props.match.params // 通过id 在props 取数据
        if (getProdList.length !== 0) {
            let result = getProdList.find((item) => {
                return item._id === id
            })
            
            if (result) {
                this.categoryId = result.categoryId // 在this.setState 之前将id 添加到this（解决1）
                // this.state 是异步，this.setSatte 能够将值添加到state，但是this.state 不会更新
                this.setState({...result})
            }
        } else {
            // 如果props 没有数据 通过id 请求服务器
            this.getByIdProduct(id)
        }
        // 将这段代码提出componentDidMount (解决2)
        if(categoryList.length) {
            // 先点击分类管理才有值(详情页的分类)
            let result = categoryList.find((item) => {
                return item._id === this.categoryId
            }) 
            this.setState({categoryName:result.name,isLoading: false})
        } else {
            // 如果不是先点击分类管理 则没有值 则请求服务器
            this.getCategoryList()
        }
    }

    getByIdProduct = async(id) => {
        let result = await reqSearchByIdProduct(id)
        const {status,data} = result
        if (status === 0) {
            this.categoryId = data.categoryId
            // this.state 异步 
            this.setState({...data})
        }
    }

    getCategoryList = async() => {
        let result = await reqCategoryList()
        const {status,data} = result
        if (status === 0) {
            let result = data.find((item) => {
                return item._id === this.categoryId
            })
            if (result) this.setState({categoryName: result.name,isLoading: false})
        }
    }

    render() {
        return (
            <div>
               {/* <Button onClick={() => {this.props.history.goBack()}}>返回</Button> */}
               <Card title={
                   <div className="left-top">
                       <Button type="link" size="small" onClick={() => {this.props.history.goBack()}}><ArrowLeftOutlined/></Button>
                       <span>商品详情</span>
                   </div>
               }
               >
                    <List
                loading={this.state.isLoading}
                bordered
                    >
                        <List.Item>
                            <span className="prod-title">商品名称</span>
                            <span>{this.state.name}</span>
                        </List.Item>
                        <List.Item>
                            <span className="prod-title">商品描述</span>
                            <span>{this.state.desc}</span>
                        </List.Item>
                        <List.Item>
                            <span className="prod-title">商品价格</span>
                            <span>{this.state.price}</span>
                        </List.Item>
                        <List.Item>
                            <span className="prod-title">所属分类</span>
                            <span>{this.state.categoryName}</span>
                        </List.Item>
                        <List.Item>
                            <span className="prod-title">商品图片</span>
                           {
                               this.state.imgs.map((item,index) => {
                                return <img src={BASE_URL + '/upload/'+item} alt="商品图片" key={index}></img>
                               })
                           }
                        </List.Item>
                        <List.Item>
                            <span className="prod-title">商品详情</span>
                            <span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
                        </List.Item>
                    </List>
               </Card>
            </div>
        )
    }    
}

export default connect(
    state => ({
        prodList: state.prodList,
        categoryList: state.categoryList
    })
)(Detail)