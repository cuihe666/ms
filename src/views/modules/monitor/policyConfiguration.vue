<!-- 这是策略配置页面 -->
<!-- created by cuihe in 2020-01-13 -->
<template>
  <div class="deviceManagement">
    <!-- 查询功能 -->
    <SearchPart
      :btnList="btnList"
      :formList="formList"
      @onAdd="onAdd"
      @clearSearch="clearSearch"
      @searchData="onSearch"></SearchPart>
    <TablePart
      :tableHeader="tableHeader"  
      :tableData="tableData" 
      :isPagination="isPagination"
      :maxHeight="maxHeight"
      :totalPage="totalPage"
      :isInfo="isInfo"
      @updateRow="updateRow"
      @deleteRow="deleteRow"
      @sizeChangeHandle="sizeChangeHandle"
      @currentChangeHandle="currentChangeHandle"
      @prevClick="prevClick"
      @nextClick="nextClick"
    ></TablePart>
    <AddOrUpdate v-if="addOrUpdateVisible" :devices="devices" ref="addOrUpdate" @refreshDataList="getdataList"></AddOrUpdate>
  </div>
</template>

<script>
import SearchPart from '@/components/searchPart'
import TablePart from '@/components/tablePart'
import AddOrUpdate from './policy-add-or-update'
export default {
  data () {
    return {
      formList: { // 这是暂存查询的数据
        '0': '',
        '1': '',
        '2': '',
        '3': ''
      },
      btnList: [ // 这是查询条件以及按钮
        {
          name: '设备编号',
          type: 'text',
          placeholder: '请填写设备编号'
        },
        {
          name: '检测类型',
          type: 'select',
          options: [
            {
              name: '链接',
              val: '0'
            },{
              name: '资源',
              val: '1'
            },{
              name: '安全服务',
              val: '2'
            },{
              name: '密码机连接失败',
              val: '3'
            },{
              name: 'TPS',
              val: '4'
            }
          ]
        },
        {
          name: '告警级别',
          type: 'select',
          options: [
            {
              name: '警告',
              val: '0'
            },{
              name: '严重',
              val: '1'
            }
          ]
        },
        {
          name: '状态',
          type: 'select',
          options: [
            {
              name: '正常',
              val: '0'
            },{
              name: '停用',
              val: '1'
            }
          ]
        },
        {
          name: ' ',
          type: 'searchBtn'
        },
        {
          name: ' ',
          type: 'clearBtn'
        },
        {
          name: ' ',
          type: 'addBtn',
          isAuth: 'device:devicegrp:add'
        }
      ],
      isPagination: true, // 表格是否需要分页
      maxHeight: 700, // 表格的高度
      totalPage: 0, // 初始化总页数
      isInfo: false,
      searchData: { // 这是查询条件
        noDevice: '',
        typeCheck: '',
        lvAlarm: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      tableHeader: [ // 表格表头
        {
          prop: "id",
          label: 'ID',
          width: 60,
          isfixed: 'left',
          isCenter: 'center'
        },{
          prop: "no",
          label: '编号',
          width: 200,
          isfixed: 'left',
          isCenter: 'center'
        },{
          prop: "noDevice",
          label: '设备编号',
          width: 200,
          isCenter: 'center'
        },{
          prop: "typeCheck",
          label: '检测类型',
          type: 'select',
          selectObj: {
            '0': '链接',
            '1': '资源',
            '2': '安全服务',
            '3': '密码机连接失败',
            '4': 'TPS'
          },
          width: 200,
          isCenter: 'center'
        },{
          prop: "cond",
          label: '触发条件',
          width: 200,
          isCenter: 'center'
        },{
          prop: "lvAlarm",
          label: '告警级别',
          type: 'select',
          selectObj: {
            '0': '警报',
            '1': '严重'
          },
          width: 200,
          isCenter: 'center'
        },{
          prop: "methodNotice",
          label: '通知方式',
          type: 'select',
          selectObj: {
            '0': 'Email',
            '1': '短信'
          },
          width: 200,
          isCenter: 'center'
        },{
          prop: "timePush",
          label: '推送间隔时间',
          width: 200,
          isCenter: 'center'
        },{
          prop: "countTrigger",
          label: '触发次数',
          width: 200,
          isCenter: 'center'
        },{
          prop: "status",
          label: '设备组状态',
          width: 200,
          isCenter: 'center',
          type: 'select',
          selectObj: {
              '0': '正常',
              '1': '停用'
          }
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
            },{
              clickFun (row, th) {
                th.$confirm(`确定要删除此条信息吗?`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  th.$emit('deleteRow', row);
                }).catch(() => {});
              },
              name: '删除',
              isAuth: 'device:devicegrp:delete'
            }
          ]
        }
      ],
      tableData: [ // 表格数据
              
      ],
      addOrUpdateVisible: false, // 弹框是否显示
      devices: []
    }
  },
  components: { SearchPart,TablePart,AddOrUpdate },
  created () {
    this.getDevices();
    this.getdataList();
  },
  mounted () {

  },
  methods: {
    onSearch (val) {
      this.searchData = this.objectHandle(this.formList, this.searchData);
      this.getdataList();
    },
    // 点击新增事件
    onAdd () {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    // 点击修改事件
    updateRow (row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row);
      })
    },
    // 删除事件
    deleteRow (row) {
      var data = {
        id: row.id
      }
      this.$http({
            url: this.$http.adornUrl('/configMonitor/deleteById'),
            method: 'get',
            params: this.$http.adornParams(data, false)
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.$message.success('删除成功！')
              this.getdataList();
            } else {
              this.$message.error('删除失败！')
            }
          })
          .catch((err) => {
            this.$message.error('删除失败！')
          })
    },
    // 清空事件
    clearSearch () {
      this.searchData.noDevice = '';
      this.searchData.typeCheck = '';
      this.searchData.lvAlarm = '';
      this.searchData.status = '';
      this.searchData.pageSize = 10;
      this.searchData.pageNum = 1;
      this.isInfo = true;
      this.getdataList()
    },
    sizeChangeHandle (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getdataList();
    },
    currentChangeHandle (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getdataList();
    },
    prevClick (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getdataList();
    },
    nextClick (data) {
      this.searchData.pageNum = data.pageNum;
      this.searchData.pageSize = data.pageSize;
      this.isInfo = false;
      this.getdataList();
    },
    // 获取表格数据
    getdataList () {
      this.searchData.status = this.searchData.status == '' ? '' : Number(this.searchData.status);
      this.searchData.lvAlarm = this.searchData.lvAlarm == '' ? '' : Number(this.searchData.lvAlarm);
      this.searchData.typeCheck = this.searchData.typeCheck == '' ? '' : Number(this.searchData.typeCheck);
      this.$http({
            url: this.$http.adornUrl('/configMonitor/list'),
            method: 'post',
            data: this.$http.adornData(this.searchData, false)
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.tableData = data.data;
              this.totalPage = data.totalSize;
            } else {
              this.$message.error('表格数据获取失败！')
            }
          })
          .catch((err) => {
            this.$message.error('表格数据获取失败！')
          })
    },
    // 获取设备编号
    getDevices () {
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
            console.log(data);
            if (data.respCode == '00' || data.respCode == '01') {
              for (var i = 0; i < data.data.length; i++) {
                this.devices.push({
                  no: data.data[i].no,
                  name: data.data[i].no
                });
              }
            } else {
              this.$message.error('设备管理数据获取失败！');
            }
          })
          .catch((err) => {
            this.$message.error('设备管理数据获取失败！');
          })
    }
  }
}
</script>

<style lang="scss" scoped>
  .deviceManagement{
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
