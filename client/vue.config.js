// module.exports = {
//   publicPath: './',
//   productionSourceMap: false,
//   devServer: {
//     proxy: {
//       open: true,//自动开启
//       port: 8080,//设置端口号
//       host: '127.0.0.1',//设置host
//       proxy: {
//         "/api": {
//           target: "http://localhost:5000/api",//这个是你的服务器地址
//           changeOrigin: true,
//           pathRewrite: {//重写地址  比如说 你的接口地址是'http://localhost:5000/api/users/resister'，那么你前端请求的接口就是'/api/users/register'
//             '^/api': ''
//           }
//         }
//       }
//     }
//   }
// }