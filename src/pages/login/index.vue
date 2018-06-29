<template>
	<div class="contain login-wrap">
		<section class="login-body" v-if="!user">
        <div class="label">
            <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
        </div>
        <div class="label">
            <a class="button" @click="goLogin">登录</a>
        </div>
    </section>
	</div>
</template>
<script>
export default {
  data() {
    return {
      token: "",
      user: null
    };
  },
  created() {
    if (window.sessionStorage.user) {
      this.$store.dispatch(
        "setUserInfo",
        JSON.parse(window.sessionStorage.user)
      );
      this.user = JSON.parse(window.sessionStorage.user);
      this.$router.push({
        path: "person"
      });
    }
  },
  components: {},
  methods: {
    goLogin() {
      if (!this.token) {
        console.log("token不可为空！");
        return;
      }

      this.$api
        .post("/api/v1/accesstoken", {
          accesstoken: this.token
        })
        .then(res => {
          if (res.status == 200) {
            this.user = {
              loginname: res.data.loginname,
              avatar_url: res.data.avatar_url,
              userId: res.data.id,
              token: this.token
            };
            console.log(this);
            window.window.sessionStorage.user = JSON.stringify(this.user);
            this.$store.dispatch("setUserInfo", this.user);
            // let redirect = decodeURIComponent(
              // this.$route.query.redirect || "/"
            //   "/person"
            // );
            this.$router.push({
              path: "person"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    backHome() {
      this.$router.push({
        path: "home"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.login-wrap {
  .login-body {
    padding: 150px 15px;
    background-color: #fff;
    .label {
      width: 100%;
      margin-top: 55px;
      .txt {
        padding: 10px 0;
        border: none;
        border-bottom: 1px solid #86af74;
        background-color: transparent;
        width: 100%;
        font-size: 18px;
        color: #333;
        outline: none;
      }
      .button {
        display: inline-block;
        width: 100%;
        height: 64px;
        background-color: #86af74;
        border: none;
        border-radius: 3px;
        text-align: center;
        font-size: 24px;
        line-height: 64px;
        color: #fff;
      }
    }
  }
}
</style>
