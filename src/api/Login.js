import request from '@/utils/request'

export function getBingPic() {
    return request({
        url: 'https://v1.alapi.cn/api/bing?format=json',
        method: 'get',
    })
}
