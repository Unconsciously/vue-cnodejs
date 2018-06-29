<template>
  <mt-tabbar v-model="sV">
        <mt-tab-item id="home">
            <img slot="icon" src="../assets/logo.png">
            <router-link class="icon-about iconfont item" :to="{'name':'home'}">
                首页
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="msg">
            <img slot="icon" src="../assets/pie.png">
            <router-link class="icon-about iconfont item" :to="{'name':'msg'}">
                收藏
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="find">
            <img slot="icon" src="../assets/car.png">
            <router-link class="icon-about iconfont item" :to="{'name':'find'}">
                发布
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="person">
            <img slot="icon" src="../assets/gift.png">
            <router-link class="icon-about iconfont item" :to="{'name':'person'}">
                我的
            </router-link>
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
export default {
  props: ['selected'],
  data() {
    return {
        sV: this.selected
    };
  }

};
</script>

<style lang="scss" scoped>
</style>

