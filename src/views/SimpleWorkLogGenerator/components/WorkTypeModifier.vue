<template>
  <div id="appContainer">
    <el-row>
      <el-button @click="handleDelete()" style="float:right;margin:0 0 0 10px" type="danger">删除</el-button>
      <el-button @click="handleEdit()" style="float:right" type="primary">编辑</el-button>
      <el-button @click="handleNew()" type="success" style="float:right">新增</el-button>
    </el-row>
    <div id="content">
      <el-row>
        <el-table
          stripe
          border
          :data="workTypeList"
          @row-click="handleRowClick"
          highlight-current-row
        >
          <el-col :span="4">
            <el-table-column align="center" width="100" label="序号" type="index" fixed></el-table-column>
          </el-col>
          <el-col :span="6">
            <el-table-column align="center" label="工作类型名" prop="workTypeName"></el-table-column>
          </el-col>
          <!-- <el-col :span="16">
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row.id)" type="primary">编辑</el-button>
                <el-button @click="handleDelete(scope.row.id)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-col>-->
        </el-table>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'WorkTypeModifier',
  data() {
    return {
      thisSelRow: null,
      workTypeList: [
        { id: '1', workTypeName: 'fuck' },
        { id: '2', workTypeName: 'fuck2' }
      ]
    };
  },
  methods: {
    handleEdit(id) {
      if (!this.thisSelRow) {
        Message({
          type: 'warning',
          message: '请选择行'
        });
        return;
      }
    },
    handleDelete(id) {
      if (!this.thisSelRow) {
        Message({
          type: 'warning',
          message: '请选择行'
        });
        return;
      }
    },
    handleRowClick(row, column, event) {
      this.thisSelRow = row;
    }
  }
};
</script>

<style scoped>
</style>