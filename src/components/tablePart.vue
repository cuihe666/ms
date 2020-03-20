<!-- 表格组件 -->
<!-- 此组件需要穿三个变量
  1、tableData：表格数据——数组
  2、tableHeader：表头信息——数组
  3、tableStyle：表格样式——对象 -->
  <!-- isPagination：页面是否需要分页，是：true，否：false -->
<template >
    <div class="container">
        <el-table
          :data="tableData"
          :max-height="maxHeight"
          border
          :header-row-style="tableStyle.headerStyle"
          :header-align="tableStyle.headerAlign"
          style="width: 96%;margin: 0 2%;">
          <el-table-column
            v-for="(item, index) in tableHeader"
            :key="index"
            :prop="item.prop"
            fit="true"
            :label="item.label"
            :align="item.isCenter? item.isCenter : 'center'"
            :fixed="item.isfixed"
            :width="item.width? item.width : ''">
              <!-- 这个主要是要做有操作一栏的情况下按钮的渲染,并且每一行的按钮是一样的 -->
              <template slot-scope="scope">
                 <div v-if="item.oper">
                    <!-- 如果是按钮的话 -->
                    <el-button v-for="(o, key) in item.oper" v-if="isAuth(o.isAuth)" :key="key" @click="o.clickFun(scope.row, th)" type="text" size="small">{{o.name}}</el-button>
                  </div>
                  <div v-else>
                    <!-- 如果是普通节点的话 -->
                    <span v-if="!item.type">{{ scope.row[item.prop] }}</span>
                    <!-- 如果是图片节点的话 -->
                    <img v-if="item.type == 'pic'" :src="scope.row[item.prop]" alt="">
                    <!-- 如果是个普通选择数据的话 -->
                    <span v-if="item.type == 'select'">{{ item.selectObj[scope.row[item.prop]] }}</span>
                  </div>
                </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="isPagination"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          @prev-click="prevClick"
          @next-click="nextClick"
          :current-page="isInfo? 1 : pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="isInfo? 10 : pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>
<style lang="scss" scoped>
  img{
    display: block;
    width: 90px;
    height: 40px;
    margin: 0 auto;
  }
  .el-button--small{
    padding: 2px 15px!important;
  }
</style>
<script>
export default {
  name: "tablePart",
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      th: this
    };
  },
  props: {
    tableData: {
      type: Array,
      default: ()=> {
        return [];
      }
    },
    tableHeader: {
      type: Array,
      default: ()=> {
        return [];
      }
    },
    isPagination: {
      type: Boolean,
      default: ()=> {
        return false;
      }
    },
    maxHeight: {
      type: Number,
      default: ()=> {
        return 250;
      }
    },
    totalPage: {
      type: Number,
      default: ()=> {
        return 0;
      }
    },
    tableStyle: {
      tyle: Object,
      default: ()=> {
        return {
          headerStyle: {},// 表格样式
          headerAlign: 'center' // 表头是否居中
        };
      }
    },
    isInfo: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  created () {

  },
  mounted() {
    
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 改页条数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageNum = 1
      var data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      this.$emit('sizeChangeHandle', data);
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageNum = val
      var data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      this.$emit('currentChangeHandle', data);
    },
    prevClick (val) {
      this.pageNum = val
      var data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      this.$emit('prevClick', data);
    },
    nextClick (val) {
      this.pageNum = val
      var data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      this.$emit('nextClick', data);
    }
  }
};
</script>