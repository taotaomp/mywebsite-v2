<template>
  <div id="appContainer">
    <el-tabs tab-position="top" type="border-card" style="height:100%">
      <el-tab-pane label="日志生成"><Generator></Generator></el-tab-pane>
      <el-tab-pane label="历史日志">配置管理</el-tab-pane>
      <el-tab-pane label="数据更改">角色管理</el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import Generator from './Generator'
export default {
  name: 'SWLG',
  components:{
    Generator
  },
  data() {
    return {
    //   tabPosition: 'left'
    };
  }
};
</script>
<style scoped>
#appContainer{
    height: 100%;
}

</style>