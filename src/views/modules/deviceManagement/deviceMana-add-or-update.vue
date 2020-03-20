<template>
  <el-dialog
    :title="!id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" v-loading="dataListLoading" :rules="dataRule" id="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请添加设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="no">
        <el-input v-model="dataForm.no" placeholder="请添加设备编号"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择设备类型">
          <el-option v-for="(item, index) in devicesType" :label="item.typeName" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备组" prop="grp">
        <el-select v-model="dataForm.grp" placeholder="请选择设备组">
          <el-option v-for="(item, index) in devicesGrp" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="dataForm.ip" placeholder="IP地址"></el-input>
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <el-input v-model="dataForm.port" placeholder="端口号,多个请以','分开；例如8001,8888"></el-input>
      </el-form-item>
      <el-form-item label="设备状态" prop="status">
        <el-select v-model="dataForm.status" placeholder="请选择设备状态">
          <el-option label="正常" value="0"></el-option>
          <el-option label="停用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备位置" prop="typeLocat">
        <el-select v-model="dataForm.typeLocat" placeholder="请选择设备位置">
          <el-option label="中心" value="1"></el-option>
          <el-option label="普通" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备图片">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :show-file-list="false"
            :on-success="successHandle"
            :on-error="errorHandle"
            :before-upload="beforeUploadHandle">
            <img v-if="dataForm.pic" :src="dataForm.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        no: '',
        type: '',
        grp: '',
        pic: '',
        ip: '',
        port: '',
        status: '',
        typeLocat: ''
      },
      id: 0,
      dataListLoading: false,
      // 正则
      dataRule: {
        name: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        no: [
          { required: true, message: '设备编号不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        grp: [
          { required: true, message: '请选择设备组', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: 'IP地址不能为空', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '端口号不能为空', trigger: 'blur' }
        ],
        targetName: [
          { required: true, message: '请选择目标设备', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择设备状态', trigger: 'blur' }
        ],
        typeLocat: [
          { required: true, message: '请选择设备位置', trigger: 'blur' }
        ]
      },
      url: this.$http.adornUrl(`/devices/addImg?token=${this.$cookie.get('token')}`),
      limit:1
    }
  },
  props: {
    devicesGrp: {
      type: Array,
      default: () => {
        return [];
      }
    },
    devicesType: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
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
        this.dataForm.no = row.no;
        this.dataForm.grp = row.grp;
        this.dataForm.pic = row.pic;
        this.dataForm.type = row.type;
        this.dataForm.port = row.port;
        this.dataForm.typeLocat = String(row.typeLocat);
        this.dataForm.ip = row.ip;
        this.id = row.id;
       } else { // 新增
          this.id = 0;
          this.dataForm.name = '';
          this.dataForm.status = '';
          this.dataForm.no = '';
          this.dataForm.grp = '';
          this.dataForm.pic = '';
          this.dataForm.type = '';
          this.dataForm.port = '';
          this.dataForm.typeLocat = '';
          this.dataForm.ip = '';
       }
    },
    // 图片上传之前
    beforeUploadHandle (file) {
      if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('只支持jpg、png格式的图片！')
        return false
      }
      this.dataListLoading = true;
    },
    // 图片上传成功
    successHandle (response) {
      this.dataListLoading = false;
      if (response.respCode == '00') {
        this.dataForm.pic = response.respMsg
      } else {
        this.$message.error(response.respMsg);
      }
    },
    errorHandle (error) {
      this.$message.error('上传失败，请重试！')
    },
    // 移除上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // if (this.dataForm.pic ==  '') {
          //   this.$message.warning('请上传图片！！！');
          //   return;
          // }
          let data = {
            name: this.dataForm.name,
            no: this.dataForm.no,
            type: this.dataForm.type,
            typeLocat: Number(this.dataForm.typeLocat),
            ip: this.dataForm.ip,
            port: this.dataForm.port,
            grp: this.dataForm.grp,
            pic: this.dataForm.pic,
            status: Number(this.dataForm.status)
          }
          if (this.id) {
            data.id = this.id;
          }
          this.$http({
            url: this.$http.adornUrl(`/devices/${this.id ? 'updateDev' : 'add'}`),
            method: 'post',
            data: data,
          }).then(({data}) => {
            if (data.respCode === '00') {
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
        width: 100px!important;
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
