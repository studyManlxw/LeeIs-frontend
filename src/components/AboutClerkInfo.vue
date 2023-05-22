<template>
    <div>
        <aboutSwiper :clerkInfo="clerkInfo"/>
        <div>
            <div class="info">
                <div class="info-left">
                    <img v-if="clerkInfo.avatar" :src="`${url}/res${clerkInfo.avatar}`"/>
                    <div id="audio-body" v-if="clerkInfo.voice">
                        <audio-player
                                id="audio-player"
                                text="轻点播放"
                                :src="`${url}${clerkInfo.voice}`"
                        />
                    </div>
                </div>
                <div class="info-right">
                    <div class="info-up">
                        <div>
                            <div class="info-name">{{ clerkInfo.name }}</div>
                        </div>
                        <div class="info_desc">
                            <i
                                    class="iconfont icon-circle"
                                    v-if="clerkInfo.status"
                                    style="color: #6cbf49; font-size: 15px; margin-left: 7px"
                            >
                                &nbsp;在线</i
                            >
                            <i
                                    class="iconfont icon-circle"
                                    v-else
                                    style="color: red; font-size: 15px; margin-left: 7px"
                            >&nbsp; 不在线</i
                            >
                        </div>
                        <div class="info-level">
                            <!-- <van-icon name="fire-o" color="#ee0a24" /><span
                              class="info-level-msg"
                              style="color: #f66d66"
                              ></span
                            > -->
                            <span :class="'iconfont ' + iconList[clerkInfo.level]"></span>
                        </div>
                    </div>
                    <div class="info-mid">
                        <span :class="'iconfont ' + iconGender[clerkInfo.sex]"
                              style="color: #000000; font-size: 20px; margin-left: 7px">&nbsp;{{
                            clerkInfo.sex ? "男" : "女"
                            }}</span>
                        <span
                        ><i
                                class="iconfont icon-weizhi"
                                style="color: #0f2ea9; font-size: 22px; margin-left: 7px"
                        ></i
                        >{{ clerkInfo.position }}</span
                        >
                    </div>
                    <div class="info-content">
                        <van-tag
                                class="content"
                                plain
                                type="default"
                                v-for="item in clerkInfo.labelList"
                                :key="item"
                        >
                            {{ item }}
                        </van-tag>
                    </div>
                    <div class="info-motto van-multi-ellipsis--l2">
                        {{ clerkInfo.motto }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import request from "../utils/request";
import backend_url from "../utils/const";
import aboutSwiper from "../components/AboutSwiper.vue";
import popupSku from "@/components/PopupSku.vue";

export default {
    name: "AboutClerkInfo",
    component: {
        aboutSwiper,
        popupSku
    },
    data() {
        return {
            url: backend_url,
            clerkInfo: {}, //店员相信信息列表
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
            iconGender: {
                0: "icon-xingbie",
                1: "icon-morenwuxingbie"
            }
        };
    },
    created() {
    },
    mounted() {
        this.reqClerkMsg(); //请求店员信息

    },
    methods: {
        reqClerkMsg() {
            var id = this.$route.query.id;
            // console.log("接收到传递id:" + id);
            request.get("/sysClerk/find/" + id).then((res) => {
                this.clerkInfo = res.data.data;
                // console.log(this.clerkInfo);
                this.sendDataToGoodsAction(res.data.data)
            });
        },
        sendDataToGoodsAction(data){
            this.$bus.$emit('clerkInfo',data)
        }
    },
};
</script>
<style lang="less" scoped>
.info {
  background-color: #F9F5E7;
  width: 100%;
  height: 305px;
  border-radius: 5%/15%;
  color: #A7727D;;
  display: flex;

  .info-left {
    flex: 0.7;

    #audio-body {
      display: flex;
      width: 100%;
      margin-left: 7px;
      padding-bottom: 20px;

      .x-audio {
        display: inline-flex;
        width: 90%;
        margin-left: 7px;

        .x-audio-wrap {
          .x-sector {
            display: inline;
            width: 25%;
          }
        }

        .x-time {
          margin-right: 105px;
          margin: 0;
          text-align: left;
        }
      }
    }
  }

  .info-left img {
    width: 240px;
    margin: 15px;
    margin-bottom: 0;
    border-radius: 10%;
  }

  .info-right {
    flex: 1.3;
    font-size: 48px;

    .info-up {
      padding-top: 32px;
      padding-left: 12px;
      display: flex;

      .info-name {
        flex: 1;
        width: 80px;
        text-align: center;
        justify-content: space-between;
        // padding-top: 15px;
      }

      .info_desc {
        flex: 1;
        font-size: 32px;
        text-align: right;
        margin-left: 20px;
        margin: auto;
      }

      .info-level {
        flex: 1;
        max-height: 44px;
        font-size: 44px;
        justify-content: center;

        .iconfont .icon-3 {
          padding-top: 20px;
        }

        span {
          width: 100%;
          line-height: 0.7rem;
          // position: relative;
          // bottom: 50px;
          // top: -7px;
          font-size: 1.3rem;
          display: inline-flex;
          justify-content: flex-end;
        }
      }
    }

    .info-mid {
      font-size: 28px;
      display: flex;
      justify-content: space-between;
      // padding-left: 15px;
      // padding-top: 15px;
      padding: 15px 15px 0px 15px;
    }

    .info-content {
      padding-left: 10px;
      font-size: 64px;

      .content {
        height: 100%;
        margin-right: 6px;
        color: #0f2ea9;

      }
    }

    .info-motto {
      padding-left: 12px;
      font-size: 18px;
      margin-top: 18px;
    }
  }
}
</style>
