import request from '@/utils/request'

export function getBingPic() {
    return request({
        url: 'https://v1.alapi.cn/api/bing?format=json',
        method: 'get',
    })
}

export function getToken(params) {
    return request({
        url: 'http://localhost:8088/oauth/token',
        method: 'post',
        params: params
    })
}