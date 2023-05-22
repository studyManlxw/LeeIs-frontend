<template>
    <van-dropdown-menu>
        <van-dropdown-item v-model="valueSex" :options="option1" @change="changeByValue(valueSex)"/>
        <van-dropdown-item v-model="valueSort" :options="option2" @change="changeByValue(valueSort)"/>
    </van-dropdown-menu>
</template>

<script>
import request from '@/utils/request';

export default {
    name: 'DropdownMenu',
    props: ['clerkInfoList'],
    data() {
        return {
            valueSex: 2,
            valueSort: 5,
            infoByValueList: [],
            option1: [
                {text: "全部店员", value: 2},
                {text: "只看男生", value: 1},
                {text: "只看女生", value: 0},
            ],
            option2: [
                {text: "默认排序", value: 5},
                {text: "按等级排序", value: 4},
                {text: "按受欢迎程度", value: 3},
            ],
        };
    },
    methods: {
        changeByValue(valueSort) {
            this.getByValue(valueSort)
        },
        changeByValue(valueSex) {
            this.getByValue(valueSex)
        },
        getByValue(value) {
            console.log(value)
            request.get("/sysClerk/getByValue/" + value).then((res) => {
                this.infoByValueList = res.data.data
                console.log(this.infoByValueList)
            })
        }
    }
};
</script>
<!--<style lang="less">-->
<!--.van-dropdown-menu {-->
<!--    color: #F9F5E7;-->
<!--  .van-dropdown-menu__bar {-->
<!--    .van-dropdown-menu__item {-->
<!--      background-color: #F9F5E7;-->

<!--      .van-dropdown-menu__title&#45;&#45;active {-->
<!--        color: #A7727D;-->

<!--        .van-cell__title span {-->
<!--          color: #A7727D;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</style>-->
  