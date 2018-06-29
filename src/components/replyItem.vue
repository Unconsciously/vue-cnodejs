<template>
  <div class="reply-item">
      <div class="ri-top">
            <div class="ri-left">
                <div class="ri-avatar">
                    <img v-lazy="replyItem.author.avatar_url" alt="">
                </div>
                <div class="ri-info">
                    <!-- <span class="rii-name">{{replyItem.author.loginname}}</span>   -->
                    <span class="rii-fl">{{idx+1}}楼•n个月前</span>
                </div>
            </div>
            <div class="ri-right">
                <div class="ri-zan" v-if="!isUps" @click="goUpsReply(false)">♈ {{replyItem.ups.length}}</div>
                 <div class="ri-zan active" v-else @click="goUpsReply(true)">♈ {{replyItem.ups.length+1}}</div>
                <div class="ri-zan" @click="goOpenReply">☀ 回复</div>
                <div class="ri-zan" v-if="replyItem.id = replyItem.reply_id" @click="goDelReply">☈ 删除</div>
            </div>
      </div>
      <div class="ri-content" v-html="replyItem.content"></div>

    <div class="reply-main" v-if="isShowReply">
        <mavon-editor v-model="value"/>
        <div class="reply-btn" @click="goReplyInfo">回复</div>
        <div class="reply-btn cancle-btn" @click="goCloseReply">取消</div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["replyItem", "idx"],
  data() {
    return {
      isShowReply: false,
      isUps: false,
      value: ""
    };
  },
  mounted() {
    // this.value = `[@${this.replyItem.author.loginname}](/user/${
    //   this.replyItem.author.loginname
    // })`;
  },
  methods: {
    goUpsReply(flag) {
      if (window.sessionStorage.user) {
        let token = "";
        this.$store.dispatch(
          "setUserInfo",
          JSON.parse(window.sessionStorage.user)
        );
        token = JSON.parse(window.sessionStorage.user).token;
        console.log(this.replyItem.id);
        this.$api
          .post(`/api/v1/reply/${this.replyItem.id}/ups`, {
            accesstoken: token
          })
          .then(res => {
            if (res.status == 200) {
              this.isUps = true;
              console.log(res.data);
              if (res.data.action == "down") {
                this.isUps = false;
              } else {
                this.isUps = true;
              }
            }
          })
          .catch(error => {
            console.log(error.response.data.error_msg);
          });
      } else {
        this.$router.push({
          name: "login"
        });
      }
    },
    goOpenReply() {
      this.isShowReply = true;
    },
    goCloseReply() {
      this.isShowReply = false;
    },
    goReplyInfo(id) {
      this.$emit("reply", this.replyItem.id, this.value);
      this.isShowReply = false;
    },
    goDelReply() {
      console.log("暂无对应接口~~~");
    }
  }
};
</script>

<style lang="scss" scoped>
.reply-item {
  padding: 20px 15px;

  border-bottom: 1px solid #ccc;
  .ri-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ri-left {
      width: 70%;
      display: flex;
      align-items: center;
      .ri-avatar {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          border-radius: 6px;
        }
      }
      .ri-info {
        padding: 0 15px;
        .rii-name {
          font-weight: 700;
        }
        .rii-fl {
          color: rgb(55, 55, 201);
        }
      }
    }
    .ri-right {
      display: flex;
      max-width: 30%;
      justify-content: space-between;
      align-items: center;
      .active {
        color: #0b7526;
      }
    }
  }
  .ri-content {
    padding-top: 15px;
  }
  .reply-main {
    margin: 15px 0 55px;
    .reply-btn {
      width: 80px;
      height: 45px;
      background-color: #0b7526;
      color: #fff;
      text-align: center;
      float: right;
      margin: 15px;
      line-height: 45px;
    }
    .cancle-btn {
      background-color: #fff;
      color: #333;
      border: 1px solid #cdcdcd;
    }
  }
}
</style>

