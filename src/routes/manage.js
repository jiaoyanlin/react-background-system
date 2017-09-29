export default {
  path: 'manage',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      // 立即注入 Reducer
      // injectReducer('msg', require('REDUCER/msg/').default)

      cb(null, require('VIEW/manage').default)
    }, 'manage')
  },

  indexRoute: { // 对应 /manage
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('VIEW/base').default)
      }, 'base')
    }
  },

  childRoutes: [
    require('./write').default,
    require('./articlelist').default
  ]
}
