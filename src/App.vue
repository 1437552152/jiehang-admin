<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.acc_sc .ivu-upload{
    float: left;
    margin-right:10px;
}
.acc_sc{
  margin-bottom: 20px;
  width: 50%;
  float: left;
}



</style>
