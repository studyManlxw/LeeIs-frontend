<template>
    <van-tabs @click="onClick">
        <van-tab title="评论">
            <van-cell-group>
                <van-cell title="找到如下评论:"/>
                <!--          todo:评论显示用户头像，评论内容；用户头像接微信公众号后完善-->
                <van-cell title="zhangs" v-for="index in commentList" :key="index.id" :label="index"/>
            </van-cell-group>
        </van-tab>
        <van-tab  title="价格表">
            <priceTable/>
        </van-tab >
        <goodsAction/>
    </van-tabs>
</template>
<script>
import request from "../utils/request";
import {Toast} from "vant";
import priceTable from "@/components/PriceTable";
import goodsAction from "@/components/GoodsAction.vue";

export default {
    name: "AboutBar",
    component: {
        priceTable,
        goodsAction
    },
    data() {
        return {
            commentList: [
                "伟大的人不是生下来就伟大的，而是在成长过程中显示其伟大的",
                "伟大的人不是生下来就伟大的，而是在成长过程中显示其伟大的",
            ],
            tableMap: {},
            tableMapInner: [],
        };
    },
    computed: {},
    created() {
    },
    methods: {
        onClick(name, title) {
            Toast(title);
            if (title == "价格表") {
                request.get("/sysPriceTable/getTableInfo").then((res) => {
                    this.tableMap = res.data.data;
                    console.log(this.tableMap);
                });


            }
        },
        //在价格表的所有数据中获取服务时间和价格数据并对已价格进行排序
        getTimeAndPrice() {
            this.tableMapInner = Object.values(this.tableMap)
            // console.log(this.tableMapInner)

        },
    },
};
</script>
<style lang="less">

</style>
