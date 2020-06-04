import request from '@/utils/request'

export function queryAll(params) {
    return request({
        url: '/workLog/queryAll',
        method: 'post',
        data: params
    })
}