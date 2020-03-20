<!-- 这是设备管理页面 -->
<!-- created by cuihe in 2020-01-02 -->
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
    <AddOrUpdate v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getdataList"></AddOrUpdate>
  </div>
</template>

<script>
import SearchPart from '@/components/searchPart'
import TablePart from '@/components/tablePart'
import AddOrUpdate from './devicesGrp-add-or-update'
export default {
  data () {
    return {
      formList: { // 这是暂存查询的数据
        '0': '',
        '1': ''
      },
      btnList: [ // 这是查询条件以及按钮
        {
          name: '设备组名称',
          type: 'text',
          placeholder: '请填写设备组名称'
        },
        {
          name: '状态',
          type: 'select',
          options: [
            {
              name: '使用中',
              val: '0'
            },{
              name: '未使用',
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
        'name': '',
        'status': '',
        'pageNum': 1,
        'pageSize': 10
      },
      tableHeader: [ // 表格表头
        {
          prop: "id",
          label: 'ID',
          width: 60,
          isCenter: 'center'
        },{
          prop: "name",
          label: '设备组名称',
          width: 200,
          isCenter: 'center'
        },{
          prop: "status",
          label: '设备组状态',
          width: 200,
          isCenter: 'center',
          type: 'select',
          selectObj: {
              '0': '使用中',
              '1': '未使用'
          }
        },{
          label: '操作',
          isCenter: 'center',
          width: 200,
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
    }
  },
  components: { SearchPart,TablePart,AddOrUpdate },
  created () {
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
            url: this.$http.adornUrl('/groupDevices/deleteById'),
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
      this.searchData.name = '';
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
      this.$http({
            url: this.$http.adornUrl('/groupDevices/list'),
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
