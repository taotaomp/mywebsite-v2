import request from '@/utils/request'

export function queryAll(params) {
    return request({
        url: '/workType/queryAll',
        method: 'post',
        data: params
    })
}

export function queryAllByPage(params) {
    return request({
        url: '/workType/queryAllByPage',
        method: 'post',
        data: params
    })
}

export function insert(params) {
    return request({
        url: '/workType/insert',
        method: 'post',
        data: params
    })
}

export function update(params) {
    return request({
        url: '/workType/update',
        method: 'post',
        data: params
    })
}

export function deleteById(params) {
    return request({
        url: '/workType/delete',
        method: 'post',
        data: params
    })
}