<template>
    <van-notice-bar left-icon="volume-o" :scrollable="true">
        <van-swipe
                vertical

                class="notice-swipe"
                :autoplay="10000"
                :show-indicators="false"
        >
            <van-swipe-item>伟大的人不是生下来就伟大的，而是在成长过程中显示其伟大的</van-swipe-item>
            <van-swipe-item>"心若有阳光，你便会看见这个世界有那么多美好值得期待和向往"</van-swipe-item>
            <van-swipe-item>"为梦想选择了远方，便没有回头路可以走。所以，要么战死沙场，要么狼狈回乡。"</van-swipe-item>
        </van-swipe>
    </van-notice-bar>
</template>

<script>
export default {
    name: "NoticeBar"
}
</script>

<style scoped>

.notice-swipe {
    height: 40px;
    line-height: 40px;
}

</style>