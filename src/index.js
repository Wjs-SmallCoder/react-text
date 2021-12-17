import React from 'react'; // 引入react 核心代码
import ReactDOM from 'react-dom'; // 渲染DOM 需要通过react 来操作DOM(在react 里不能直接操作DOM(比如document.get 等)) 
import {BrowserRouter} from 'react-router-dom' // 需要前端路由时使用，在使用Route 的组件时需要用BrowerRouter 包裹
import App from './App';
import {Provider} from 'react-redux' // Provider 是一个强大的组件，数据和状态都交给他去管理，之后他的子组件通过Provider 获取数据以及状态
import store from './redux/store' // 加入状态管理

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);