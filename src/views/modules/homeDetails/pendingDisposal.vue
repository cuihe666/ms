<!-- 这是待处理信息页面 -->
<!-- created by cuihe in 2020-01-10 -->
<template>
  <div class="pendingDisposal">
    <!-- 查询功能 -->
    <SearchPart
      :btnList="btnList"
      :formList="formList"
      @clearSearch="clearSearch"
      @searchData="onSearch"></SearchPart>
      <!-- 列表展示 -->
      <TablePart
      :tableHeader="tableHeader"  
      :tableData="tableData" 
      :isPagination="isPagination"
      :maxHeight="maxHeight"
      :totalPage="totalPage"
      :isInfo="isInfo"
      @updateRow="updateRow"
      @sizeChangeHandle="sizeChangeHandle"
      @currentChangeHandle="currentChangeHandle"
      @prevClick="prevClick"
      @nextClick="nextClick"
    ></TablePart>
    <el-dialog
      title="处理意见"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" id="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" :rules="dataRule">
        <el-form-item label="处理意见" prop="result">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入处理意见"
            v-model="dataForm.result">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchPart from '@/components/searchPart'
import TablePart from '@/components/tablePart'
export default {
  data () {
    return {
      formList: { // 这是暂存查询的数据
        '0': ''
      },
      btnList: [ // 这是查询条件以及按钮
        {
          name: '设备名称',
          type: 'select',
          options: []
        },
        {
          name: ' ',
          type: 'searchBtn'
        },
        {
          name: ' ',
          type: 'clearBtn'
        }
      ],
      searchData: {
        noDevice: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      tableHeader: [
        {
          prop: "id",
          label: 'ID',
          width: 60,
          isfixed: true,
          isCenter: 'center'
        },{
          prop: "noName",
          label: '设备名称',
          isfixed: true,
          isCenter: 'center'
        },{
          prop: "idConfigMonitor",
          label: '监控配置id',
          isCenter: 'center'
        },{
          prop: "timeAlarm",
          label: '告警时间',
          isCenter: 'center'
        },{
          prop: "noDevice",
          label: '设备编号',
          isCenter: 'center'
        },{
          prop: "typeCheck",
          label: '检测类型',
          isCenter: 'center'
        },{
          prop: "cond",
          label: '触发条件',
          isCenter: 'center'
        },{
          prop: "lvAlarm",
          label: '告警级别',
          isCenter: 'center'
        },{
          prop: "methodNotice",
          label: '通知方式',
          isCenter: 'center'
        },{
          prop: "status",
          label: '状态',
          isCenter: 'center'
        },{
          prop: "result",
          label: '处理意见',
          isCenter: 'center'
        },{
          label: '操作',
          isCenter: 'center',
          width: 200,
          isfixed: 'right',
          oper: [
            {
              clickFun (row, th) {
                th.$emit('updateRow', row);
              },
              name: '修改',
              isAuth: 'device:devicegrp:update'
            }
          ]
        }
      ],
      isPagination: true,
      maxHeight: 750,
      totalPage: 0,
      isInfo: false,
      visible: false,
      dataForm: {
        result: '',
        id:''
      },
      dataRule: {
        result: [
          { required: true, message: '处理意见不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: { SearchPart, TablePart },
  created () {
    this.getDeviceName();
  },
  mounted () {

  },
  methods: {
    // 清空查询条件
    clearSearch () {
      this.searchData.noDevice = '';
      this.searchData.pageSize = 10;
      this.searchData.pageNum = 1;
      this.isInfo = true;
      this.getData();
    },
    // 查询
    onSearch () {
      this.searchData = this.objectHandle(this.formList, this.searchData);
      this.searchData.pageNum = 1;
      this.searchData.pageSize = 10;
      this.getData();

    },
    // 修改数据
    updateRow (row) {
      console.log(row);
      this.visible = true;
      this.dataForm.id = row.id;
      if (row.result && row.result != "") {
        this.dataForm.result = row.result;
      } else {
        this.dataForm.result = '';
      }
    },
    // 提交修改意见
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/devices/updateAlarmStatus'),
            method: 'post',
            data: this.$http.adornData(this.dataForm, false)
          }).then(({data}) => {
            if (data.respCode == '00') {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.getData();
                }
              })
            } else {
              this.$message.error("修改状态失败，请重试！");
              this.visible = false;
            }
          }).catch((error)=> {
            this.$message.error("数据提交失败，请重试！");
            console.log(error);
          })
        }
      })
    },
    // 改变每页条数
    sizeChangeHandle (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getData();
    },
    // 点击具体页数
    currentChangeHandle (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getData();
    },
    // 点击上一页
    prevClick (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getData();
    },
    // 点击下一页
    nextClick (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getData();
    },
    // 获取页面数据
    getData () {
      this.$http({
            url: this.$http.adornUrl('/devices/getAlertDetails'),
            method: 'get',
            params: this.$http.adornParams(this.searchData, false)
          })
          .then(({data}) => {
            if (data.respCode == '00' || data.respCode == '01') {
              this.tableData = data.data;
              this.totalPage = data.totalSize;
            } else {
              this.$message.error('待处理信息获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          });
    },
    // 获取设备名称
    getDeviceName () {
      this.$http({
            url: this.$http.adornUrl('/devices/getDevicesList'),
            method: 'get',
            params: this.$http.adornParams({
              'name': '',
              'no': '',
              'type': '',
              'status': '',
              'pageNum': 1,
              'pageSize': 100
            }, false)
          })
          .then(({data}) => {
            if (data.respCode == '00' || data.respCode == '01') {
              for (let i = 0; i < data.data.length; i++) {
                this.btnList[0].options.push({
                  name: data.data[i].name,
                  val: data.data[i].no
                });
              }
              if (this.$route.query['noDeivce']) {
                this.searchData.noDevice = this.$route.query['noDeivce'];
                console.log(this.btnList[0].options)
                this.formList['0'] = String(this.$route.query['noDeivce']);
              }
              this.getData()
            } else {
              this.$message.error('设备数据获取失败！');
            }
          })
          .catch((err) => {
            this.$message.error('设备数据获取失败！');
          })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pendingDisposal{
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
