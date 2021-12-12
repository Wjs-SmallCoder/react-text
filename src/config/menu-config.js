/* 
左侧Menu导航的数据配置
*/
// 根据menuList生成<Item>和<SubMenu>组件的数组
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: 'home', // 对应的path
    path: '/admin/home', // 图标名称
    isPublic: true, // 不需要进行权限检查
  },
  {
    title: '商品分类',
    key: 'prod_about',
    children: [ // 子菜单列表
      {
        title: '商品',
        key: 'category',
        path: '/admin/prod_about/category',
      },
      {
        title: '产品',
        key: 'product',
        path: '/admin/prod_about/product'
      },
    ]
  },

  {
    title: '用户',
    key: 'user',
    path: '/admin/user'
  },
  {
    title: '角色',
    key: 'role',
    path: '/admin/role'
  },

  {
    title: '图表',
    key: 'charts',
    children: [
      {
        title: 'bar',
        key: 'bar',
        path: '/admin/charts/bar'
      },
      {
        title: 'line',
        key: 'line',
        path: '/admin/charts/line'
      },
      {
        title: 'pie',
        key: 'pie',
        path: '/admin/charts/pie'
      },
    ]
  },
]

export default menuList