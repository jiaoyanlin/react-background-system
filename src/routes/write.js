export default {
  path: 'write',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('VIEW/write').default)
    }, 'write')
  }

  // indexRoute: {
  //   getComponent (nextState, cb) {
  //     require.ensure([], (require) => {
  //       cb(null, require('COMPONENT/Customer/Customer').default)
  //     }, 'Customer')
  //   }
  // },
  // childRoutes: [
  // { // 对应 /customer/order
  //   path: 'order/:openid',
  //   getComponent (nextState, cb) {
  //     require.ensure([], (require) => {
  //       cb(null, require('COMPONENT/Customer/CustomerOrder').default)
  //     }, 'CustomerOrder')
  //   }
  // }]
}
