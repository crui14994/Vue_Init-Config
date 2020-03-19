<template>
  <div class="layout">
    <Header />
    <div class="app-body">
      <div class="silder-nav">
        <!-- <Sidebar /> -->
      </div>
      <div class="app-main">
        <Breadcrumb/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
// import Sidebar from "@/components/layout/Sidebar";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default {
  name: "layout",
  components: {
    Header,
    // Sidebar,
    Breadcrumb
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.layout {
  .app-body {
    margin-top: 60px;
    .silder-nav {
      position: fixed;
      width: 200px;
      height: 100%;
      overflow-y: auto;
      background-color: #545c64;
    }
  }
  .app-main{
    padding:0px 0px 50px 230px;
  }
}
</style>
