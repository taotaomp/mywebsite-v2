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
          :data="workUnitList"
          @row-click="handleRowClick"
          highlight-current-row
        >
          <el-col :span="4">
            <el-table-column align="center" width="100" label="序号" type="index" fixed></el-table-column>
          </el-col>
          <el-col :span="6">
            <el-table-column align="center" label="工作单元名" prop="workUnitName"></el-table-column>
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
        <el-form :model="workUnitForm">
          <el-form-item label="工作单元" prop="workUnitName">
            <el-input v-model="workUnitForm.workUnitName"></el-input>
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
} from '@/api/Swlg/WorkUnit';
import { Message } from 'element-ui';
export default {
  name: 'WorkUnitModifier',
  created() {
    this.getList();
  },
  data() {
    return {
      thisSelRow: null,
      dialogTitle: '',
      dialogFormVisible: false,
      workUnitList: [],
      workUnitForm: {}
    };
  },
  methods: {
    getList() {
      queryAll({}).then(response => {
        this.workUnitList = response.data.data;
      }).catch(error => {
        Message({
        type: 'warning',
        message: error.message
        });
      });
    },
    handleEdit(id) {
      if (!this.thisSelRow) {
        Message({
          type: 'warning',
          message: '请选择行'
        });
        return;
      }
      this.workUnitForm = this.thisSelRow;
      this.dialogTitle = '编辑工作单元';
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
      }).catch(error => {
        Message({
        type: 'warning',
        message: error.message
        });
      });
    },
    handleRowClick(row, column, event) {
      this.thisSelRow = row;
    },
    handleNew() {
      this.workUnitForm = {};
      this.dialogTitle = '新增工作单元';
      this.dialogFormVisible = true;
    },
    submit() {
      if (this.workUnitForm.rowId) {
        update({
          rowId: this.workUnitForm.rowId,
          workUnitName: this.workUnitForm.workUnitName
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
        }).catch(error => {
        Message({
        type: 'warning',
        message: error.message
        });
      });
      } else {
        this.workUnitForm.isDelete = 0;
        insert(this.workUnitForm).then(res => {
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
        }).catch(error => {
        Message({
        type: 'warning',
        message: error.message
        });
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