<template>
    <div class="box">
        <van-divider dashed style="color: #F9F5E7">开始定制你的盲盒</van-divider>
        <van-cell title="注意：点击店员类型开始按顺序依次选择" size="large"/>

        <!--        选择性别-->
        <van-cell title="店员类型" size="large"
                  :label="'所需类型：' + ` ${sex == ''? '待选择': radio == 0 ? '女':'男' }`"
                  @click="showSex =true"/>
        <template>
            <van-radio-group style="background: #F9F5E7" direction="horizontal" icon-size="22px" v-model="radio"
                             @change="radioSex(radio)"
                             v-show="showSex">
                <van-radio name=1>男生</van-radio>
                <van-radio name=0>女生</van-radio>
            </van-radio-group>
        </template>
        <!--        订单类型-->
        <template>
            <van-cell title="订单类型" size="large"
                      :label="'订单类型：' + `${finalData.type == null ?'待选择': `${finalData.type}`} `"
                      @click="activeOrder=true "/>

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
                <van-stepper style="" min="1" max="10" step="1" @change="getOrderCount(orderCount)" v-model="orderCount"
                             theme="round"
                             button-size="22" disable-input/>
            </div>
            <van-cell title="总金额:" :value="finalData.price ==null ? '0':finalData.price * orderCount "/>
            <!--            todo：从后端查询该用户余额-->
            <van-cell title="余额:" :value="balanceData"/>
        </template>
        <van-divider style="color: #A7727D;font-size: 13px">Support by
            MaverickLibeij
        </van-divider>
        <van-submit-bar style="bottom: 50px;z-index: 0;" :price="totalMoney * orderCount *100"
                        :disabled="totalMoney >= 5? false:true"
                        button-text="提交订单" @submit="onSubmit"/>
        <div style="padding-bottom: 50%;"></div>
        <tab-bar/>
    </div>
</template>
<script>
import {Toast} from 'vant';
import request from "../utils/request";
import TabBar from "@/components/TabBar.vue";
import tabBar from "@/components/TabBar.vue";
import bus from "@/utils/bus";


export default {
    name: 'Box',
    components: {TabBar},
    component: {
        tabBar
    },
    data() {
        return {
            sex: false,
            radio: '',
            columns: [],
            columnsMap: {},
            orderCount: true,
            disabled: true,//提交订单禁用
            count: '',//订单数量
            totalMoney: 0,
            wxNumber: null,//微信号输入框model
            message: '', //留言
            showSex: false, //控制性别框是否显示
            activeOrder: false, //控制订单picker是否显示
            finalData: {},
            balanceData: 0,
        };
    },
    created() {
        this.reqTableDta();
        this.checkOder();
    },
    mounted() {
    },
    beforeDestroy() {
        // bus.$off("balance")
    },
    methods: {
        //todo:订单提交至后端
        onSubmit() {
            if (this.finalData.wxNumber.length != 0) {
                request.post("/order/randomOrder/", this.finalData).then((res) => {
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
            // console.log(this.finalData)
            // if (this.finalData.price * count >= 5) {
            //     this.disabled = false
            // }
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
            console.log(this.finalData)
        },
        radioSex(sex) {
            console.log(sex)
            this.$set(this.finalData, "orderSex", sex)
            this.sex = '1'
            this.showSex = false
            this.checkOder()
        },
        reqTableDta() {
            request.get("/sysPriceTable/getTableInfo").then((res) => {
                this.columnsMap = res.data.data;
            });
        },
        checkOder() {
            this.columns = this.dataToColumns(this.columnsMap)
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
            console.log(this.finalData)
            this.totalMoney = result.price
            this.activeOrder = false
        },
        onCancel() {
            Toast('取消');
            this.activeOrder = false
        },
    }
    ,
}
;
</script>
<style>
.box {
    padding-top: 35px;
    color: #fff;
    background: linear-gradient(#A7727D, #F8EAD8);
    /*    .orderCount {
            padding-left: 30px;
            font-size: 12px;
            color: #A7727D;

            align-items: center;
            background: #fff;
        }*/
}

.van-submit-bar {

}

.van-radio-group--horizontal {
    margin-left: 30px;
}

.van-radio__label {
    font-size: 28px;

}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}


.oderPicker {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInLeft;
}

</style>