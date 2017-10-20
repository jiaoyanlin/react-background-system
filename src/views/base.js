import React, { Component } from 'react'
import createContainer from 'UTIL/createContainer'
import { telPattern } from 'UTIL/common/'
import { Input, Button, message, Spin } from 'antd'
import { rootPath } from 'SERVICE/xhr/config'

class AnalysisDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            user: '',
            name: '',
            phone: '',
            motto: '',
            photo: ''
        }
    }
    componentWillMount() {
        this._getInfo()
    }
    componentDidMount() {
        if (!sessionStorage.getItem('token')) {
            $('.click-to-login').get(0).click()
        }
    }
    _getInfo() {
        $.ajax({
            method: 'get',
            url: rootPath + '/api/getUserinfo',
            data: {
                token: sessionStorage.getItem('token'),
                user: sessionStorage.getItem('user'),
                id: sessionStorage.getItem('id')
            },
            success: (data) => {
                console.log('----userinfo:', data)
                if (data.code == 200) {
                    var result = data.result
                    $('.pre-img').attr('src', rootPath + result.img)
                    this.setState({
                        motto: result.motto,
                        name: result.name,
                        phone: result.phone,
                        user: result.user
                    })
                }
            }
        })
    }
    handleChangeMotto(e) {
        this.setState({
            motto: e.target.value
        })
    }
    handleChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }
    handleAddPhoto() {
        // 图片预览
        let file = $('.add_photo')[0]
        let f = file.files[0]
        if (!/image\/\w+/.test(f.type)) {
            $(file).val('')
            message.info('请确保文件为图像类型')
            return false
        }
        if (f.size > 1024 * 1024) { // 1M以下
            $(file).val('')
            message.info('上传的图片必须小于1M')
            return false
        }
        let reader = new FileReader()
        let _this = this
        reader.onload = (function (theFile) {
            return function (e) {
                _this.setState({
                    photo: e.target.result
                })
                var formData = new FormData()
                formData.append('fulAvatar', f)
                $.ajax({
                    url: rootPath + '/api/uploadImg',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false, // 不可缺参数
                    processData: false, // 不可缺参数
                    success: function(data) {
                        console.log('---上传:', data)
                        if (data.code == 200) {
                            // message.success('上传成功')
                            $('.pre-img').attr('src', rootPath + data.result)
                        } else {
                            this.setState({
                                photo: ''
                            })
                            message.error('上传失败')
                        }
                        $('.add_photo').val('')
                    },
                    error: function() {
                        console.log('error')
                    }
                })
            }
        })(f)
        reader.readAsDataURL(f)
    }
    handleOk() {
        if (!this.state.name) {
            message.warning('请填写姓名')
            return false
        }
        if (!telPattern(this.state.phone)) {
            message.warning('手机号码格式不正确')
            return false
        }
        this.setState({
            loading: true
        })
        $.post(rootPath + '/api/updateUserinfo',
            {
                token: sessionStorage.getItem('token'),
                id: sessionStorage.getItem('id'),
                user: sessionStorage.getItem('user'),
                motto: this.state.motto,
                name: this.state.name,
                phone: this.state.phone.replace('-', ''),
                img: $('.pre-img').attr('src').replace(rootPath, '')
            },
            (data) => {
                console.log('-----更新基本信息：', data)
                if (data.code == 200) {
                    message.success('更新成功')
                } else {
                    message.error('更新失败')
                }
                this.setState({
                    loading: false
                })
            }
        )
    }
    render() {
        return (
            <div className="base">
                <div className="head-title"><span>个人信息</span></div>
                <Spin spinning={this.state.loading} tip="加载中...">
                    <ul className="list">
                        <li className="item">
                            <span>用户名：</span>
                            {this.state.user}
                        </li>
                        <li className="item">
                            <span>头像：</span>
                            <div className="item-img">
                                <img className="pre-img" src={this.state.photo} alt="" />
                                <div className="img-up">
                                    <Button type="primary" icon="upload" size="small">上传</Button>
                                    <input className="add_photo" type="file" onChange={this.handleAddPhoto.bind(this)} />
                                </div>
                            </div>
                        </li>
                        <li className="item">
                            <span>联系人名字：</span>
                            <Input style={{ width: 380, height: 20 }}
                                placeholder="请填写名字"
                                value={this.state.name}
                                onChange={this.handleChangeName.bind(this)} />
                        </li>
                        <li className="item">
                            <span>联系人手机：</span>
                            <Input style={{ width: 380, height: 20 }}
                                placeholder="请填写手机或者固定电话"
                                value={this.state.phone}
                                onChange={this.handleChangePhone.bind(this)} />
                        </li>
                        <li className="item">
                            <span>格言：</span>
                            <Input style={{ width: 380, height: 20 }}
                                placeholder="请填写格言"
                                value={this.state.motto}
                                onChange={this.handleChangeMotto.bind(this)} />
                        </li>
                        <li className="item">
                            <Button type="primary" onClick={this.handleOk.bind(this)}>保存</Button>
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
