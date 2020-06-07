import request from '@/utils/request'

export function uploadWorkLog(params) {
    return request({
        url: '/workLog/uploadWorkLog',
        method: 'post',
        data: params
    })
}

export function getAllWorkType(params) {
    return request({
        url: '/workType/queryAll',
        method: 'post',
        data: params
    })
}

export function getAllWorkUnit(params) {
    return request({
        url: '/workUnit/queryAll',
        method: 'post',
        data: params
    })
}