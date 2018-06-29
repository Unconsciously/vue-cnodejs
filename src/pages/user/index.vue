<template>
	<div class="contain person-wrap">
		<div class="avatar-box">
      <img :src="userInfo.avatar_url" alt="">
    </div>
    <p class="name">{{userInfo.loginname}}</p>
	</div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  components: {},
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$api
        .get(`/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          if (res.status == 200) {
            this.userInfo = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
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
