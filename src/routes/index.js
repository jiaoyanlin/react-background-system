import { injectReducer } from 'REDUCER'

export default {
  path: '/',

  /* 布局基页 */
    getComponent (nextState, cb) {
      require.ensure([], (require) => {

        injectReducer('app', require('REDUCER/app/').default)

        cb(null, require('VIEW/App').default)

      }, 'App')
    },

    indexRoute: { // 对应 /
      getComponent (nextState, cb) {
        require.ensure([], (require) => {

          cb(null, require('VIEW/login').default)
        }, 'Login')
      }
    },

    childRoutes: [
        // 路由按模块组织分离，避免单文件代码量过大
        require('./manage').default, // 下面再设置子菜单
        // require('./customer').default,

        // 强制“刷新”页面的 hack
        { path: 'redirect', component: require('COMPONENT/Redirect').default },

        { path: '*', component: require('COMPONENT/404').default }
    ]
}

/*
  当前路由树如下
  ├ /
  |
  ├ /msg
  ├ /msg/add
  ├ /msg/detail/:msgId
  ├ /msg/modify/:msgId
  |
  ├ /todo
  |
  ├ /redirect
*/
