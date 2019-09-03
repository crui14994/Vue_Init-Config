<template>
  <div class="Sidebar">
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- 一级循环路由 -->
      <div v-for="(item,index) in siderBarRouters.children" :key="index">
        <!-- 如果当前路由下有你子路由则用el-submenu -->
        <el-submenu :index="item.path" v-if="item.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.name}}</span>
          </template>

          <!-- 二级循环路由 -->
          <div v-for="(item2,index2) in item.children" :key="index2">
            <el-submenu :index="item2.path" v-if="item2.children">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item2.name}}</span>
              </template>

              <!-- 三级循环路由 -->
              <div v-for="(item3,index3) in item2.children" :key="index3">
                <el-submenu :index="item3.path" v-if="item3.children">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item3.name}}</span>
                  </template>
                </el-submenu>
                <el-menu-item :index="item.path+'/'+item2.path+'/'+item3.path" v-if="!item3.children">{{item3.name}}</el-menu-item>
              </div>

            </el-submenu>
            <el-menu-item :index="item.path+'/'+item2.path" v-if="!item2.children">{{item2.name}}</el-menu-item>
          </div>

        </el-submenu>
        <!-- 如果当前路由下没有你子路由则用el-menu-item -->
        <el-menu-item :index="item.path" v-if="!item.children">
          <i class="el-icon-setting"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["siderBarRouters"])
  },
  created() {
    // console.log(this.siderBarRouters,this.addRouters);
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Sidebar {
  .el-menu {
    border: none;
  }
}
</style>
