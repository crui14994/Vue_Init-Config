<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">
        <router-link :to="{ path: item.path }">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      breadList: []
    };
  },
  watch: {
    $route(to, from) {
      this.getBreadList();
    }
  },
  created() {
    this.getBreadList();
  },
  methods: {
    getBreadList() {
      this.breadList = [];
      this.$route.matched.forEach(item => {
        if (item.path === "") {
          item.path = "/";
        }
        this.breadList.push(item);
      });
      return this.breadList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.breadcrumb {
  padding: 25px 0;
}
</style>
