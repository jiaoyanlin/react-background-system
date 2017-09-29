export default {
  path: 'login',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('VIEW/login').default)
    }, 'loginView')
  }

  // indexRoute: {
  //   getComponent (nextState, cb) {
  //     require.ensure([], (require) => {
  //       cb(null, require('COMPONENT/Message/MessageManage').default)
  //     }, 'MessageManage')
  //   }
  // }
}
