module.exports = {
    devServer: {
        open: true,
        host: "localhost",
        port: "8090",
      // 代理
        proxy: {
            "/swlg": {
                target: "http://localhost:8080",
                changeOrigin: true,
                ws:true,
                pathRewrite: {
                    "^/swlg": ""
                }
            }


        }
    }
}