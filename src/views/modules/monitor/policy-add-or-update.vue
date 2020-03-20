<template>
  <el-dialog
    :title="!id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" id="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="编号" prop="no">
        <el-input v-model="dataForm.no" placeholder="请添加编号"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="noDevice">
        <el-select v-model="dataForm.noDevice" placeholder="请选择设备编号">
          <el-option v-for="item in devices" :label="item.name" :value="item.no"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检测类型" prop="typeCheck">
        <el-select v-model="dataForm.typeCheck" placeholder="请选择设检测类型">
          <el-option label="链接" value="0"></el-option>
          <el-option label="资源" value="1"></el-option>
          <el-option label="安全服务" value="2"></el-option>
          <el-option label="密码机连接失败" value="3"></el-option>
          <el-option label="TPS" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="触发条件" prop="cond">
        <el-input v-model="dataForm.cond" placeholder="请添加触发条件"></el-input>
      </el-form-item>
      <el-form-item label="告警级别" prop="lvAlarm">
        <el-select v-model="dataForm.lvAlarm" placeholder="请选择告警级别">
          <el-option label="警告" value="0"></el-option>
          <el-option label="严重" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知方式" prop="methodNotice">
        <el-select v-model="dataForm.methodNotice" placeholder="请选择通知方式">
          <el-option label="Email" value="0"></el-option>
          <el-option label="短信" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送间隔时间" prop="timePush">
        <el-input type="text" maxlength="2" show-word-limit v-model="dataForm.timePush" placeholder="请添加推送间隔时间"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="dataForm.status" placeholder="请选择状态">
          <el-option label="正常" value="0"></el-option>
          <el-option label="停用" value="1"></el-option>
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
        no: '',
        noDevice: '',
        cond: '',
        methodNotice: '',
        timePush: '',
        typeCheck: '',
        lvAlarm: '',
        status: ''
      },
      id: 0,
      // 正则
      dataRule: {
        no: [
          { required: true, message: '编号不能为空', trigger: 'blur' }
        ],
        noDevice: [
          { required: true, message: '设备编号不能为空', trigger: 'blur' }
        ],
        cond: [
          { required: true, message: '触发条件不能为空', trigger: 'blur' }
        ],
        methodNotice: [
          { required: true, message: '请选择通知方式', trigger: 'blur' }
        ],
        timePush: [
          { required: true, message: '推送间隔时间不能为空', trigger: 'blur' }
        ],
        typeCheck: [
          { required: true, message: '请选择检测类型', trigger: 'blur' }
        ],
        lvAlarm: [
          { required: true, message: '请选择告警级别', trigger: 'blur' }
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
  props: {
    devices: {
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
        this.dataForm.no = row.no;
        this.dataForm.noDevice = row.noDevice;
        this.dataForm.cond = row.cond;
        this.dataForm.typeCheck = String(row.typeCheck);
        this.dataForm.lvAlarm = String(row.lvAlarm);
        this.dataForm.methodNotice = String(row.methodNotice);
        this.dataForm.timePush = String(row.timePush);
        this.dataForm.status = String(row.status);
        this.id = row.id;
       } else { // 新增
          this.id = 0;
          this.dataForm.no = '';
          this.dataForm.noDevice = '';
          this.dataForm.cond = '';
          this.dataForm.typeCheck = '';
          this.dataForm.lvAlarm = '';
          this.dataForm.methodNotice = '';
          this.dataForm.timePush = '';
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
          }
          data.no = this.dataForm.no;
          data.noDevice = this.dataForm.noDevice;
          data.typeCheck = this.dataForm.typeCheck != '' ? Number(this.dataForm.typeCheck) : '';
          data.cond = this.dataForm.cond;
          data.lvAlarm = this.dataForm.lvAlarm != '' ? Number(this.dataForm.lvAlarm) : '';
          data.methodNotice = this.dataForm.methodNotice != '' ? Number(this.dataForm.methodNotice) : '';
          data.timePush = this.dataForm.timePush != '' ? Number(this.dataForm.timePush) : '';
          data.status = this.dataForm.status != '' ? Number(this.dataForm.status) : '';
          this.$http({
            url: this.$http.adornUrl('/configMonitor/addOrUpdate'),
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
