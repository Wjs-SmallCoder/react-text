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