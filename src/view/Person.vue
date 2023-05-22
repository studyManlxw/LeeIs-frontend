<template>
    <div>
        <div class="person-up">
            <van-card class="CVcardme" style="padding-right:0px; background-color: #A7727D">
                <div slot="thumb" style="padding-top: 10px">
                    <van-image round="" width="76px" height="76px" :src="`${userInfo.headUrl}`"/>
                </div>
                <div slot="desc" style="margin-top:30px;padding-right:0px;">
                    <van-row>
                        <van-col span="18">
                            <label style="color:#F7F7F7;font-size:22px;">{{ userInfo.name }}</label>
                        </van-col>
                    </van-row>
                    <van-row style="padding-right:0px;margin-right:0px;">
                        <van-col span="18">
                            <label style="color:#F7F7F7;font-size:15px;">添加描述</label>
                        </van-col>
                    </van-row>
                </div>
            </van-card>
            <van-divider/>
            <van-row style="width:100%">
                <div class="Mywallet" style="background-color: #A7727D">
                    <div style="width:100%;height:20px">
                        <label style="float:left;margin-left:10px;color:#fff;margin-top:7px;font-size:10px">我的钱包</label>
                        <label style="float:right;margin-right:10px;color:white;margin-top:7px;font-size:10px">明细
                            ></label>
                    </div>
                    <div style="width:100%;height:35pt;">
                        <div style="display:block;margin:0 auto;width:150pt;color:#fff;font-size:20pt;padding-top:10pt;">
                            <label style="display:block;margin:0 auto;text-align:center;width:100pt;">{{ userInfo.balance }}.00</label>
                        </div>
                    </div>
                    <div style="width:100%;height:20pt;">
                        <div style="display:block;margin:0 auto;width:150pt;color:white;font-size:10pt;padding-top:1pt;">
                            <label style="display:block;margin:0 auto;text-align:center;width:100pt;">余额（消费币）</label>
                        </div>
                    </div>
                </div>
            </van-row>
        </div>
        <van-divider/>
        <div>
            <van-row class="myownrow" style="background-color:white;">
                <van-grid :border="false" :column-num="4" style="background-color:white;">
                    <van-grid-item icon="description" text="全部订单" :to="{name:'orderList',query:{statusNum:0}}"/>
                    <van-grid-item icon="orders-o" text="待完成" :to="{name:'orderList',query:{statusNum:1}}"/>
                    <van-grid-item icon="records" text="进行中" :to="{name:'orderList',query:{statusNum:2}}"/>
                    <van-grid-item icon="completed" text="已完成" :to="{name:'orderList',query:{statusNum:3}}"/>
                </van-grid>
            </van-row>
        </div>
        <van-cell title="打赏店员" to="/person/order/" icon="balance-pay"/>
        <van-cell title="成为店员" icon="contact"/>
        <van-cell title="收藏店员" icon="friends-o"/>
        <van-cell title="关于我们" icon="smile-o"/>
        <van-divider style="color: #A7727D;position: fixed;bottom: 70px;left: 80px">Support by Maverick Libeij
        </van-divider>
        <tab-bar/>
        <router-view></router-view>
    </div>
</template>

<script>
import tabBar from "@/components/TabBar.vue";
import request from "@/utils/request";
import {Toast} from "vant";

export default {
    components: {
        tabBar
    },
    data() {
        return {
            userInfo: {}
        }
    },
    name: "Person",
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            if (this.getCookie("openId") != null) {
                request.get("/leeIs/user/userInfo/" + this.getCookie("openId")).then((res) => {
                    if (res.data.code == 200) {
                        this.userInfo = res.data.data
                    } else {
                        Toast("获取用户信息失败~")
                    }
                })
            }
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }
            return "";
        },

    }
}
</script>

<style scoped>
.Mywallet {
    position: relative;
    margin: auto;
    width: 80%;
    background-color: #ffffff80;
    height: 80pt;
    border-radius: 10px;

}

</style>