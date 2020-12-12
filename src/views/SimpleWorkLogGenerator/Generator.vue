<template>
  <el-form ref="form" :model="workLog" label-width="80px" id="mainForm">
    <el-row>
      <el-col :xs="24" :sm="9" :md="8" :lg="8">
        <el-form-item label="日期">
          <el-date-picker
            v-model="workLog.logDate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="9" :md="8" :lg="8">
        <el-form-item label="工作类型">
          <el-select v-model="workLog.workTypeId">
            <el-option
              v-for="item in workTypeList"
              :key="item.rowId"
              :label="item.workTypeName"
              :value="item.rowId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="9" :md="8" :lg="8" :span="11">
        <el-form-item label="开始时间">
          <el-time-picker v-model="workLog.startTime" placeholder="任意时间点"></el-time-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="9" :md="8" :lg="8" :span="11">
        <el-form-item label="结束时间">
          <el-time-picker v-model="workLog.finishTime" placeholder="任意时间点"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="9" :md="8" :lg="8">
        <el-form-item label="工作单元">
          <el-select v-model="workLog.workUnitId">
            <el-option
              v-for="item in workUnitList"
              :key="item.rowId"
              :label="item.workUnitName"
              :value="item.rowId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="9" :md="8" :lg="8">
        <el-button type="primary" @click="addLog">添加一条记录</el-button>
      </el-col>
    </el-row>

    <div v-for="item in workLog.workLogDetails" :key="item.rowId">
      <div style="margin:20px">
        <el-row>
          <el-col :xs="22" :sm="18" :md="12" :lg="12">
            <el-input v-model="item.content" clearable placeholder="工作描述" style="width:95%;"></el-input>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2">
            <el-button type="danger" @click="removeLog(item)">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row>
      <el-col :xs="24" :sm="20" :md="13" :lg="13">
        <div id="submitBtn">
          <el-button type="success" @click="submitLog">提交</el-button>
          <el-button type="info" @click="resetLog">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import {
  uploadWorkLog,
  getAllWorkType,
  getAllWorkUnit
} from '@/api/Swlg/WorkLogGenerator';
import { Message } from 'element-ui';
const defaultWorkLogDetail = { workLogId: '', content: '' };
export default {
  name: 'Generator',
  created() {
    this.getWorkTypeList();
    this.getWorkUnitList();
  },
  data() {
    return {
      workLog: {
        logDate: new Date(),
        startTime: new Date(),
        finishTime: new Date(),
        workLogDetails: [{}]
      },
      workTypeList: [],
      workUnitList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      }
    };
  },
  methods: {
    addLog() {
      var workLogDetail = Object.assign({}, defaultWorkLogDetail);
      this.workLog.workLogDetails.push(workLogDetail);
      // console.log(this.workLog.workLogDetails);
    },
    resetLog(){
       this.workLog.logDate = new Date();
       this.workLog.startTime = new Date();
       this.workLog.finishTime = new Date();
       this.workLog.workLogDetails = [{}];
    },
    removeLog(item) {
      this.workLog.workLogDetails.splice(
        this.workLog.workLogDetails.indexOf(item),
        1
      );
      // console.log(this.workLog.workLogDetails);
    },
    submitLog() {
      uploadWorkLog(this.workLog).then(response => {
        if (response.data.code == 200) {
          Message({
            type: 'success',
            message: '记录成功'
          });
        } else {
          Message({
            type: 'error',
            message: '记录失败:' + response.data.message
          });
        }
      }).catch(error => {
        Message({
        type: 'warning',
        message: error.message
        });
      });
    },
    getWorkTypeList() {
      getAllWorkType({}).then(response => {
        this.workTypeList = response.data.data;
      }).catch(error => {
        Message({
        type: 'warning',
        message: error.message
        });
      });
    },
    getWorkUnitList() {
      getAllWorkUnit({}).then(response => {
        this.workUnitList = response.data.data;
      }).catch(error => {
        Message({
        type: 'warning',
        message: error.message
        });
      });
    }
  }
};
</script>

<style>
#submitBtn {
  display: flex;
  justify-content: flex-end;
}
#mainForm {
  margin: 0 auto;
}
</style>