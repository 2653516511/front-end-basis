<template>
  <div v-loading="this.$store.state.loading">
    <div class="content" style="min-width: 500px;">
      <div class="warp" style="width: 1350px;margin-left: auto;margin-right: auto">
        <div class="inner">
          <div class="tip"></div>
          <div class="tit_small">工业和信息化部无线电管理局</div>
          <div class="tit_bigger">注册</div>
          <div class="tit_bigger">已有账号？请登录</div>


          <div style="width: 70%;margin-left: 15%">

            <el-form :rules="myInfoFormRules" ref="myInfoForm" :model="myInfoForm" label-width="200px"
                     label-position="right">
              <el-form-item style="margin-left: 0px;text-align: center">
                <el-radio-group v-model="myInfoForm.duserType" @change="changeCountryRadio" style="margin-left: -200px">
                  <el-radio label="1">中国大陆地区</el-radio>
                  <el-radio label="2">非中国大陆地区</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label='用户名' prop='loginname'>
                  <el-input v-model="myInfoForm.loginname"></el-input>
              </el-form-item>
              <el-form-item label='密码' prop='password'>
                  <el-input v-model="myInfoForm.password"></el-input>
              </el-form-item>
              <el-form-item label="是否奥组委发码机构" prop="azwOrgCodeFlag">
                <el-radio-group v-model="myInfoForm.azwOrgCodeFlag" @change="changeazwOrgCodeFlag">
                  <el-radio label="1">是 </el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="您所在的国家或地区" prop="country" v-show="countryShow">
                <el-select v-model="myInfoForm.country" placeholder="" filterable  clearable>
                  <el-option
                    v-for="item in countryList"
                    :key="item.id"
                    :label="item.enName"
                    :value="item.cnName">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="您的奥组委发码机构代码" prop="azwOrgCode"
                            v-show="azwOrgCodeShow">
                <el-input v-model="myInfoForm.azwOrgCode" @change="getAzwfmOrgInfoList"></el-input>
              </el-form-item>
              <el-form-item label="您的组织机构名称" prop="orgName" v-show="orgNameShow">
                <el-input v-model="myInfoForm.orgName"></el-input>
              </el-form-item>

              <el-form-item label="您的组织机构名称" prop="orgNameSelect" v-show="orgNameShowSelect">
                <el-select v-model="myInfoForm.orgName" placeholder="" clearable>
                  <el-option
                    v-for="item in orgNameList"
                    :key="item.index"
                    :label="item.orgName"
                    :value="item.orgName">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="您的组织机构邮箱" prop="orgEmail" v-show="azwOrgCodeShow">
                <el-input v-model="myInfoForm.orgEmail"></el-input>
              </el-form-item>
              <el-form-item label="您的组织机构代码" prop="orgCode" v-show="orgCodeShow">
                <el-input v-model="myInfoForm.orgCode"></el-input>
              </el-form-item>
              <el-form-item label="经办人组织名称" prop="passerOrg" v-show="passerOrgShow">
                <el-input v-model="myInfoForm.passerOrg"></el-input>
              </el-form-item>
              <el-form-item label="经办人身份证号" prop="passerId" v-show="passerIdShow">
                <el-input v-model="myInfoForm.passerId"></el-input>
              </el-form-item>
              <el-form-item label="经办人姓名" prop="passerName">
                <el-input v-model="myInfoForm.passerName"></el-input>
              </el-form-item>
              <el-form-item label="经办人邮箱" prop="passerEmail">
                <el-input v-model="myInfoForm.passerEmail"></el-input>
              </el-form-item>
              <el-form-item label="经办人电话" prop="passerPhone" :required="passerPhoneReq">
                <el-input v-model="myInfoForm.passerPhone"></el-input>
              </el-form-item>
              <el-form-item  prop="gonghan"  ref="fileUpload" v-show="gonghanShow">
                <label id="gonghan" class="labelGH" style="">公函</label>
                <el-upload
                  :data="fileData"
                  :action="this.api.api_eventdeclartion.upload"
                  accept=".pdf,.ofd"
                  :limit="1"
                  :show-file-list="true"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccess"
                  :on-exceed="handleExceed"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="fileList">
                  <el-button size="small" type="primary">请上传公函</el-button>
                  <div slot="tip" class="el-upload__tip">请选择PDF或OFD格式文件</div>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="saveOrgInfo('myInfoForm')">提交</el-button>
              </el-form-item>
            </el-form>

          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import '../../style/equipmentCheck.css'
  import {isValidate18Idcard} from '../../utils/idcard'

  export default {
    data() {
        // 用户名验证
        var loginnameVali = (rule, value, cb) => {
            let valiInfo = /^[0-9A-z@]{6,16}$/g
            if(!value) {
                cb(new Error('请输入用户名'))
            } else if (!valiInfo.test(value)) {
                cb(new Error('长度为6-16个字符，支持字母数字和@符号组成，不能使用空格'))
                
            } else {
                cb()
            }
        }
        // 密码验证
        var passwordVali = (rule, value, cb) => {
            let valiInfo = /^\S{8,16}$/g
            if(!value) {
                cb(new Error('请输入密码'))
            } else if (!valiInfo.test(value)) {
                cb(new Error('密码为8-16位字母数字组合，不能使用空格，可含特殊符号！'))
            } else {
                cb()
            }
        }
      var validateCountry = (rule, value, callback) => {
        if (this.myInfoForm.duserType == 2 && value === '') {
          callback(new Error('您所在的国家或地区'));
        } else {
          callback();
        }
      };
      var validateorgCode = (rule, value, callback) => {
        if (this.myInfoForm.duserType == 1 && value === '') {
          callback(new Error('您的组织机构代码'));
        } else {
          callback();
        }
      };
      var validatepasserOrg = (rule, value, callback) => {
        if (this.myInfoForm.duserType == 1 && value === '') {
          callback(new Error('经办人组织名称'));
        } else {
          callback();
        }
      };
      var validateazwOrgCode = (rule, value, callback) => {
        if (this.myInfoForm.azwOrgCodeFlag == 1 && value === '') {
          callback(new Error('您的奥组委发码机构代码'));
        } else {
          callback();
        }
      };
      var validateazwOrgEmail = (rule, value, callback) => {
        if(this.myInfoForm.azwOrgCodeFlag == 1){
          if ( value === '') {
            callback(new Error('您的组织机构邮箱'));
          } else if (!this.emailFunc(value)) {
            callback(new Error('邮箱格式不正确'));
          } else {
            callback();
          }
        }
        else {
          callback();
        }
      };
      var validatepasserPhone = (rule, value, callback) => {
        if(this.passerPhoneReq==true){
          if (value == "") {
            callback(new Error('经办人电话'));
          } else if (!this.isCellPhone(value)) {
            callback(new Error('不是完整的11位手机号，或前7位格式不正确'));
          } else {
            callback();
          }
        }else {
          callback();
        }

      };
      var validatepasserEmail = (rule, value, callback) => {
        if (value == "") {
          callback(new Error('经办人邮箱'));
        } else if (!this.emailFunc(value)) {
          callback(new Error('邮箱格式不正确'));
        } else {
          callback();
        }
      };
      var validatepasserId = (rule, value, callback) => {
        if(this.myInfoForm.duserType == 1 ){
          if (value == "") {
            callback(new Error('经办人身份证号'));
          } else if (!this.IdCardFunc(value)) {
            callback(new Error('身份证格式不正确'));
          } else {
            callback();
          }
        } else {
          callback();
        }

      };
      var validateorgName = (rule, value, callback) => {
        if (this.orgNameShow==true&&value == "") {
          callback(new Error('您的组织机构名称'));
        }  else {
          callback();
        }
      };
      var validateorgNameSelect = (rule, value, callback) => {
        if (this.orgNameShowSelect==true&&value === "") {
          callback(new Error('您的组织机构名称'));
        }  else {
          callback();
        }
      };
      return {
        orgStatus:'', //用户组织机构信息状态
        orgStatusPath:'', //用户组织机构信息状态所对应的路径
        auditUserOrgStatus:'',//判断当前用户是否已被锁定无法填写组织机构信息,code为0表示未被锁定,code为1表示已被锁定
        time:'',//用户锁定剩余的时间
        gonghanShow: true,
        countryShow: false,
        orgCodeShow: true,
        passerOrgShow: true,
        passerIdShow: true,
        azwOrgCodeShow: false,
        orgNameShow: true,
        orgNameShowSelect: false,
        passerPhoneReq: true,
        userId: '',
        orgNameList: [],
        countryList: [],
        fileList: [],
        count:'',//校验不通过，剩余次数
        fileData: {
          tableName: 'two',
          tableKey: 'photo',
          tableUuid: '',
          fileType: 'application/pdf',
        },
        myInfoForm: {
            // 用户名
            loginname: '',
            // 密码
            password: '',
          id: '',
          duserType: '1',
          country: '',
          orgName: '',
          orgCode: '',
          passerOrg: '',
          passerId: '',
          azwOrgCodeFlag: '0',
          passerName: '',
          passerEmail: '',
          passerPhone: '',
          azwOrgCode: '',
          orgEmail: ''

        },
        myInfoFormRules: {
            // 用户名
            loginname: [
                { required: true, trigger: 'blur', validator: loginnameVali}
            ],
            // 密码
            password: [
                { required: true, trigger: 'blur', validator: passwordVali}
            ],
          country: [
            {validator: validateCountry, trigger: 'blur', required: true,}
          ],
          orgName: [
            {validator: validateorgName,required: true, trigger: 'change'},
          ],
          orgNameSelect: [
            {validator: validateorgNameSelect,required: true,  trigger: 'blur'},
          ],
          orgCode: [
            {validator: validateorgCode, trigger: 'blur', required: true,}
          ],
          passerOrg: [
            {validator: validatepasserOrg, trigger: 'blur', required: true,}
          ],
          passerId: [
            {validator: validatepasserId, trigger: 'blur', required: true,}
          ],
          passerName: [
            {required: true, message: '经办人姓名', trigger: 'blur'},
          ],
          passerEmail: [
            {validator: validatepasserEmail, required: true, trigger: 'blur'},
          ],
          passerPhone: [
            {validator: validatepasserPhone, trigger: 'blur'},
          ],
          azwOrgCode: [
            {validator: validateazwOrgCode, trigger: 'blur', required: true,}
          ],
          orgEmail: [
            {validator: validateazwOrgEmail, trigger: 'blur', required: true,}
          ],

        }
      };


    },
    computed: {
      // language() {
      //   return this.$store.getters.language
      // }
    },
    created() {
      this.auditUserOrgStatusFun()
      this.auditOrgInfo()
      this.gerUserId()
      this.handleLoad()
      this.getCountryList()
    },
    methods: {

      openNewUrl(x){
        this.$router.push({
          path:x
        })
      },
      //判断当前用户是否已被锁定无法填写组织机构信息,code为0表示未被锁定,code为1表示已被锁定
      auditUserOrgStatusFun(){
        this.$axios.get(this.api.api_person.auditUserOrgStatus, {})
          .then((response) => {
            if (response.data.code == '0') {
              this.auditUserOrgStatus='0'
            } else if (response.data.code == '1')  {
              this.auditUserOrgStatus='1'
              this.time=response.data.time
            }
          })
          .catch((error) => {
          });
      },
      //查询用户组织机构状态
      auditOrgInfo(path){
        this.auditUserOrgStatusFun()
        this.$axios.get(this.api.api_person.GETPersonAuditOrgInfo, {})
          .then((response) => {
            // this.orgStatus = 'no'
            // this.orgStatusPath = '/checkRefuse'
            if (response.data.code == '0') {
              this.orgStatus = response.data.status
              if (response.data.status == 'empty') {
                //empty表示用户还未完善组织机构信息
                if(this.auditUserOrgStatus=='0'){
                  this.orgStatusPath = '/cn/myinfoempty'
                  this.openNewUrl('/cn/myinfoempty')
                } else if(this.auditUserOrgStatus=='1'){
                  this.orgStatusPath = '/cn/locking'
                  this.$router.push({
                    name:'cnlocking',
                    params:{
                      time:this.time
                    }
                  })
                }


              } else if (response.data.status == 'blacklist') {
                //blacklist表示用户已被拉入黑名单


                    if(this.auditUserOrgStatus=='0'){
                      this.orgStatusPath = '/cn/blackList'
                      this.openNewUrl('/cn/blackList')
                    } else if(this.auditUserOrgStatus=='1'){
                      this.orgStatusPath = '/cn/locking'
                      this.$router.push({
                        name:'cnlocking',
                        params:{
                          time:this.time
                        }
                      })
                    }


                  } else if (response.data.status == 'init') {

                    if(this.auditUserOrgStatus=='0'){
                      this.orgStatusPath = '/cn/checkDuring'
                      this.openNewUrl('/cn/checkDuring')
                    } else if(this.auditUserOrgStatus=='1'){
                      this.orgStatusPath = '/cn/locking'
                      this.$router.push({
                        name:'cnlocking',
                        params:{
                          time:this.time
                        }
                      })
                    }
                    //init表示审核中


              } else if (response.data.status == 'yes') {
                //yes表示审核已通

              } else if (response.data.status == 'no') {
                if(this.auditUserOrgStatus=='0'){
                  this.orgStatusPath = '/cn/checkRefuse'
                  this.openNewUrl('/cn/checkRefuse')
                } else if(this.auditUserOrgStatus=='1'){
                  this.orgStatusPath = '/cn/locking'
                  this.$router.push({
                    name:'cnlocking',
                    params:{
                      time:this.time
                    }
                  })
                }
                //no表示审核拒绝

              } else {

              }
            } else {
            }
          })
          .catch((error) => {
          });
      },



      getCountryList(){
        this.$axios.get(this.api.api_person.dirAllRegions, {})
          .then((response) => {
            if (response.data.code == '0') {
              this.countryList=response.data.data
            } else {
            }
          })
          .catch((error) => {
          });
      },
      //获取用户userId
      gerUserId() {
        if (localStorage.getItem('userId') != '') {
          this.userId = localStorage.getItem('userId')
        } else {
          this.$axios.get(this.api.api_base.GETInfo, {})
            .then((response) => {
              if (response.data.code == '0') {
                localStorage.setItem("userId", response.data.userId);
                this.userId = response.data.userId
              } else {
              }
            })
            .catch((error) => {
            });
        }
      },
      //加载文件
      handleLoad() {
        this.$axios({
          url: this.api.api_eventdeclartion.load,
          method: 'get',
          params: {
            tableName: 'two',
            tableKey: 'photo',
            tableUuid: this.userId
          },
        }).then((response) => {
          if (response.status == '200') {
            this.fileList = []
            var fileListObj = JSON.parse(response.data.data).list
            fileListObj.map((item) => {
              this.fileList.push({
                name: item.filename,
                url: item.fileurl,
                uuid: item.uuid
              })
            })

          }
        })
          .catch((error) => {
          });

      },


      //校验手机号
      isCellPhone(val) {
        if (!(/^[1](([3][0-9])|([4][5,7,9])|([5][0-9])|([6][6])|([7][0,1,3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}$/.test(val))) {
          return false;
        } else {
          return true;
        }
      },

      //校验邮箱
      emailFunc(val) {
        if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val))) {
          return false;
        } else {
          return true;
        }
      },

      //校验身份证
      IdCardFunc(val) {
        if (!isValidate18Idcard(val)) {
          return false;
        } else {
          return true;
        }
      },


      //中国与非中国单选框事件
      changeCountryRadio(value) {
        this.myInfoForm.duserType = value
        if (value == 1) {
          this.passerPhoneReq=true
          this.gonghanShow = true
          this.countryShow = false
          this.orgCodeShow = true
          this.passerOrgShow = true
          this.passerIdShow = true
          this.myInfoForm.country = ''
        } else {
          this.passerPhoneReq=false
          this.gonghanShow = false
          this.countryShow = true
          this.orgCodeShow = false
          this.passerOrgShow = false
          this.passerIdShow = false
          this.myInfoForm.orgCode = ''
          this.myInfoForm.passerOrg = ''
          this.myInfoForm.passerId = ''
        }
      },

      //奥组委发码机构
      changeazwOrgCodeFlag(val) {
        this.myInfoForm.azwOrgCodeFlag = val
        if (val == 1) {
          this.azwOrgCodeShow = true
          this.orgNameShow = false
          this.orgNameShowSelect = true
          this.myInfoForm.orgName = ''
        } else {
          this.azwOrgCodeShow = false
          this.myInfoForm.azwOrgCode = ''
          this.myInfoForm.orgName = ''
          this.myInfoForm.orgEmail = ''
          this.orgNameList = []
          this.orgNameShow = true
          this.orgNameShowSelect = false
        }
      },

          //获取奥组委发码机构代码
          getAzwfmOrgInfoList() {
            this.orgNameList = []
            this.myInfoForm.orgName = ''
            if(this.myInfoForm.azwOrgCode==null){
              this.myInfoForm.azwOrgCode=''
            }
            this.$axios({
              url: this.api.api_person.dirAzwfmOrgInfo,
              method: 'get',
              params: {
                azwOrgCode: this.myInfoForm.azwOrgCode
              }
            })
              .then((response) => {
                if (response.data.code == '0') {
                  this.orgNameList = response.data.data
                }
              })
              .catch((error) => {
              });

      },

      //校验奥组委发码机构代码
      getAuditAzwfmOrgInfo() {
        let flag=true
        this.$refs['myInfoForm'].validateField('azwOrgCode',(valid)=>{
          if (valid!='')
            flag=false
        })
        this.$refs['myInfoForm'].validateField('orgEmail',(valid)=>{
          if (valid!='')
            flag=false
        })
        this.$refs['myInfoForm'].validateField('orgName',(valid)=>{
          if (valid!='')
            flag=false
        })
        if(this.myInfoForm.orgName==''){
          this.$message.error('您的组织机构名称')

        }
        if(flag){
            if (this.myInfoForm.azwOrgCode != '' && this.myInfoForm.orgEmail != '' && this.myInfoForm.orgName != '') {
              this.$axios({
                url: this.api.api_person.auditAzwfmOrgInfo,
                method: 'get',
                params: {
                  azwOrgCode: this.myInfoForm.azwOrgCode,
                  orgEmail: this.myInfoForm.orgEmail,
                  orgName: this.myInfoForm.orgName
                }
              })

                .then((response) => {
                  if (response.data.code == '0') {
                    this.$message.success('您的奥组委发码校验通过')
                    if(this.gonghanShow==true){
                      if (this.fileList.length == '1') {
                        this.saveVadilate()
                      } else{
                        this.$message.error('请上传公函')
                      }
                    } else {
                      this.saveVadilate()
                    }


                  } else if (response.data.code == '1') {
                    this.count=response.data.count
                    var messageLock='您的奥组委发码校验不通过'+','+'剩余次数为'+':'+this.count
                    this.$message({
                      message: messageLock,
                      type: 'error'
                    })
                  } else if (response.data.code == '2') {
                    this.$message.error('已锁定')
                    this.$router.push({
                      name:'cnlocking',
                    })
                  }else if (response.data.code == '3') {
                    this.$message.error('此奥组委发码机构已使用')
                  }
                })
                .catch((error) => {
                });
            } else {
              this.$refs['myInfoForm'].validate((valid) => {
                if (valid) {
                }
              })
            }
        }
      },


      //切换语言
      // handleSetLanguage(lang) {
      //   this.$i18n.locale = lang
      //   // this.$store.dispatch('setLanguage', lang)
      //   this.$refs['myInfoForm'].clearValidate();
      // },
      handleChange(file, fileList) {
      },
      beforeRemove(file, fileList) {
        if (file && file.status === 'success') {
          this.$confirm('此操作将删除当前文件,是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.asyncReq(file, fileList)//在这里真正的处理图片列表
          }).catch(() => {
            this.$message({
              type: 'success',
              message: '已取消删除'
            });
          });
          return false;//这是重点,不管上面的操作结果如何都返回false
        }

      },
      asyncReq(file, fileList) {
        this.$axios({
          url: this.api.api_eventdeclartion.del + '?ids=' + file.uuid,
          method: 'post',
        }).then((response) => {
          if (response.status == '200') {
            if (response.data.code == '0') {
              this.$message.success('删除成功')
              this.fileList.forEach((item, index) => {
                if (file.uuid == item.uuid) {
                  this.fileList.splice(index, 1);
                }
              });
              return true
            } else {
            }
          } else {
          }
        })
          .catch((error) => {
            fileList = this.fileList
          });
      },
      handleRemove(file, fileList) {
      },

      //下载文件
      handleDownload(file) {
        var ourl = this.api.api_eventdeclartion.download + '?uid=' + file.uuid + '&mod=2'
        this.$axios({
          url: this.api.api_eventdeclartion.download + '?uid=' + file.uuid + '&mod=2',
          method: 'get',
          responseType: 'blob',
        }).then((response) => {
          if (response.status == '200') {
            var aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = ourl;
            document.body.appendChild(aLink)
            aLink.click()
          }
        })
          .catch((error) => {
          });

      },
      handleExceed(files, fileList) {
        this.$message.error('当前限制上传 1 个文件')
      },
      beforeAvatarUpload(file) {
        this.fileData.tableUuid = this.userId
        const isLt10M = file.size / 1024 / 1024 < 10;
        let types = ['application/pdf', 'application/ofd'];
        const isImage = types.includes(file.type);
        if (!isImage) {
          this.$message.error('请选择PDF或OFD格式文件')
        }
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!')
        }
        return isImage && isLt10M;
      },
      handleAvatarSuccess(response, file, fileList) {
        if (response.code == '0') {
          let tempUploadList = {
            name: response.data.fileName,
            fileSize: response.data.fileSize,
            uuid: response.data.uuid
          }
          this.fileList.push(tempUploadList)
          this.$message.success('上传成功')
        } else {
          fileList.pop()
          this.$message.error('上传失败')
        }
      },


      //加载文件
      saveVadilate() {
        this.$refs['myInfoForm'].validate((valid) => {
          if (valid) {

            if (this.myInfoForm.duserType == '1') {
              //中国大陆用户
              this.$axios({
                url: this.api.api_person.SaveOrgInfo,
                method: 'post',
                data: {
                  'duserType': this.myInfoForm.duserType,
                  'orgName': this.myInfoForm.orgName,
                  'orgCode': this.myInfoForm.orgCode,
                  'orgEmail': this.myInfoForm.orgEmail,
                  'passerOrg': this.myInfoForm.passerOrg,
                  'passerId': this.myInfoForm.passerId,
                  'azwOrgCodeFlag': this.myInfoForm.azwOrgCodeFlag,
                  'azwOrgCode': this.myInfoForm.azwOrgCode,
                  'passerName': this.myInfoForm.passerName,
                  'passerEmail': this.myInfoForm.passerEmail,
                  'passerPhone': this.myInfoForm.passerPhone,
                }
              }).then((response) => {
                if (response.data.msg == 'success' && response.data.code == '0') {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.push({path: '/cn/checkDuring'})
                } else {
                }
              })
                .catch((error) => {
                });
            } else {
              this.$axios({
                url: this.api.api_person.SaveOrgInfo,
                method: 'post',
                data: {
                  'duserType': this.myInfoForm.duserType,
                  'country': this.myInfoForm.country,
                  'orgName': this.myInfoForm.orgName,
                  'orgEmail': this.myInfoForm.orgEmail,
                  'passerId': this.myInfoForm.passerId,
                  'azwOrgCodeFlag': this.myInfoForm.azwOrgCodeFlag,
                  'azwOrgCode': this.myInfoForm.azwOrgCode,
                  'passerName': this.myInfoForm.passerName,
                  'passerEmail': this.myInfoForm.passerEmail,
                  'passerPhone': this.myInfoForm.passerPhone,
                }
              }).then((response) => {
                if (response.data.msg == 'success' && response.data.code == '0') {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.push({path: '/cn/checkDuring'})
                } else {
                }
              })
                .catch((error) => {
                });
            }
          } else {
            return false;
          }
        });
      },

      //保存用户组织机构 empty用户
      saveOrgInfo() {
        if (this.myInfoForm.azwOrgCodeFlag == '1') {
          this.getAuditAzwfmOrgInfo()
        } else {
          if(this.gonghanShow==true){
            if (this.fileList.length == '1') {
              this.saveVadilate()
            } else{
              this.$message.error('请上传公函')
            }
          } else {
            if(this.myInfoForm.duserType=='2'){
              this.saveVadilate()
            }
          }

        }


      },
    }
  }
</script>

<style scoped>
  .event_top {
    background-color: transparent;
    border-style: none;
    color: #999999;
    font-weight: bolder;
    float: left;
    margin-top: 15px;
  }

  .el-form-item .el-form-item__label {
    color: #000000 !important;
  }

  .el-select {
    width: 70%;
  }

  .el-input {
    width: 70%;
  }

  .el-cascader {
    width: 70%;
  }

  label {
    color: #000;
  }

  .el-form-item {
    margin-top: 25px;
    margin-bottom: 25px;
  }
  #gonghan:before{
    content:'*';
    color: #F56C6C;
    margin-right: 4px;
  }
  #gonghan{
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    float: left;
    line-height: 14px;
    padding-top: 10px;
    margin-right: 30px;
    margin-left: -50px;
  }

</style>
