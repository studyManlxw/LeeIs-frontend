<template>
  <van-search
    shape="round"
    background="#A7727D"
    placeholder="请输入搜索店员名称"
    @blur="search($event.target.value)"
    v-model="result"
  />
</template>

<script>
import request from "../utils/request";
import { Dialog } from "vant";

export default {
  name: "HomeSearch",
  props: ["clerkInfoList"],
  data() {
    return {
      result: "",
      clerkInfo: [],
    };
  },
  computed: {},
  methods: {
    search(value) {
      if (value == "") {
        Dialog.alert({
          title: "宝贝",
          message: "要输入店员名字才能查询哦",
        }).then(() => {
          // on close
        });
        this.result = "";
      }
      let id = this.checkId(value)
      console.log(id)
      if(this.clerkInfoList.find(clerk => clerk.name == value)){
        this.$router.push({
              name: "about",
              query: { id: id }, //传递店员名称
            });
      }else{
        Dialog.alert({
              title: "宝贝",
              message: "暂时还没有叫这个名字的店员哦",
            });
      }
    
    },
    //查询员工name查询id
    checkId(name){
      for(let i in this.clerkInfoList){
        if (this.clerkInfoList[i].name == name){
          return this.clerkInfoList[i].id
        }
      }
    },
  },
};
</script>
