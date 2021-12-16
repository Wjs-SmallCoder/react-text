import {Component} from 'react'
import {Button} from 'antd'

export default class AddUpdate extends Component {
    componentDidMount() {
        // console.log(this.props.history)
    }
    render() {
        return (
            <div>
                add_update{this.props.match.params.id}
                <Button onClick={() => {this.props.history.goBack()}}>返回</Button>
            </div>
        )
    }
}