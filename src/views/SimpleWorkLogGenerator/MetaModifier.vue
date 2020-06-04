<template>
  <el-tabs tab-position="left" style="width:100%;height: 100%;">
    <el-tab-pane label="工作类型">
      <WorkTypeModifier></WorkTypeModifier>
    </el-tab-pane>
    <el-tab-pane label="工作单元">
      <WorkUnitModifier></WorkUnitModifier>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import WorkUnitModifier from './components/WorkUnitModifier';
import WorkTypeModifier from './components/WorkTypeModifier';
export default {
  components: {
    WorkUnitModifier,
    WorkTypeModifier
  }
};
</script>

<style scoped>
</style>