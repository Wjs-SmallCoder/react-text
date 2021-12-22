src --- 
  api --- 存放请求接口
  config --- 设置服务器域名
  containers --- 容器组件(可以将UI组件和容器组件写在同一个文件下)(使用了connect 的组件称为容器组件)
  redux --- 
     actions ---
     reducers ---
     action_type.js
     store.js
  App.js --- 
  index.js --- 入口文件

使用redux react-redux react-router-dom redux-thunk axios antd

reducer 定义state 和操作state
action 定义方法

// 数据库引入 需放入admin_db

yarn add @babel/plugin-proposal-decorators (es6 转化器语法解义) 

全屏插件
  npm i screenfull@5.2.0 (6.0 不支持node)

时间戳插件
  npm i dayjs

jsonp(不使用axios )
  npm i jsonp

富文本编辑器（wysiwyg） what you see is what you get 
  <!-- 找react 版 -->
  需要 npm i 依赖包(下面)

  import { EditorState, convertToRaw } from 'draft-js';
  import { Editor } from 'react-draft-wysiwyg';
  import draftToHtml from 'draftjs-to-html';
  import htmlToDraft from 'html-to-draftjs';

this.setState 异步 同步问题
  在默认情况下，this.setState 是在react 管理下，而react 管理下就是异步，如果用原生函数（直接操作DOM）则脱离了react，则这次this.setState 为同步
  (一般多个setState 到最后这个函数体执行完成后state 就更新)
  why？
    批量更新 --- 将一个函数(或方法)内所有的this.setState 合并，最后在执行
      this.setState 会re-render(重渲染) 页面，如果在一个函数(方法)内多次重渲染，造成性能问题
      但如果只执行一次,this.state 就能够看作同步更新

    想要在多个setState 里的函数体拿得到及时更新的state 就需要在后面输出setTimeout
