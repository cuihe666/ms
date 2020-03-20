<template>
  <el-dialog
    title="关联关系"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" id="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="目标设备" prop="noTarget">
        <el-select v-model="dataForm.noTarget" multiple placeholder="请选择">
          <el-option
            v-for="(item, index) in targetList"
            :key="index"
            :label="item.name"
            :value="item.no">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate } from '@/utils'
import Icon from '@/icons'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        noSource: '',
        noTarget: []
      }
    }
  },
  props: {
    targetList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  created () {
    //this.iconList = Icon.getNameList()
  },
  methods: {
    init (row) {
      this.visible = true;
      this.dataForm.noSource = row.no;
      this.dataForm.noTarget = [];
      this.$http({
        url: this.$http.adornUrl('/devices/selectDeviceTarget'),
        method: 'get',
        params: this.$http.adornParams({
          noSource: row.no
        }, false)
      }).then(({data}) => {
        if (data.respCode == '00') {
          console.log(data);
          for (let i = 0; i < data.data.length; i++) {
            this.dataForm.noTarget.push(data.data[i].noTarget);
          }
        } else {
          this.$message.error("目标设备获取失败，请重试！");
          this.visible = false;
        }
      }).catch((error)=> {
        this.visible = false;
        console.log(error);
      })
    },
    // 表单提交
    dataFormSubmit () {
      let data = {
        noSource: this.dataForm.noSource,
        noTarget: this.dataForm.noTarget.join(',')
      }
      console.log(this.dataForm);
      this.$http({
        url: this.$http.adornUrl('/devices/insertDeviceTarget'),
        method: 'get',
        params: this.$http.adornParams(data, false)
      }).then(({data}) => {
        if (data.respCode == '00') {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.$message.error("添加目标设备失败，请重试！");
          this.visible = false;
        }
      }).catch((error)=> {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      max-width: 370px;
    }
    &__icon-list {
      max-height: 180px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
  .el-dialog{
    width: 40%;
    #dataForm{
      .el-form-item__label{
        width: 100px!important;
      }
      .el-form-item__content{
        margin-left: 140px!important;
        width: 300px;
      }
      .el-select--medium{
        width: 300px;
      }
    }
  }
</style>
