<template>
  <div id="appContainer">
    <div id="header">
      <el-form :model="queryParam" label-width="80px" ref="from">
        <el-row>
          <el-col :xs="24" :sm="9" :md="8" :lg="6">
            <el-form-item label="工作类型">
              <el-select v-model="queryParam.workTypeId">
                <el-option
                  v-for="item in workTypeList"
                  :key="item.rowId"
                  :label="item.workTypeName"
                  :value="item.rowId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="9" :md="8" :lg="8">
            <el-form-item label="工作单元">
              <el-select v-model="queryParam.workUnitId">
                <el-option
                  v-for="item in workUnitList"
                  :key="item.rowId"
                  :label="item.workUnitName"
                  :value="item.rowId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="15" :md="15" :lg="10">
            <el-form-item label="工作日期">
              <el-date-picker
                v-model="dataBetween"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :default-time="['12:00:00']"
                @change="dateLoad2Param"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="7" :md="6" :lg="4">
            <div id="submitBtn">
              <el-button type="primary" @click="queryLog">搜索</el-button>
              <el-button type="info" @click="handleReset">重置</el-button>
              <el-button type="success" @click="handleExport">导出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div id="content">
      <el-table :data="logList" border style="width: 100%;" highlight-current-row max-height="300">
        <el-row>
          <el-table-column
            prop="logDate"
            label="工作日期"
            align="center"
            fixed
            :formatter="formatDate"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="workTypeId"
            label="工作类型"
            align="center"
            width="150px"
            :formatter="function(row, column, cellValue){
                return workTypeFomatter(cellValue);
                }"
          ></el-table-column>
          <el-table-column
            prop="workUnitId"
            label="工作单元"
            align="center"
            width="200px"
            :formatter="function(row, column, cellValue){
                return workUnitFomatter(cellValue);
                }"
          ></el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间"
            align="center"
            :formatter="formatTime"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="finishTime"
            label="结束时间"
            align="center"
            :formatter="formatTime"
            width="100px"
          ></el-table-column>
          <el-table-column prop="content" label="工作内容" align="center">
            <template slot-scope="scope">
              <p
                v-for="item in scope.row.workLogDetailList"
                :key="item.rowId"
                v-text="item.content"
                style="margin: 0px"
              >{{item.content}}</p>
            </template>
          </el-table-column>
        </el-row>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="queryParam.pageNum"
        :page-size="queryParam.pageSize"
        :page-sizes="[10,20,50]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  queryAll,
  queryAllByPage,
  insert,
  update,
  deleteById,
  getAllWorkType,
  getAllWorkUnit,
  exportData
} from '@/api/Swlg/WorkLogView';
import { FormatDate } from '@/utils/date';
import { Message } from 'element-ui';
const defaultQueryParam = {
  pageNumber: 1,
  pageSize: 10,
  isDelete: 0
};
export default {
  name: 'LogViewer',
  created() {
    this.getlogList();
    this.getWorkTypeList();
    this.getWorkUnitList();
  },
  data() {
    return {
      queryParam: Object.assign({}, defaultQueryParam),
      dataBetween: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setHours(0);
              start.setMinutes(0);
              start.setSeconds(0);
              end.setTime(start.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      logList: [],
      workUnitList: [],
      workTypeList: [],
      total: 0
    };
  },
  methods: {
    dateLoad2Param() {
      if (this.dataBetween == null) {
        this.queryParam.startDateQuery = null;
        this.queryParam.endDateQuery = null;
        return;
      }
      this.queryParam.startDateQuery = this.dataBetween[0];
      this.queryParam.endDateQuery = this.dataBetween[1];
    },
    queryLog() {
      queryAllByPage(this.queryParam).then(response => {
        this.logList = response.data.data.records;
        this.total = response.data.data.total;
      });
    },
    handleReset() {
      this.queryParam = Object.assign({}, defaultQueryParam);
      this.dataBetween = null;
      this.getlogList();
    },
    handleExport() {
      Message.info('正在导出');
      exportData(this.queryParam).then(res => {
        var blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel;charset=utf-8'
        });
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download =
          '日志:' +new Date
          '导出.xlsx';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      });
    },
    getlogList() {
      queryAllByPage(this.queryParam).then(response => {
        this.logList = response.data.data.records;
        this.total = response.data.data.total;
      });
    },
    getWorkTypeList() {
      getAllWorkType({}).then(response => {
        this.workTypeList = response.data.data;
      });
    },
    getWorkUnitList() {
      getAllWorkUnit({}).then(response => {
        this.workUnitList = response.data.data;
      });
    },
    handleSizeChange(val) {
      this.queryParam.pageNum = 1;
      this.queryParam.pageSize = val;
      this.getlogList();
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val;
      this.getlogList();
    },
    workTypeFomatter(cellValue) {
      let workTypeId = cellValue;
      this.workTypeList.forEach(workType => {
        if (workType.rowId == workTypeId) {
          workTypeId = workType.workTypeName;
        }
      });
      return workTypeId;
    },
    workUnitFomatter(cellValue) {
      let workUnitId = cellValue;
      this.workUnitList.forEach(workUnit => {
        if (workUnit.rowId == workUnitId) {
          workUnitId = workUnit.workUnitName;
        }
      });
      return workUnitId;
    }
  }
};
</script>

<style>
.pagination-container {
  /* display: inline-block; */
  float: right;
  margin-top: 20px;
}
/* #content .el-table {
  height: 300px;
} */
</style>