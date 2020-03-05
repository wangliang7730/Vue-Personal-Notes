1、安装
npm i mockjs --save
2、直接在main.js里面引用,如图:(此处有坑,因为只在开发环境使用.if里面不能用import方式导入,只能用require方式引入)
if (process.env.NODE_ENV !== 'production') require('./mock')
当项目启动后,mock会拦截他规则内的http请求

3、src下新建mock文件夹



//index.js
import Mock from 'mockjs'
import { getUserInfo } from './response/user'
let data = Mock.mock(/\/getUser/, 'get', getUserInfo)

// 设置响应延时
// Mock.setup({
//   timeout: 5000
// })
export default data


//user.js
import Mock from 'mockjs'

const Random = Mock.Random
export const getUserInfo = (options) => {
  let userInfo = []
  for (let i = 0; i < 10; i++) {
    let template = {
      'name': Random.cname(),
      'age': Random.natural(22, 40),
      'date': Random.date('yyyy-MM-dd'),
      'address': Random.county(true)
    }
    userInfo.push(template)
  }
  // let i = 3
  // let arr = []
  // while (i--) {
  //   arr.push(template)
  // }
  // return Mock.mock(userInfo)
  return userInfo
}

mock基本配置完成

4、axios中的数据请求
import axios from './index'

export const getUserInfo = () => {
  return axios.request({
    url: '/getUser',
    method: 'get'
  })
}

5、vue中获取数据

getUserInfo().then(res => {
  // console.log(res.data)
  this.tableData = res.data
})
