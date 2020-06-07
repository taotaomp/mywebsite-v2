import request from '@/utils/request'

export function queryAll(params) {
    return request({
        url: '/workLog/queryWorkLog',
        method: 'post',
        data: params
    })
}

export function queryAllByPage(params) {
    return request({
        url: '/workLog/queryWorkLogByPage',
        method: 'post',
        data: params
    })
}

export function insert(params) {
    return request({
        url: '/workLog/insert',
        method: 'post',
        data: params
    })
}

export function update(params) {
    return request({
        url: '/workLog/update',
        method: 'post',
        data: params
    })
}

export function deleteById(params) {
    return request({
        url: '/workLog/delete',
        method: 'post',
        data: params
    })
}

export function uploadWorkLog(params) {
    return request({
        url: '/workLog/uploadWorkLog',
        method: 'post',
        data: params
    })
}