<template>
  <div class="Header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#353A40"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item class="logo"><h1>LOGO</h1></el-menu-item>

      <el-menu-item v-show="!item.hidden" :index="item.path" v-for="(item,index) in addRouters" :key="index">{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      activeIndex: "/",
    };
  },
  computed: {
    ...mapGetters(["addRouters"])
  },
  created(){
    // console.log(this.addRouters)
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .el-menu {
    border: none;
    .logo {
      width: 200px;
    }
  }
}
</style>
