module.exports = {
    devServer: {
        open: true,
        host: "localhost",
        port: "8090",
      // 代理
        proxy: {
            "/api":{
                target: "http://cn.bing.com",
                changeOrigin: true,
                ws:true,
                pathRewrite: {
                    "^/api": ''
                }
            }


        }
    }
}