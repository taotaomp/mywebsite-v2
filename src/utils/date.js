export default {
    install(Vue) {
        // 表格格式化日期时间
        Vue.prototype.formatDateTime = function (row, column, cellValue, index) {
            if (!cellValue) {
                return ''
            }
            cellValue = new Date(cellValue)
            var format = 'yyyy-MM-dd HH:mm:ss'
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            }
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(cellValue.getFullYear())
                    case 'MM':
                        return tf(cellValue.getMonth() + 1)
                    case 'mm':
                        return tf(cellValue.getMinutes())
                    case 'dd':
                        return tf(cellValue.getDate())
                    case 'HH':
                        return tf(cellValue.getHours())
                    case 'ss':
                        return tf(cellValue.getSeconds())
                }
            })
        }

        // 表格格式化日期
        Vue.prototype.formatDate = function (row, column, cellValue, index) {
            if (!cellValue) {
                return ''
            }
            cellValue = new Date(cellValue)
            var format = 'yyyy-MM-dd'
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            }
            return format.replace(/yyyy|MM|dd/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(cellValue.getFullYear())
                    case 'MM':
                        return tf(cellValue.getMonth() + 1)
                    case 'dd':
                        return tf(cellValue.getDate())
                }
            })
        }

        Vue.prototype.formatTime = function (row, column, cellValue, index) {
            if (!cellValue) {
                return ''
            }
            cellValue = new Date(cellValue)
            var format = 'HH:mm:ss'
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            }
            return format.replace(/HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'mm':
                        return tf(cellValue.getMinutes())
                    case 'HH':
                        return tf(cellValue.getHours())
                    case 'ss':
                        return tf(cellValue.getSeconds())
                }
            })
        }
    }
}
