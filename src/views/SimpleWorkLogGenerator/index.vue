<template>
  <div id="appContainer">
    <el-tabs tab-position="top" type="border-card" style="height:100%">
      <el-tab-pane label="日志生成"><Generator></Generator></el-tab-pane>
      <el-tab-pane label="历史日志"><LogViewer></LogViewer></el-tab-pane>
      <el-tab-pane label="数据更改"><MetaModifier></MetaModifier></el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import Generator from './Generator'
import LogViewer from './LogViewer'
import MetaModifier from './MetaModifier'
export default {
  name: 'SWLG',
  components:{
    Generator,
    LogViewer,
    MetaModifier
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