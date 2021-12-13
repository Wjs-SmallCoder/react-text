import {Component} from 'react'
import { reqCategoryList } from '../../api';
import {Table,Card,Button, message,Modal} from 'antd' 
import {PlusCircleOutlined} from '@ant-design/icons';
import {PAGESIZE} from '../../config'

export default class Category extends Component {
    state = {
        categoryList: [],
        visible: false,
        operType: ''
    }

    getCategoryList = async() => {
        let result = await reqCategoryList()
        const {status,msg,data} = result
        if (status === 0) {
            this.setState({categoryList: data})
        } else message.error(msg,1)
    }

    componentDidMount() {
        this.getCategoryList()  
    }
    
    showAdd = () => {
        this.setState({
            operType: '新增分类',
            visible: true
        })
      };

      showUpdate = () => {
        this.setState({
            operType: '修改分类',
            visible: true
        })
      };
    
      handleOk = () => {
        this.setState({
            visible: false
        })
      };
    
      handleCancel = () => {
        this.setState({
            visible: false
        })
      };

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
              dataIndex: 'operation', // 当使用render 和dataIndex 时，dataIndex 作为传递的数据name 来控制数据(单独使用render 时将传递所有数据)
              key: 'operation',
              align: 'center',
              width: '25%',
              render: (a) => {return <Button type="link" onClick={this.showUpdate}>修改分类</Button>}
            }
          ];

        return (
            <div>
                <Card title="Default size card" extra={<Button href="#" type="primary" onClick={this.showAdd}><PlusCircleOutlined />添加</Button>}>
                    {/* bordered 边框 rowKey key 的值 pagination 每页展示条数*/}
                    {/* table 自动分页 (真分页 后端(每次分页需发送请求)  假分页 前端(获取全部数据通过前端分别展示)) */}
                    <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" pagination={{pageSize: PAGESIZE}}/>
                </Card>
                <Modal title={this.state.operType} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText="确定" cancelText="取消" >
                    <p>000</p>
                </Modal>
            </div>
        )
    }
}