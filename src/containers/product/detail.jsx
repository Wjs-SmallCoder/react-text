import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Card,Button,List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqSearchByIdProduct} from '../../api'
import './css/detail.less'

class Detail extends Component {
    state = {
        categoryId: '',
        desc: '',
        detail: '',
        imgs: [],
        name: '',
        price: '',
    }

    componentDidMount() {
        // console.log(this.props) // 里面的match 能够拿到url 的值
        this.getIdProduct()
    }

    getIdProduct = () => {
        // let result = await reqSearchByIdProduct()
        const getProdList = this.props.prodList
        const {id} = this.props.match.params
        if (getProdList.length !== 0) {
            let result = getProdList.find((item) => {
                return item._id === id
            })
            
            if (result) {
                const { 
                    categoryId,
                    desc,
                    detail,
                    imgs,
                    name,
                    price
                } = result
                this.setState({categoryId,
                    desc,
                    detail,
                    imgs,
                    name,
                    price})
            }
        } else {
            this.getByIdProduct(id)
        }
    }

    getByIdProduct = async(id) => {
        let result = await reqSearchByIdProduct(id)
        console.log(result)
        const {status,data} = result
        if (status === 0) {
            const { 
                categoryId,
                desc,
                detail,
                imgs,
                name,
                price
            } = data
            this.setState({categoryId,
                desc,
                detail,
                imgs,
                name,
                price})
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
               }>
                    <List
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
                            <span>{this.state.categoryId}</span>
                        </List.Item>
                        <List.Item>
                            <span className="prod-title">商品图片</span>
                           {
                               this.state.imgs.map((item,index) => {
                                return <img src={`/upload/`+item} alt="商品图片" key={index}></img>
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
        prodList: state.prodList
    })
)(Detail)