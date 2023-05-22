<template>
  <div class="app">
    <div class="item" v-for="item in clerkInfoList" :key="item.id">
      <div class="item-body" @click="jump(item.id)">
        <img class="item-img" :src="`${url}/res${item.avatar}`" />
        <div class="item-info">
          <div class="item-info-top">
            <span class="item-name"> {{ item.name }}</span>
            <i
              class="iconfont icon-circle"
              v-if="item.status"
              style="color: #6cbf49; font-size: 15px; margin-left: 7px"
            ></i>
            <i
              class="iconfont icon-circle"
              v-else
              style="color: red; font-size: 15px; margin-left: 7px"
            ></i>
          </div>
          <div class="item-info-mid">
            <div class="item-level">
              <span
                :class="'iconfont ' + iconList[item.level]"
                style="font-size: 38px"
                >{{
              }}</span>
            </div>
            <div class="item-position">
              <span>{{ item.position }}</span>
            </div>
          </div>
          <div class="item-label">
            <van-tag
              class="content"
              plain
              type="default"
              v-for="label in item.labelList"
              :key="label.id"
            >
              {{ label }}
            </van-tag>
          </div>
          <!-- <div class="item-text">
            <span>{{ item.motto }}</span>
          </div> -->
          <div class="audio-body" @click.stop.self="jump()">
            <audio-player
              class="audio-player"
              text="轻点播放"
              :src="`${url}${item.voice}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import backend_url from "../utils/const";

export default {
  name: "HomeBody",
  components: {},
  props: ["clerkInfoList"],
  data() {
    return {
      // clerkInfoList: [],
      url: backend_url,
      iconList: {
        1: "icon-1",
        2: "icon-2",
        3: "icon-3",
        4: "icon-4",
        5: "icon-5",
        6: "icon-6",
        7: "icon-7",
        8: "icon-lv",
      },
      iconString: "",
    };
  },
  created() {
    // this.getClerkInfo();
  },
  computed: {},
  methods: {
    // getClerkInfo() {
    //   //请求后端店员数据
    //   request.get("/sysClerk/show").then((res) => {
    //     this.clerkInfoList = res.data.data;
    //     console.log(this.clerkInfoList);
    //   });
    // },
    //根据id进行跳转
    jump(id) {
      this.$router.push({ name: "about", query: { id: id } });
    },
  },
};
</script>

<style lang="less">
.app {
  -moz-column-count: 2;
  /* Firefox */
  -webkit-column-count: 2;
  /* Safari 和 Chrome */
  column-count: 2;
  -moz-column-gap: 1em;
  -webkit-column-gap: 1em;
  column-gap: 0.2em;
  width: 96%;
  min-height: 500px;
  margin: 6px auto;
  font-size: 30px;
  font-weight: 550;
  .item {
    display: inline-block;
    padding: 7px;
    border-radius: 5%;
    // margin-right: 8px;
    margin: 8px auto;
    margin-top: 12px;
    background-color: #F9F5E7;
    color: #A7727D;
    .item-body {
      width: 100%;

      .item-img {
        width: 100%;
        border-radius: 5%;
      }
      .item-info {
        .item-info-top {
          margin-top: 10px;
          width: 100%;
          .item-name {
            // display: inline-flex;
            float: left;
            margin-left: 6px;
          }
          .item-status {
          padding-left: 35px;
        }

        }
        .item-info-mid {
          // display: inline;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .item-level {
            font-size: 28px;
          }
          .item-position {
            // display: inline-flex;
            font-size: 28px;
            text-align: justify;
            padding-top: 21px;
          }
        }

        // margin-left: 9px;
        font-size: 40px;
        .item-label {
          padding: 0;
          font-size: 24px;
          .content {
            text-align: center;
            font-size: 27px;
            margin-left: 4px;
            border-radius: 10px;
          }
        }
        .item-text {
          padding-top: 14px;
          font-size: 24px;
          margin-left: 6px;
        }
        .audio-body {
          width: 100%;
          .x-audio{
            .x-audio-wrap {
              background-color: #A7727D;
              .x-time{
                font-size: 22px;
              }
            }
          }

        }
      }
    }
  }
}
</style>

