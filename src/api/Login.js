import request from '@/utils/request'
import axios from 'axios'

export function getBingPic() {
    return axios({
        method:'GET',
        url:'/api/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN',
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    })
}

export function getToken(params) {
    return request({
        url: 'http://localhost:8088/oauth/token',
        method: 'post',
        params: params
    })
}