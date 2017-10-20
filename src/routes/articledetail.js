export default {
  path: 'articlelist/detail/:id',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('VIEW/articledetail').default)
    }, 'articledetail')
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
