import React, { Component } from 'react'
import createContainer from 'UTIL/createContainer'

class AnalysisDelete extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className="analysis-delete">
                文章列表
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
