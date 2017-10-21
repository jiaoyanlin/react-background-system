import React, { Component } from 'react'
import createContainer from 'UTIL/createContainer'
import { Input, Button, message, Spin } from 'antd'
import { rootPath } from 'SERVICE/xhr/config'
const { TextArea } = Input

class AnalysisDelete extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            loading: false
        }
    }
    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    handleChangeContent(e) {
        this.setState({
            content: e.target.value
        })
    }
    handleOk() {
        if (!this.state.title) {
            message.warning('请填写文章标题')
            return false
        }
        if (!this.state.content) {
            message.warning('请填写文章内容')
            return false
        }
        this.setState({
            loading: true
        })
        $.post(rootPath + '/api/addArticle',
            {
                token: sessionStorage.getItem('token'),
                id: sessionStorage.getItem('id'),
                user: sessionStorage.getItem('user'),
                title: this.state.title,
                content: this.state.content
            },
            (data) => {
                console.log('-----更新基本信息：', data)
                if (data.code == 200) {
                    message.success('添加成功')
                    this.setState({
                        title: '',
                        content: ''
                    })
                } else {
                    message.error('添加失败')
                }
                this.setState({
                    loading: false
                })
            }
        )
    }
    render() {
        return (
            <div>
                <Spin spinning={this.state.loading} tip="加载中...">
                    <ul className="list">
                        <li className="item">
                            <span>文章标题：</span>
                            <Input style={{ width: 500, height: 20 }}
                                value={this.state.title}
                                onChange={this.handleChangeTitle.bind(this)} />
                        </li>
                        <li className="item">
                            <span>文章内容：</span>
                            <TextArea style={{ width: 515, height: 500, resize: 'none' }}
                                value={this.state.content}
                                onChange={this.handleChangeContent.bind(this)} />
                        </li>
                        <li className="item">
                            <Button style={{margin: '20px auto 0 auto'}} type="primary" onClick={this.handleOk.bind(this)}>保存</Button>
                        </li>
                    </ul>
                </Spin>
            </div>
        )
    }
}

export default createContainer(
    ({ app }) => {
        return {
            wechatUserList: app.wechatUserList
            // nowOnlineWechat: app.nowOnlineWechat,
            // adminSocket: app.adminSocket
        }
    },        // mapStateToProps,
    '',    // mapActionCreators,
    AnalysisDelete // 木偶组件
)
