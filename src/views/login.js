import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import createContainer from 'UTIL/createContainer'
import { rootPath } from 'SERVICE/xhr/config'
import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
// import { browserHistory } from 'react-router'
const FormItem = Form.Item

class NormalLoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('点击登录: ', values)
				$.post(rootPath + '/api/login', {
					user: values.userName,
					pwd: values.password
				}, (data) => {
					console.log('----登陆结果：', data)
					if (data.code == 200) {
						sessionStorage.setItem('token', data.result.token)
						sessionStorage.setItem('id', data.result.id)
						sessionStorage.setItem('user', values.userName)
						$('.click-login').get(0).click()
					} else {
						message.error(data.message)
					}
				})
			}
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: '请输入账号!' }]
					})(
						<Input prefix={<Icon type="user" style={{ fontSize: 16 }} />} placeholder="请输入账号" />
						)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入密码!' }]
					})(
						<Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="请输入密码" />
						)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true
					})(
						<Checkbox>记住密码</Checkbox>
						)}
					{
						// <a className="login-form-forgot" href="">忘记密码</a>
					}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						登录
					</Button>

					<div style={{ textIndent: '-999999px' }}>
						<Link to='/manage' className="click-login">
							登录
						</Link>
					</div>
				</FormItem>
			</Form>
		)
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<div className="login-bg">
				<div className="login-con">
					<div className="logo">
						<img className="logo-img" src="/static/images/head.jpg" alt="" />
						<span className="text">欢迎登陆</span>
					</div>
					<WrappedNormalLoginForm setAdminuserinfo={this.props.setAdminuserinfo} />
				</div>
			</div>
		)
	}
}

export default createContainer(
	({ app }) => {
		return {
			// adminUserInfo: app.adminUserInfo
		}
	},        // mapStateToProps,
	require('ACTION/app/').default,    // mapActionCreators,
	Login // 木偶组件
)
