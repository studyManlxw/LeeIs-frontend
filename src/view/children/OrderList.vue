<template>
    <div>
        <van-nav-bar
                title="订单列表"
                left-text="返回"
                left-arrow
                safe-area-inset-top
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <van-list
                finished-text="没有更多了"
        >
            <!--            todo:后续增加订单的店员归属信息-->
            <van-cell v-for="item in orderList" :key="item.id">
                <label style="display: flex;justify-content: space-between">
                    {{`下单时间：` + `${getTime(item.createTime)}`}}
                    <br>
                    {{'订单类型：' + `${item.type}`}}
                    <br>
                    {{'订单时常：' + `${item.time}` }}
                    <br>
                    {{'订单共计：' + `${item.totalMoney}` }}
                    <br>
                    {{`接单人：` + `zhangs`}}
                    <br>
                    <span >{{'x'+ `${item.count}`}}</span>
                </label>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import {Toast} from 'vant';
import request from "@/utils/request";

export default {
    name: "OrderList",
    data() {
        return {
            orderList: [],
            loading: true,
            finished: false,
        };
    },
    created() {
        console.log(this.$route.query.statusNum)
        request.get("/order/queryByStatus/" + this.$route.query.statusNum).then((res) => {
            if (res.data.code == 200) {
                this.orderList = res.data.data
                if (this.orderList == null){
                    Toast("暂时没有数据噢~")
                }
                console.log(this.orderList)
            } else {
                Toast("出现了一些问提~")
            }
        })
    },
    computed: {},
    filters: {},
    methods: {
        getTime(time) {
            let dt = new Date(time)
            let year = dt.getFullYear();
            let month = dt.getMonth() + 1;
            let date = dt.getDate();
            let hour = dt.getHours();
            let minute = dt.getMinutes();
            let second = dt.getSeconds();
            return `${year}-${month}-${date} ${hour}:${minute}:${second}`;

        },
        onClickLeft() {
            Toast('返回');
            this.$router.back()
        },
        onClickRight() {
            Toast('按钮');
        },
        onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            /*         setTimeout(() => {
                         for (let i = 0; i < 10; i++) {
                             this.list.push(this.list.length + 1);
                         }

                         // 加载状态结束
                         this.loading = false;

                         // 数据全部加载完成
                         if (this.list.length >= 40) {
                             this.finished = true;
                         }
                     }, 1000);*/
        },
    },
}
</script>

<style scoped>

</style>