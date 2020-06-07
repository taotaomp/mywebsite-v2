import request from '@/utils/request'

export function queryAll(params) {
    return request({
        url: '/workUnit/queryAll',
        method: 'post',
        data: params
    })
}

export function queryAllByPage(params) {
    return request({
        url: '/workUnit/queryAllByPage',
        method: 'post',
        data: params
    })
}

export function insert(params) {
    return request({
        url: '/workUnit/insert',
        method: 'post',
        data: params
    })
}

export function update(params) {
    return request({
        url: '/workUnit/update',
        method: 'post',
        data: params
    })
}

export function deleteById(params) {
    return request({
        url: '/workUnit/delete',
        method: 'post',
        data: params
    })
}