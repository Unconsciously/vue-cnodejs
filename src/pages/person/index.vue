<template>
	<div class="contain person-wrap">
		<div class="avatar-box">
      <img :src="user.avatar_url" alt="">
    </div>
    <p class="name">{{user.loginname}}</p>
	</div>
</template>
<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  components: {},
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (window.sessionStorage.user) {
        this.$store.dispatch(
          "setUserInfo",
          JSON.parse(window.sessionStorage.user)
        );
        this.user = JSON.parse(window.sessionStorage.user);
      } else {
        this.$router.push({
          path: "login"
        });
        return;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.person-wrap {
  margin: 100px auto;
  .avatar-box {
    img {
      display: block;
      margin: auto;
    }
  }
  p {
    text-align: center;
    padding: 25px 0;
    font-size: 30px;
    font-weight: 700;
  }
}
</style>
