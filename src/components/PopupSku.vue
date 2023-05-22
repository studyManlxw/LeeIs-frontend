<template>
    <div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">

        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'popupSku',
    data() {
        return {
            show: true,
        }
    }
}
</script>

<style scoped>

</style>