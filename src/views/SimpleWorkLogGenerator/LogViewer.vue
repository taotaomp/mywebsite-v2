<template>
  <div id="appContainer">
    <div id="header">
      <el-form :model="queryParam" label-width="80px" ref="from">
        <el-row>
          <el-col :xs="24" :sm="9" :md="8" :lg="8">
            <el-form-item label="工作类型">
              <el-select v-model="queryParam.workTypeId"></el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="9" :md="8" :lg="8">
            <el-form-item label="工作单元">
              <el-select v-model="queryParam.workTypeId"></el-select>
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
          <el-col :xs="24" :sm="4" :md="4" :lg="3">
            <div id="submitBtn">
              <el-button type="primary" @click="queryLog">搜索</el-button>
              <el-button type="success" @click="queryLog">导出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div id="content">
      <el-table :data="logList" border style="width: 100%;" highlight-current-row>
        <el-row>
          <el-table-column prop="logDate" label="工作日期" align="center" fixed :formatter="formatDate"></el-table-column>
          <el-table-column prop="workTypeId" label="工作类型" align="center"></el-table-column>
          <el-table-column prop="workUnitId" label="工作单元" align="center"></el-table-column>
          <el-table-column prop="startTime" label="开始时间" align="center" :formatter="formatTime"></el-table-column>
          <el-table-column prop="finishTime" label="结束时间" align="center" :formatter="formatTime"></el-table-column>
          <el-table-column prop="content" label="工作内容" align="center"></el-table-column>
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
  deleteById
} from '@/api/Swlg/WorkLogView';
import {FormatDate} from '@/utils/date'
const defaultQueryParam = {
  pageNumber: 1,
  pageSize: 10,
  isDelete: 0
};
export default {
  name: 'LogViewer',
  created(){
    this.getlogList();
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
      workUintList: [],
      workTypeList: [],
      total: 0
    };
  },
  methods: {
    dateLoad2Param() {
      this.queryParam.startDateQuery = this.dataBetween[0];
      this.queryParam.endDateQuery = this.dataBetween[1];
    },
    queryLog() {},
    getlogList() {
      queryAllByPage(this.queryParam).then(response =>{
        console.log(response)
        this.logList = response.data.data.records;
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
#content .el-table {
  height: 300px;
}
</style>