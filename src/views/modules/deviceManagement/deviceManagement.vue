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
      @sizeChangeHandle="sizeChangeHandle"
      :isInfo="isInfo"
      :maxHeight="maxHeight"
      :totalPage="totalPage"
      @currentChangeHandle="currentChangeHandle"
      @updateRow="updateRow"
      @addTargets="addTargets"
      @deleteRow="deleteRow"
      @prevClick="prevClick"
      @nextClick="nextClick"
    ></TablePart>
    <AddOrUpdate v-if="addOrUpdateVisible" :devicesGrp="devicesGrp" :devicesType="devicesType" ref="addOrUpdate" @refreshDataList="getdataList"></AddOrUpdate>
    <AddTargets v-if="addTargetsVisible" :targetList="tableData" ref="addTargets" @refreshDataList="getdataList"></addTargets>
  </div>
</template>

<script>
import SearchPart from '@/components/searchPart'
import TablePart from '@/components/tablePart'
import AddOrUpdate from './deviceMana-add-or-update'
import AddTargets from './add-targetDevices'
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
          name: '设备名称',
          type: 'text',
          placeholder: '请填写设备名称'
        },
        {
          name: '设备编号',
          type: 'text',
          placeholder: '请填写设备编号'
        },
        {
          name: '设备类型',
          type: 'select',
          options: []
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
          isAuth: 'device:device:add'
        }
      ],
      isPagination: true, // 表格是否需要分页
      maxHeight: 700, // 表格的高度
      totalPage: 0, // 初始化总页数
      searchData: { // 这是查询条件
        'name': '',
        'no': '',
        'type': '',
        'status': '',
        'pageNum': 1,
        'pageSize': 10
      },
      isInfo: false,
      tableHeader: [ // 表格表头
        {
          prop: "id",
          label: 'ID',
          width: 60,
          isfixed: true,
          isCenter: 'center'
        },{
          prop: "name",
          label: '设备名称',
          width: 160,
          isfixed: true,
          isCenter: 'center'
        },{
          prop: "no",
          label: '设备编号',
          width: 160,
          isCenter: 'center'
        },{
          prop: "typeName",
          label: '设备类型',
          width: 160,
          isCenter: 'center'
        },{
          prop: "pic",
          label: '设备图片',
          type: 'pic',
          width: 160,
          isCenter: 'center'
        },{
          prop: "grpName",
          label: '设备组',
          width: 160,
          isCenter: 'center',
        },{
          prop: "ip",
          label: 'ip地址',
          width: 160,
          isCenter: 'center'
        },{
          prop: "port",
          label: '端口号',
          width: 160,
          isCenter: 'center'
        },{
          prop: "status",
          label: '设备状态',
          width: 160,
          isCenter: 'center',
          type: 'select',
          selectObj: {
              '0': '正常',
              '1': '停用'
          }
        },{
          prop: "typeLocat",
          label: '设备位置',
          width: 160,
          isCenter: 'center',
          type: 'select',
          selectObj: {
              '1': '中心',
              '2': '边缘',
              '0': '普通'
          }
        },{
          label: '操作',
          isCenter: 'center',
          isfixed: 'right',// fixed='right'会使此列在表格右侧固定
          width: 180,
          oper: [
            {
              clickFun (row, th) {
                 th.$emit('addTargets', row);
              },
              name: '关系',
              isAuth: 'device:device:addTargets'
            },{
              clickFun (row, th) {
                 th.$emit('updateRow', row);
              },
              name: '修改',
              isAuth: 'device:device:update'
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
              isAuth: 'device:device:delete'
            }
          ]
        }
      ],
      tableData: [ // 表格数据
              
      ],
      addOrUpdateVisible: false, // 新增修改弹框是否显示
      addTargetsVisible: false, // 关联关系弹框是否显示
      devicesGrp: [], // 设备组数据
      devicesType: [] // 设备类型
    }
  },
  components: { SearchPart,TablePart,AddOrUpdate,AddTargets },
  created () {
    this.getdevicesGrp();
    this.getdevicesType();
    this.getdataList();
    
  },
  mounted () {

  },
  methods: {
    onSearch (val) {
      this.searchData = this.objectHandle(this.formList, this.searchData);
      this.getdataList();
    },
    // 改变分页器每页条数
    sizeChangeHandle (data) {
      console.log(data);
      this.searchData.pageSize = data.pageSize;
      this.searchData.pageNum = data.pageNum;
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
    // 点击新增事件
    onAdd () {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    // 清空事件
    clearSearch () {
      this.searchData.name = '';
      this.searchData.status = '';
      this.searchData.no = '';
      this.searchData.type = '';
      this.searchData.pageSize = 10;
      this.searchData.pageNum = 1;
      this.isInfo = true;
      this.getdataList()
    },
    // 关联关系添加
    addTargets (row) {
      this.addTargetsVisible = true;
      this.$nextTick(() => {
        this.$refs.addTargets.init(row);
      })
    },
    // 修改
    updateRow (row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row);
      })
    },
    // 删除
    deleteRow (row) {
      this.$http({
            url: this.$http.adornUrl('/devices/del'),
            method: 'get',
            params: this.$http.adornParams({
              id: row.id
            }, false)
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.getdataList();
            } else {
              this.$message.error('删除失败！')
            }
          })
          .catch((err) => {
            this.$message.error('删除失败，请重试！');
          })
    },
    // 获取表格数据
    getdataList () {
      this.$http({
            url: this.$http.adornUrl('/devices/getDevicesList'),
            method: 'get',
            params: this.$http.adornParams(this.searchData, false)
          })
          .then(({data}) => {
            if (data.respCode == '00' || data.respCode == '01') {
              this.tableData = data.data ? data.data : [];
              this.totalPage = data.totalSize;
            } else {
              this.$message.error('设备管理数据获取失败！');
            }
          })
          .catch((err) => {
            this.$message.error('设备管理数据获取失败！');
          })
    },
    // 获取设备组
    getdevicesGrp () {
      this.$http({
            url: this.$http.adornUrl('/groupDevices/list'),
            method: 'post',
            data: this.$http.adornData({
              'name': '',
              'status': 0,
              'pageNum': 1,
              'pageSize': 100
            }, false)
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.devicesGrp = data.data;
            } else {
              this.$message.error('设备组数据获取失败！')
            }
          })
          .catch((err) => {
            this.$message.error('设备组数据获取失败！');
          })
    },
    // 获取设备类型
    getdevicesType () {
      this.$http({
            url: this.$http.adornUrl('/devices/getDevicesType'),
            method: 'get'
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.devicesType = data.data;
              for (let i = 0; i < data.data.length; i++) {
                this.btnList[2].options.push({
                  name: data.data[i].typeName,
                  val: data.data[i].type
                });
              }
            } else {
              this.$message.error('设备类型数据获取失败！')
            }
          })
          .catch((err) => {
            this.$message.error('设备类型数据获取失败！');
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
