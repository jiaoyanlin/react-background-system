import React, { Component } from 'react'
import createContainer from 'UTIL/createContainer'
// import { Link } from 'react-router'
import { rootPath } from 'SERVICE/xhr/config'
import { Table, Button, Input, message, Icon, Modal } from 'antd'

class Calllist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            tableHei: 500,
            sortedInfo: null,
            pagination: {
                total: 0,
                pageSize: 3,
                current: 1
            },
            loading: false,
            searchText: ''
        }
    }
    handleTableChange = (pagination, filters, sorter) => {
        // console.log('页码', pagination, filters, sorter)
        // console.log('页码', pagination.current)
        const lastPage = this.state.pagination.current
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({
            pagination: pager,
            sortedInfo: sorter
        })
        if (lastPage != pager.current) {
            this.fetch({
                current: pagination.current
            })
        }
    }
    fetch = (params = {}) => {
        this.setState({ loading: true })
        $.get(rootPath + '/api/searchArticle',
            {
                token: sessionStorage.getItem('token'),
                user: sessionStorage.getItem('user'),
                id: sessionStorage.getItem('id'),
                search: this.state.searchText,
                page: params.current - 1 // 后台数据从0开始计数，而这里的页码组件从1开始计数
            },
            (data) => {
                console.log('-----获取文章列表：', data)
                this.setState({
                    loading: false
                })
                if (data.code == 200) {
                    var list = data.result
                    var newData = []
                    for (var i = 0; i < list.length; i++) {
                        newData.push({
                            key: i,
                            title: list[i].title,
                            content: list[i].content,
                            updateTime: list[i].updateTime,
                            id: list[i]._id
                        })
                    }
                    this.setState({
                        data: newData,
                        pagination: {
                            ...this.state.pagination,
                            total: data.total
                        }
                    })
                } else {
                    message.error('获取失败')
                }
            }
        )
    }
    handleSearchInput = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    handleSearchOk = () => {
        // console.log('-----search', this.state.searchText)
        this.setState({
            pagination: {
                ...this.state.pagination,
                current: 1
            }
        }, () => {
            this.fetch({current: 1})
        })
    }
    handleClickDelete = (id) => {
        console.log('------------id:', id)
        Modal.confirm({
            title: '提示',
            content: '确定删除该文章吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                $.post(rootPath + '/api/deleteArticle', {
					token: sessionStorage.getItem('token'),
                    user: sessionStorage.getItem('user'),
                    id: sessionStorage.getItem('id'),
                    articleId: id
				}, (data) => {
					console.log('----删除结果：', data)
					if (data.code == 200) {
                        message.success('删除成功')
                        this.fetch({current: this.state.pagination.current})
					} else {
						message.error(data.message)
					}
				})
            }
        })
    }
    handleClickEdit = (title, content, id) => {
        console.log('----------title', title)
        console.log('----------content', content)
        this.props.setArticle({
            title,
            content
        })
        window.location.href = '/#/manage/articlelist/detail/' + id
    }
    componentDidMount() {
        this.fetch({
            current: 1
        })
        this.setState({
            tableHei: document.querySelector('.main').offsetHeight - 360
        })
        $(window).on('resize', () => {
            this.setState({
                tableHei: document.querySelector('.main').offsetHeight - 360
            })
        })
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state
        sortedInfo = sortedInfo || {}
        filteredInfo = filteredInfo || {}
        const columns = [{
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            width: 120,
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order
        }, {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: 120,
            render: (value) => {
                return value
            },
            sorter: (a, b) => new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime(),
            sortOrder: sortedInfo.columnKey === 'updateTime' && sortedInfo.order
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 80,
            render: (val, record, index) => {
                return (
                    <div>
                        {/* <Link to={'/manage/articlelist/detail/' + record.id}>
                            <Button type="primary" size="small">编辑</Button>
                        </Link> */}
                        <Button type="primary" size="small" onClick={this.handleClickEdit.bind(this, record.title, record.content, record.id)}>编辑</Button>
                        <Button type="danger" size="small" style={{marginLeft: 10}} onClick={this.handleClickDelete.bind(this, record.id)}>删除</Button>
                    </div>
                )
            }
        }]
        return (
            <div className="reglist">
                <div className="title">
                    <span className="search">
                        <Input
                            placeholder="请输入文章标题进行搜索"
                            prefix={<Icon type="search" />}
                            style={{ width: 300 }}
                            onChange={this.handleSearchInput}
                        />
                        <Button type="primary" size="large" style={{ marginLeft: 50, position: 'relative', top: '1px' }} onClick={this.handleSearchOk}>确定</Button>
                    </span>
                </div>
                    {/* this.state.data.length &&
                    <div className="action">
                        <a className="csv-btn" href={rootPath2 + '/publics/data/export?token=' + sessionStorage.getItem('token') + '&type=3'}>导出为csv</a>
                    </div> */}
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    scroll={{ y: this.state.tableHei }}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default createContainer(
    ({ app }) => {
        return {
            // wechatUserList: app.wechatUserList
            // nowOnlineWechat: app.nowOnlineWechat,
            // adminSocket: app.adminSocket
        }
    },        // mapStateToProps,
    require('ACTION/app/').default,    // mapActionCreators,
    Calllist // 木偶组件
)
