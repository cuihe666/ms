<!-- 查询组件 -->
<!-- 现在封装有text、select、date、searchBtn、clearBtn -->
<!-- 此组件调用需要传值：
  1、formList： 需要返回的值，用来保存查询条件的值
  2、btnList： 需要查询的条件以及按钮
  注意：formList和btnList里面的每一项的值必须是对应的。
此组件方法：
  searchData：用来将查询条件的值(formList)传递给父组件 -->
<template >
    <!-- 查询区----start -->
    <div class="container">
        <el-form :label-position="labelPosition" id="devicesGrp" :label-width="labelWidth" :model="formList" :inline="true" class="demo-form-inline">
            <el-form-item v-for="(item, index) in btnList" 
              :key="index" 
              :label="item.name" 
              :class="item.name == ' ' ? 'btnWrap' : ''">
                <!-- 输入文本框 -->
                <el-input v-if="item.type == 'text'" v-model="formList[index]" :placeholder="item.placeholder"></el-input>
                <!-- 下拉框 -->
                <el-select v-if="item.type == 'select'" v-model="formList[index]" :placeholder="item.placeholder">
                    <el-option v-for="(option, index1) in item.options"
                      :key="index1"
                      :label="option.name"
                      :value="option.val"></el-option>
                </el-select>
                <!-- 日期选择框 -->
                <el-date-picker
                  v-if="item.type == 'date'"
                  v-model="formList[index]"
                  type="date"
                  :placeholder="item.placeholder">
                </el-date-picker>
                <!-- 提交按钮 -->
                <el-button v-if="item.type == 'searchBtn'" type="primary" @click="onSubmit">查询</el-button>
                <!-- 清空按钮 -->
                <el-button v-if="item.type == 'clearBtn'" type="primary" @click="onClear">清空</el-button>
                <el-button v-if="(item.type == 'addBtn') && isAuth(item.isAuth)" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 查询区----end -->
</template>
<style lang="scss" scoped>
  #devicesGrp{
      .el-form-item__content {
        width: 220px;
      }
      .el-form-item__label{
        width: 100px!important;
        padding-left: 10px;
      }
      .btnWrap{
        margin-top: -16px;
        width: 100px!important;
        .el-form-item__label{
          width: 10px!important;
          display: none;
        }
      }
  }
</style>
<script>
export default {
  name: "searchPart",
  data() {
    return {
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px" //lable宽度
    };
  },
  props: {
    btnList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    formList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    
  },
  methods: {
    // 查询
    onSubmit() {
      this.$emit('searchData', this.formList);
    }, 
    // 清空查询框
    onClear () {
      let keyArr = Object.keys(this.formList);
      for (let i in keyArr) {
        this.formList[keyArr[i]] = '';
      }
      this.$emit("clearSearch");
    },
    // 这是点击新增触发的事件
    onAdd () {
      this.$emit('onAdd', true);
    }
  }
};
</script>