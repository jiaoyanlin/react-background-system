// 根据传入的remarkname和nickname处理成最终显示的名字
export const dealName = (remark, nick) => {
    let name
    let num
    let patt = /<span\sclass=["']emoji\semoji([^>])+["']><\/span>/g
    if (remark) {
        num = remark.indexOf('###')
        // name = num == 0 ? nick : remark.slice(0, num)
        if (num == -1) {
            name = remark
        } else if (num == 0) {
            name = nick
        } else {
            name = remark.slice(0, num)
        }
    } else {
        name = nick // 当为微信登录号自己时，没有remarkname，如兰
    }
    if (name) name = name.replace(patt, '🙈')
    return name
}
// 模糊搜索  传入搜索框的选择器（inpnt）和要筛选的节点的选择器(li)
export function fuzzySearch (input, li) {
    console.log('模糊搜索执行开始传入的参数为', input, li)
    var str = $(input).val()
    console.log('模糊搜索执行开始输入的值为', str)
    var item = $(li)
    console.log('模糊搜索执行开始要搜索的元素', item)
    if (str) {
        $(li).addClass('hide')
        for (var i = 0; i < item.length; i++) {
            if (item.eq(i).attr('data-search')) {
                if (item.eq(i).attr('data-search').indexOf(str) > -1) {
                    item.eq(i).removeClass('hide')
                    console.log('模糊搜索执行成功')
                }
            }
        }
    } else {
        $(li).removeClass('hide')
    }

}

// ================================
// 处理时间
// ================================
// 转换时间为2014-10-02格式
export const tranToFormatTime = (myDate) => {
    myDate ? myDate = new Date(myDate) : myDate = new Date()
    // 获取当前年
    let year = myDate.getFullYear()
    // 获取当前月
    let month = myDate.getMonth() + 1
    // 获取当前日
    let date = myDate.getDate()
    return year + '-' + p(month) + '-' + p(date)
}
// 转换时间为11:11:11格式
export const tranToFormatTimeHms = (myDate) => {
    myDate ? myDate = new Date(myDate) : myDate = new Date()
    let h = myDate.getHours()
    let m = myDate.getMinutes()
    let s = myDate.getSeconds()
    return p(h) + ':' + p(m) + ':' + p(s)
}
// 处理时间戳为时分秒，time以s为单位
export const p = (s) => {
    return s < 10 ? '0' + s : s
}
// 转换时间为11:11格式
export const tranToDetailTime = (myDate) => {
    myDate = new Date(myDate)
    let h = myDate.getHours()
    let m = myDate.getMinutes()
    return p(h) + ':' + p(m)
}
// 根据传入的参数得到距离当前日期的范围：所有、一个月、三个月、12个月
export const dealKalTime = (time) => {
    let newTime = {}
    if (time == '0') {
        newTime.begin = ''
        newTime.end = ''
    } else if (time == '1') {
        newTime.begin = tranToFormatTime(Date.parse(new Date()) - 30 * 24 * 60 * 60 * 1000)
        newTime.end = tranToFormatTime(Date.parse(new Date()))
    } else if (time == '3') {
        newTime.begin = tranToFormatTime(Date.parse(new Date()) - 90 * 24 * 60 * 60 * 1000)
        newTime.end = tranToFormatTime(Date.parse(new Date()))
    } else if (time == '12') {
        newTime.begin = tranToFormatTime(Date.parse(new Date()) - 365 * 24 * 60 * 60 * 1000)
        newTime.end = tranToFormatTime(Date.parse(new Date()))
    }
    return newTime
}

// ================================
// 正则
// ================================
// 验证电话号码是否正确，正确返回true，否则false
export const telPattern = (str) => {
    return /^1[3|4|5|7|8][0-9]{9}$/.test(str) || /^([0-9]{3,4}(-)?)?[0-9]{7,8}$/.test(str)
}
