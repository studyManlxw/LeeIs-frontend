<template>
    <div>
        <van-popup v-model="show" closeable round position="bottom" :style="{ height: '90%' }">
            <div class="box">
                <van-divider dashed style="color: #F9F5E7">订单信息如下：</van-divider>
                <van-cell size="large" title="店员信息" :label="'名称：' + `${clerkInfo.name}`"/>
                <!--                        选择性别-->
                <van-cell title="店员类型" size="large"
                          :label="'店员性别：' + `${clerkInfo.sex == 0 ? '女':'男'}`"
                />
                <van-cell title="店员类型" size="large"
                          :label="'店员年龄：' + `${clerkInfo.age}`"
                />
                <!--        订单类型-->
                <template>
                    <van-cell title="订单类型" size="large"
                              :label="'订单类型：' + `${finalData.type == null ?'待选择': `${finalData.type}`} `"
                              @click="checkOrder"/>
                    <template>
                        <van-picker class="oderPicker" show-toolbar ref="columns" title="标题" :columns="columns"
                                    v-show="activeOrder"
                                    @confirm="onConfirm" @cancel="onCancel"/>
                    </template>
                    <van-cell title="订单时长" size="large"
                              :label="'订单时长：' + `${finalData.time== null ?'待选择': `${finalData.time}`}`"
                    />
                    <van-cell title="订单金额" size="large"
                              :label="'订单金额：' + `${finalData.price== null ?'待选择': `${finalData.price}`}`"
                    />
                    <van-cell-group>
                        <van-field v-model="wxNumber" label="微信号" placeholder="请输入微信号"
                                   @input="getWXMessage(wxNumber)" required/>
                    </van-cell-group>
                    <van-field
                            v-model="message"
                            @input="getRemarkMessage(message)"
                            rows="1"
                            autosize
                            label="备注"
                            type="textarea"
                            placeholder="请输入订单备注"
                    />
                </template>

                <template>

                    <div class="orderCount" style="font-size: 16px; display: flex;
        justify-content: space-between;background-color: #fff;color: #A7727D;padding-left: 15px;line-height: 30px">
                        订单数量：
                        <van-stepper style="" min="1" max="10" step="1" @change="getOrderCount(orderCount)"
                                     v-model="orderCount"
                                     theme="round"
                                     button-size="22" disable-input/>
                    </div>
                    <van-cell title="总金额:" :value="finalData.price ==null ? '0':finalData.price * orderCount "/>
                    <!--             todo：从后端查询该用户余额-->
                    <van-cell title="余额:" :value="balanceData"/>
                </template>
                <van-divider style="color: #A7727D;font-size: 13px">Support by
                    MaverickLibeij
                </van-divider>
                <van-submit-bar style="bottom: 0px;z-index: 0;" :price="totalMoney * orderCount *100"
                                :disabled="totalMoney >= 5? false:true"
                                button-text="提交订单" @submit="onSubmit"/>
            </div>
        </van-popup>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服"/>
            <van-goods-action-button class="button left" type="warning" text="打赏" @click="reward"/>
            <van-goods-action-button class="button right" type="danger" text="下单" @click="order"/>
        </van-goods-action>
    </div>
</template>

<script>
import {Toast} from "vant";
import popupSku from "@/components/PopupSku.vue";
import request from "@/utils/request";
import aboutClerkInfo from "@/components/AboutClerkInfo.vue";

export default {
    name: "GoodsAction",
    computed: {
        aboutClerkInfo() {
            return aboutClerkInfo
        }
    },
    components: {
        popupSku,

    },
    data() {
        return {
            show: false,
            columnsMap: {},
            radio: '',
            columns: [],
            orderCount: true,
            disabled: true,//提交订单禁用
            count: '',//订单数量
            totalMoney: 0,
            wxNumber: null,//微信号输入框model
            message: '', //留言
            activeOrder: false, //控制订单picker是否显示
            finalData: {},
            balanceData: 0,
            clerkInfo:{}
        }
    },
    created() {

    },
    mounted() {
        this.$bus.$on('clerkInfo', (data) => {
            console.log(data, '传递的数据')
            this.clerkInfo = data
        })
    },
    // 用完别忘了销毁
    beforeDestroy() {
        this.$bus.$off('clerkInfo')
    },
    methods: {
        //todo:点击下单
        order() {
            Toast("下单功能待完善")
            this.show = true
            this.reqTableDta()
        },
        //todo:打赏功能
        reward() {
            Toast("打赏待完善")
        },
        //todo:订单提交至后端
        onSubmit() {
            if (this.finalData.wxNumber.length != 0) {
                if (this.orderCount == true){
                    this.getOrderCount(1)
                }
                Object.assign(this.finalData, {
                    'name': this.clerkInfo.name, 'orderSex': this.clerkInfo.sex
                })
                request.post("/order/assignOrder/", this.finalData).then((res) => {
                    if (res.data.code === 200) {
                        Toast("订单创建成功，请稍后")
                        this.$router.push('/success') //跳转至下单成功页面
                    } else {
                        Toast("订单创建出现了一些问题...")
                    }
                })
            } else {
                Toast("请不要忘记输入你的微信噢~")
            }
        },
        //获取订单数量
        getOrderCount(count) {
            // console.log(count)
            Object.assign(this.finalData, {
                'count': count,
                'totalMoney': count * this.finalData.price
            })
        },
        //获取微信号
        getWXMessage(wxNumber) {

            Object.assign(this.finalData, {
                'wxNumber': wxNumber
            })
            // console.log(this.finalData)
        },
        //获取备注
        getRemarkMessage(value) {
            if (value === '') {
                Object.assign(this.finalData, {
                    'remark': ''
                })
            }
            Object.assign(this.finalData, {
                'remark': value
            })
            // console.log(this.finalData)
        },
        reqTableDta() {
            request.get("/sysPriceTable/getTableInfo").then((res) => {
                this.columnsMap = res.data.data;
            });
        },
        checkOrder() {
            this.columns = this.dataToColumns(this.columnsMap)
            this.activeOrder = true
        },
        dataToColumns(data) {
            // data = this.columnsMap
            const res = [];
            for (let category in data) {
                let children = [];
                for (let time in data[category]) {
                    children.push({
                        text: time,
                        children: [{
                            text: data[category][time]
                        }]
                    })
                }

                res.push({
                    text: category,
                    children: children
                })
            }

            return res;
        },
        onConfirm() {
            const values = this.$refs['columns'].getValues();
            const result = {'type': values[0].text, 'time': values[1].text, 'price': values[2].text};
            Object.assign(this.finalData, {
                'type': values[0].text, 'time': values[1].text, 'price': values[2].text
            })
            // console.log(result)
            // this.finalData = result
            // console.log(this.finalData)
            this.totalMoney = result.price
            this.activeOrder = false
        },
        onCancel() {
            Toast('取消');
            this.activeOrder = false
        },
    }
}
</script>

<style scoped>
.button {
    color: #69737f;
    border: 1px solid #69737f;

}

.left {
    border-right: none;
}

.right {
    border-left: none;
}

</style>