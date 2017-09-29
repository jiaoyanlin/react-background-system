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
            <div className="base">
                <div className="head-title"><span>个人信息</span></div>
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
