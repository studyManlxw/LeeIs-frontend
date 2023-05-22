//引入axios
import axios from "axios"
import  backend_url  from "./const";
//创建axios实例
const request = axios.create({
  baseURL: backend_url,//公共地址
  timeout: 10000,//请求超时时间
//   headers: {'X-Custom-Header': 'foobar'}//请求头，可以不写
});
//导出axios实例
export default request
