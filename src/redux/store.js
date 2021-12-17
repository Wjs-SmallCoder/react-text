// 状态管理文件

import { createStore,applyMiddleware } from "redux"; // createStore 创建store 核心 applyMiddleware 支持第三方组件
import reducer from './reducers' // 引用操作props 的文件 index
import thunk from 'redux-thunk' // 在action 的creators 文件内使用异步函数时使用
import {composeWithDevTools} from 'redux-devtools-extension' // 让浏览器能够和redux 交互

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk))) // createStore(render,第三方库)
