module.exports = {
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            title: '后台管理系统',
        },
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://mharry.eastasia.cloudapp.azure.com:6001/',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            }
        }
    }

}