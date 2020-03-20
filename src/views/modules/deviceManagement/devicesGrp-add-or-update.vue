<template>
  <el-dialog
    :title="!id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" id="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="设备组名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请添加设备组名称"></el-input>
      </el-form-item>
      <el-form-item label="设备组状态" prop="status">
        <el-select v-model="dataForm.status" placeholder="请选择设备组状态">
          <el-option label="使用中" value="0"></el-option>
          <el-option label="未使用" value="1"></el-option>
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
        name: '',
        status: ''
      },
      id: 0,
      // 正则
      dataRule: {
        name: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择设备状态', trigger: 'blur' }
        ]
      },
      url: this.$http.adornUrl(`/devices/addImg?token=${this.$cookie.get('token')}`),
      imageUrl: '',
      limit:1
    }
  },
  created () {
    // this.iconList = Icon.getNameList()
  },
  methods: {
    init (row) {
      this.visible = true;
       // 解决首次加载弹框组件的时候找不到ref的问题
       if (row) { // 修改
          this.dataForm.name = row.name;
          this.dataForm.status = String(row.status);
          this.id = row.id;
       } else { // 新增
          this.id = 0;
          this.dataForm.name = '';
          this.dataForm.status = '';
       }
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var data = {};
          if (this.id) { // update
            data.id = this.id;
            data.name = this.dataForm.name;
            data.status = Number(this.dataForm.status);
          } else { // add
            data.name = this.dataForm.name;
            data.status = Number(this.dataForm.status);
          }
          this.$http({
            url: this.$http.adornUrl('/groupDevices/addOrUpdate'),
            method: 'post',
            data: this.$http.adornData(data, false)
          }).then(({data}) => {
            if (data && data.respCode === '00') {
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
              this.$message.error(data.respMsg);
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
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
    #dataForm{
      .el-form-item__label{
        width: 120px!important;
      }
      .el-form-item__content{
        margin-left: 140px!important;
      }
      .el-select--medium{
        width: 100%;
      }

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }

  
</style>
