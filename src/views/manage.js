import React, { Component } from 'react'
import { Link } from 'react-router'
import createContainer from 'UTIL/createContainer'
// import Navbar from 'COMPONENT/Navbar/'
import { IndexLink } from 'react-router'
import { Layout, Menu, Icon, Modal } from 'antd'
const { Header, Sider, Content, Footer } = Layout
// const SubMenu = Menu.SubMenu
// import AppIndexShow from './AppIndexShow'
// import { servicePath } from 'SERVICE/xhr/config'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            img: '',
            delSelKdy: ['1']
        }
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    handleLogout () {
        Modal.confirm({
            title: '提示',
            content: '确定退出登录吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                sessionStorage.removeItem('token')
                $('.click-to-login').get(0).click()
            }
        })
    }
    handleNav(test) {
        console.log('------test:', test)
    }
    componentWillMount() {
        var { pathname } = this.props.location
        let ind = 1
        if (pathname.indexOf('/manage/write') != -1) {
            ind = 2
        } else if (pathname.indexOf('/manage/articlelist') != -1) {
            ind = 3
        }
        this.setState({
            delSelKdy: [ind.toString()]
        })
    }

    componentDidMount() {
        if (!sessionStorage.getItem('token')) {
            $('.click-to-login').get(0).click()
        }
    }

    render() {
        let { children } = this.props
        return (
            <div className="main">
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo">
                            <img className="logo-img" src="/static/images/head.jpg" alt=""/>
                            <span className="text hidden">后台系统</span>
                        </div>
                        <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} defaultSelectedKeys={this.state.delSelKdy}>
                            <Menu.Item key="1" onClick={this.handleNav.bind(this, 'aaa')}>
                                <Link to='/manage' className="nav-link">
                                    <Icon type="user" />
                                    <span>
                                        个人信息
                                    </span>
                                </Link> 
                                {/* <span>基本信息</span> */}
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/manage/write' className="nav-link">
                                    <Icon type="edit" />
                                    <span>
                                        文章录入
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to='/manage/articlelist' className="nav-link">
                                    <Icon type="book" />
                                    <span>
                                        文章列表
                                    </span>
                                </Link>
                            </Menu.Item>
                            {/* <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>User</span></span>}
                                >
                                <Menu.Item key="111">Tom</Menu.Item>
                                <Menu.Item key="222">Bill</Menu.Item>
                                <Menu.Item key="333">Alex</Menu.Item>
                            </SubMenu> */}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle.bind(this)}
                            />
                            <div className="hea-admin">
                                <span className="hea-admin-name">{sessionStorage.getItem('user')}</span>
                                <span className="logout-btn" onClick={this.handleLogout.bind(this)}>退出登录</span>
                            </div>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 380 }}>
                            { children }
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            2016 © biscall.com
                        </Footer>
                    </Layout>
                </Layout>
                <div style={{textIndent: '-99999px', height: '0'}}>
                    <IndexLink to='/' className="click-to-login">
                        登录
                    </IndexLink>
                </div>
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
