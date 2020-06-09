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
    <div id="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="common-dialog">
        <el-form :model="workTypeForm">
          <el-form-item label="工作类型" prop="workTypeName">
            <el-input v-model="workTypeForm.workTypeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="dialogBtn" @click="submit">提交</el-button>
            <el-button type="info" class="dialogBtn" @click="dialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  queryAll,
  queryAllByPage,
  insert,
  update,
  deleteById
} from '@/api/Swlg/WorkType';
import { Message } from 'element-ui';
export default {
  name: 'WorkTypeModifier',
  created() {
    this.getList();
  },
  data() {
    return {
      thisSelRow: null,
      workTypeList: [],
      dialogTitle: '',
      dialogFormVisible: false,
      workTypeForm: {}
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
      this.workTypeForm = this.thisSelRow;
      this.dialogTitle = '编辑工作类型';
      this.dialogFormVisible = true;
    },
    handleDelete(id) {
      if (!this.thisSelRow) {
        Message({
          type: 'warning',
          message: '请选择行'
        });
        return;
      }
      deleteById({ rowId: this.thisSelRow.rowId }).then(res => {
        if (res.data.code == 200) {
          Message({
            type: 'success',
            message: '删除成功'
          });
          this.dialogFormVisible = false;
          this.getList();
        } else {
          Message({
            type: 'error',
            message: res.data.message
          });
        }
      });
    },
    handleRowClick(row, column, event) {
      this.thisSelRow = row;
    },
    getList() {
      queryAll({}).then(response => {
        this.workTypeList = response.data.data;
      });
    },
    handleNew() {
      this.workTypeForm = {};
      this.dialogTitle = '新增工作类型';
      this.dialogFormVisible = true;
    },
    submit() {
      if (this.workTypeForm.rowId) {
        update({
          rowId: this.workTypeForm.rowId,
          workTypeName: this.workTypeForm.workTypeName
        }).then(res => {
          if (res.data.code == 200) {
            Message({
              type: 'success',
              message: '修改成功'
            });
            this.dialogFormVisible = false;
            this.getList();
          } else {
            Message({
              type: 'error',
              message: res.data.message
            });
          }
        });
      } else {
        this.workTypeForm.isDelete = 0;
        insert(this.workTypeForm).then(res => {
          if (res.data.code == 200) {
            Message({
              type: 'success',
              message: '新增成功'
            });
            this.dialogFormVisible = false;
            this.getList();
          } else {
            Message({
              type: 'error',
              message: 'res.data.message'
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.el-form-item__label {
  width: 130px;
}
.el-input {
  width: 80%;
}
.el-dialog {
  margin-top: 15vh;
  width: 520px;
}
.dialogBtn {
  float: right;
  margin-left: 10px;
}
</style>