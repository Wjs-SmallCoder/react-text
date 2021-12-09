import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {createDeleteUser} from '../../redux/actions/login-action-creator'

class Admin extends Component {
    loginExit = () => {
        this.props.deleteUser()
    }
    
    render() {
        console.log(this.props)
        const {user,isLogin} = this.props.loginData
        if (!isLogin) {
            // this.props.history.replace('/login')
            return <Redirect to="/login"/>
        } else {
            return (
                <div>
                    {user.username}
                    <button onClick={this.loginExit}>退出</button>
                </div>
            )
        }
    }
}

export default connect(
    state => ({
        loginData: state.loginData
    }),
    {
       deleteUser: createDeleteUser
    }
)(Admin)