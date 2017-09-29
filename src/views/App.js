import React, { Component } from 'react'
import createContainer from 'UTIL/createContainer'
// import Navbar from 'COMPONENT/Navbar/'
import { IndexLink } from 'react-router'
// import AppIndexShow from './AppIndexShow'
// import { servicePath } from 'SERVICE/xhr/config'

let DevTools
if (__DEV__ && __COMPONENT_DEVTOOLS__) {
    // 组件形式的 Redux DevTools
    DevTools = require('COMPONENT/DevTools').default
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            disconnect: false,
            img: '/static/images/logo.png'
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        if (!sessionStorage.getItem('token')) {
            $('.click-to-login').get(0).click()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!sessionStorage.getItem('token')) {
            $('.click-to-login').get(0).click()
        }
    }

    render() {
        console.log('---openid:', sessionStorage.getItem('openid'))
        let { children} = this.props
        // let { location: { pathname } } = this.props
        // let conHei = window.innerHeight - 80
        // let flag = sessionStorage.getItem('openid') && pathname !== '/' // 非首页登录状态
        return (
            <div style={{width: '100%', height: '100%'}}>
                { children }
                <div style={{textIndent: '-99999px', height: '0'}}>
                    <IndexLink to='/' className="click-to-login">
                        登录
                    </IndexLink>
                </div>
                { DevTools && <DevTools /> }
            </div>
        )
    }
}

export default createContainer(
    ({ app }) => {
        return {
            adminUserInfo: app.adminUserInfo
        }
    },        // mapStateToProps,
    require('ACTION/app/').default,    // mapActionCreators,
    App // 木偶组件
)
