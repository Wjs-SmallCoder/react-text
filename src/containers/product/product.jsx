import {Component} from 'react'
import {Card,Select,Input,Button,Table, message} from 'antd'
import {connect} from 'react-redux'
import {createSaveProdList} from '../../redux/actions/prod-action-creator'
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons'
import { reqProductList,reqUpdateProdStatus,reqSearchProduct } from '../../api'
import {PAGESIZE} from '../../config'
const { Option } = Select;

class Product extends Component {
    state = {
        productList: [],
        total: '', // 数据总长度
        current: 1, // 当前页面
        keyword: '',
        searchType: 'productName'
    }

    componentDidMount() {
        this.getProductList()
    }

    getProductList = async(page=1) => {
        let result 
        if (this.isSearch) {
            const {searchType,keyword} = this.state
            result = await reqSearchProduct(page,PAGESIZE,searchType,keyword)
        } else {
            result = await reqProductList(page,PAGESIZE)
        }
        const {status,data} = result
        if (status === 0) {
            this.setState({productList:data.list,total: data.total,current: data.pageNum})
            this.props.saveProdList(data.list)
        } else {
            message.error('获取商品列表失败',1)
        }
    }

    updateProdStatus = async({_id,status}) => {
        let productList = [...this.state.productList]
        if (status === 1) {
            status = 2
        } else {
            status = 1 
        }
        let result = await reqUpdateProdStatus(_id,status)
        if (result.status === 0) {
            message.success('更新成功',1)
            productList = productList.map((item) => {
                if (item._id === _id) { // 判断操作与替换的id 
                    item.status = status // 将操作完成的status 放入
                }
                return item
            })

            this.setState({productList: productList})
        } else {
            message.error('更新失败',1)
        }
    }

    search = async() => {
        this.isSearch = true
        this.getProductList()
        // const {status,data} = result
        // if (status === 0) {
        //     this.setState({
        //         productList: data.list,
        //         total: data.total
        //     })
        // } else message.error('搜索商品失败')
    }

    // onChange = (page,pageSize) => {
    //     // 能够拿到当前页面值和PAGESIZE
    //     this.setState({current: page})
    // }

    render() {
        const dataSource = this.state.productList
            
        const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
              width: '18%'
            },
            {
              title: '商品描述',
              // dataIndex: 'operation', // 当使用render 和dataIndex 时，dataIndex 作为传递的数据name 来控制数据(单独使用render 时将传递所有数据)
              dataIndex: 'desc',
              key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'prcie',
                width: '8%',
                align: 'center',
                render: (price) => {return "￥" + price}
            },
            {
                title: '状态',
                // dataIndex: 'status',
                align: 'center',
                width: '8%',
                key: 'status',
                render: (item) => {return <div><Button type={item.status === 1?'danger':'primary'} onClick={() => {this.updateProdStatus(item)}}>
                    {item.status === 1?'下架':'上架'}</Button><br/>{item.status === 1?'在售':'已停售'}</div>}
            },
            {
                title: '操作',
                // dataIndex: 'operation',
                key: 'operation',
                align: 'center',
                width: '6%',
                render: (item) => {return <div><Button type="link" onClick={() => {this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button><br/>
                <Button type="link" onClick={() => {this.props.history.push('/admin/prod_about/product/add_update/hdiuahs')}}>修改</Button></div>}
            }
          ];
        return (
            <div>
                <Card title={
                    <div>
                        <Select defaultValue="productName" onChange={(value) => this.setState({searchType: value})}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input placeholder='请输入搜索关键字' allowClear style={{width:'200px',margin: '0 10px'}}
                            onChange={(event) => this.setState({keyword: event.target.value})}
                        />
                        <Button type='primary' onClick={this.search}><SearchOutlined />搜索</Button>
                    </div>
                } extra={<Button type='primary' onClick={() => {this.props.history.push('/admin/prod_about/product/add_update')}}><PlusCircleOutlined />添加商品</Button>}>
                    {/* 这里使用<Link to='#'> 加上Button 的onClick 导致需要两次goBack 才能回到正常页面*/}
                    <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" pagination={{
                        total:this.state.total,
                        pageSize: PAGESIZE,
                        current:this.state.current,
                        onChange: this.getProductList
                    }}/>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({
        prodList: state.prodList
    }),{
        saveProdList: createSaveProdList
    }
)(Product)