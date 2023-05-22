<template>
    <router-view to="/home"></router-view>
</template>

<script>
import request from "@/utils/request";

export default {
    name: 'App',
    components: {},
    data() {
        return{
            openId: '',

        }
    },
    created() {
        // this.getWxAuthorize()
        // this.getCode();
    },
    mounted() {
    },
    methods: {
        //微信授权，获取code发送至后端
        getWxAuthorize() {
            let wx_openId = this.getUrlParam()
            // let wx_openId = this.getOpenIdCookie()
            // window.alert(wx_openId)
            if (wx_openId == null){
                //后端接口域名
                let url = window.location.href.replace('#', 'libeij')
                // window.location.href = 'http://a7zpyt.natappfree.cc/wechat/authorize?returnUrl=' + url;
                window.location.href = 'http://localhost:8081/wechat/authorize?returnUrl=' + url;
            } else {
                //授权成功之后返回openId并且将openId设置到cookie中
                document.cookie = `openId=${wx_openId}`
                // this.getOpenId(wx_openId)
            }
        },

        //getUrlParam方法就是使用正则截取地址栏里的code
        getUrlParam(){
            //http://maverick.free.idcfengye.com/#/home?openId=oAZlF6gYtugJA1pPpgp0pw57cOko
            // let params = new URL(window.location.href).searchParams;
            // let openId = params.get("openId")==null?null:params.get("openId");
            const regExp = new RegExp("openId=(.*)");
            return regExp.exec(window.location.href)!=null?regExp.exec(window.location.href)[0].split('=')[1]:null
        },
  /*      getOpenIdCookie(){
            return  document.cookie.getCookie('penId')
        },*/
        getOpenId(openId) {
            // window.alert(openId)
            //这里调用后端给的接口吧openid传过去就好了
            request.get("/wechat/getOpenId/" + openId).then((res) => {
                // window.alert("成功")
            })

        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
