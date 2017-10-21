import React, { Component } from 'react'
import createContainer from 'UTIL/createContainer'
// import { rootPath } from 'SERVICE/xhr/config'
import { Input, Button, message, Spin } from 'antd'
import { rootPath } from 'SERVICE/xhr/config'
const { TextArea } = Input

class Calllist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleId: '',
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
        $.post(rootPath + '/api/updateArticle',
            {
                token: sessionStorage.getItem('token'),
                id: sessionStorage.getItem('id'),
                user: sessionStorage.getItem('user'),
                articleId: this.state.articleId,
                title: this.state.title,
                content: this.state.content
            },
            (data) => {
                console.log('-----更新文章：', data)
                if (data.code == 200) {
                    message.success('更新成功')
                    this.setState({
                        title: '',
                        content: ''
                    })
                } else {
                    message.error('更新失败')
                }
                this.setState({
                    loading: false
                })
            }
        )
    }
    componentDidMount() {
        let id = this.props.params.id
        this.setState({
            articleId: id,
            title: this.props.nowArticle.title,
            content: this.props.nowArticle.content
        })
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
            nowArticle: app.nowArticle
        }
    },
    '',
    Calllist
)
