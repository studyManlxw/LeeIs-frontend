<template>
    <van-tabbar route active-color="#EDDBC7">
        <van-tabbar-item to="/home">
            <span>主页</span>
            <template #icon="props">
                <i class="iconfont icon-qunfengdianpumingcheng"
                ></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/box">
            <span>盲盒</span>
            <template #icon="props">
                <i class="iconfont icon-manghe"
                ></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/person">
            <span>个人中心</span>
            <template #icon="props">
                <i class="iconfont icon-gerenzhongxin"
                ></i>
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    name: "TabBar",
    data() {
        return {
            icon: 'icon-circle'
        }
    }
}
</script>

<style scoped>

</style>