<template>
  <!--  <div class="top">-->
  <!--    <img src="./img/header.png" alt="">-->
  <!--    <div class="tipWarp">-->
  <!--&lt;!&ndash;      <span class="wel">欢迎 {{this.$store.state.userName}} </span>&ndash;&gt;-->
  <!--      <span class="wel">欢迎 </span>-->
  <!--      <span class="tuichu" @click="tuichu" >退出</span>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="header" style="padding: 0;overflow: hidden;height: 100px;position: relative;">
    <div class="wrapper-left" style="margin-left: 20px;">
      <div class="header-logo">
        <img src="./img/logo.png">
      </div>
      <div class="wrapper-content1" style="width: 420px">
        <p class="title-top" id="title-top"> 全国一体化在线政务服务平台

<!--          {{$t('mainContent.quanguoyitihua')}}-->
        </p>
        <p class="title-bottom" id="title-bottom">
          冬奥会无线电频率申请平台
<!--          {{$t('mainContent.dongaohuiwuxian')}}-->
        </p>
      </div>
    </div>
    <div style='float: right;top: 15%;margin-right: 100px;position: relative;z-index: 999'>
        <el-button  type="text"  class="event_top" :disabled="languageChange === 'cn'|| !languageChange"
                    @click="handleSetLanguage('cn')">
          CN
        </el-button>
        <el-button type="text"  class="event_top" :disabled="languageChange === 'en'"
                   @click="handleSetLanguage('en')">
          EN
        </el-button>
<!--        <el-button type="text"  class="event_top" :disabled="languageChange === 'fr'"-->
<!--                   @click="handleSetLanguage('fr')">-->
<!--          FR-->
<!--        </el-button>-->
    </div>
    <div class="wrapper-right" style="position:absolute;top: 25%;right: 15px;">

      <div v-if="isOuter" @click="tips">

      </div>
      <div v-else-if="userObj">
        <a target="_self" style="font-size: 14px;line-height: 30px;cursor: pointer" 
          @click="logoutClick" >
          注册
        </a>

        <span class="wel" style=" font-size: 14px;line-height: 30px;">欢迎您， {{ this.userObj }} </span>
        <a target="_self" style="font-size: 14px;line-height: 30px;cursor: pointer" 
          @click="tuichu" >
          <i class="el-icon-switch-button"></i> 退出
          <i class="fa-arrows0"></i>
        </a>
         
      </div>
      <div class="a" style="cursor: pointer" v-else @click="login()">
        <a target="_self" class="wel" style="font-size: 14px;line-height: 30px;margin-right: 45px;"> 登录 </a>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCookies from 'vue-cookies'
  import Bus from '@/Bus/Bus.js'
  import moment from 'moment'
  import {GetQueryString} from "../../utils/utils";
  export default {
    name: 'myHeader',
    data () {
      return {
        isOuter:false,
        msg: '',
        userObj:'',
        // 控制语言切换的disabled, cn is set default
        languageChange: 'cn',
      }
    },
    computed: {
      // language() {
      //   return this.$store.getters.language
      // }
    },
    // mounted() {
    //   console.log('params', this.$route)
    // },
    created() {

      this.languageChange = window.sessionStorage.getItem('language')
      this.userObj= localStorage.getItem('user')
      this.$axios.get(this.api.api_base.GETInfo, {})
        .then((response) => {
          if(response.data.code == '0'){
            this.$store.state.userName = response.data.realName;
            this.$store.state.userId = response.data.userId;
            if(response.data.realName==null||response.data.realName==''){
              this.userObj = response.data.loginName;
              localStorage.setItem("user", response.data.loginName);
            } else {
              this.userObj = response.data.realName;
              localStorage.setItem("user", response.data.realName);
            }
            localStorage.setItem("user", response.data.realName);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem('IsLogin','1');
          }else {
            this.userObj=''
            localStorage.setItem("user", '');
            localStorage.setItem('IsLogin','登录异常');
          }
        })
        .catch((error) => {
        });
      var cssSsoTicket = GetQueryString("cssSsoTicket");
      if(cssSsoTicket){
        this.$axios.get(this.api.api_base.GETInfo+'?cssSsoTicket='+cssSsoTicket,{})
          .then((response)=>{
            if(response.data.code == '0'){
              this.$store.state.userName = response.data.realName;
              this.$store.state.userId = response.data.userId;
              if(response.data.realName==null||response.data.realName==''){
                this.userObj = response.data.loginName;
                localStorage.setItem("user", response.data.loginName);
              } else {
                this.userObj = response.data.realName;
                localStorage.setItem("user", response.data.realName);
              }
              localStorage.setItem("loginName", response.data.loginName);
              localStorage.setItem("userId", response.data.userId);
              localStorage.setItem("cssSsoTicket", cssSsoTicket);
              localStorage.setItem('IsLogin','1');
              history.pushState('', '', window.location.href.split('?')[0]);
              Bus.$emit('getUserObj',response.data.realName);
            }else {
              localStorage.setItem('IsLogin','登录失败');
              this.$store.state.alertFlag
            }
          })
          .catch((error)=>{
            localStorage.setItem('IsLogin','登录异常');
            this.$store.state.alertFlag
          });
      }else{
        if(localStorage.getItem('IsLogin')=='1'){
          this.$axios.get(this.api.api_base.GETInfo,{})
            .then((response)=>{
              if(response.data.code == '0'){
                this.$store.state.userName = response.data.realName;
                this.$store.state.userId = response.data.userId;
                if(response.data.realName==null||response.data.realName==''){
                  this.userObj = response.data.loginName;
                  localStorage.setItem("user", response.data.loginName);
                } else {
                  this.userObj = response.data.realName;
                  localStorage.setItem("user", response.data.realName);
                }
                localStorage.setItem('IsLogin','1');
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("user", response.data.realName);
                localStorage.setItem("loginName", response.data.loginName);
                history.pushState('', '', window.location.href.split('?')[0]);
                Bus.$emit('getUserObj',response.data.realName);
              }else {
                this.userObj=''
                localStorage.setItem("user", '');
                localStorage.setItem("loginName", '');
                localStorage.setItem('IsLogin','登录异常');
              }
            })
            .catch((error)=>{
              localStorage.setItem('IsLogin','登录异常');
              this.$store.state.alertFlag;
            });
        }

        //
      }
    },
    // created(){
    //   // this.getUsername();
    //   this.userObj= localStorage.getItem('user')
    //   Bus.$on('getUserObj',(obj)=>{
    //     this.userObj= obj
    //   });
    // },
    mounted() {
      console.log('paramsHeaderc', this.$route)
    },
    methods:{

      handleSetLanguage(lang) {

        // this.$i18n.locale = lang
        // this.$store.dispatch('setLanguage', lang)
        window.sessionStorage.setItem('language', lang)


      //  刷新页面，并且跳回到主页面
        // console.log('headerLang', this.$route.path.split('/'))
        // let url = this.$route.path.split('/').slice(2).join('/')
        // console.log('url', url)
        // const newHref = this.$router.resolve({
        //   path:`/${lang}/${url}`
        // })
        // console.log('path', `/${lang}/${url}`)

        // window.open(newHref.href,"_self")
        // location.replace(`/${lang}/${url}`)

        location.reload()

      },
      reload(){
        var currenturl = window.location.href;
        var newUrl = currenturl.split("?")[0];
        history.pushState("", "", newUrl); //前两个参数可省略
      },
      getUsername(){
        this.$axios.get(this.api.api_base.GETInfo, {})
          .then((response) => {
            this.$store.state.userName = response.data.realName;

          })
          .catch((error) => {
          });
      },
      logoClick(){
        this.navigate('/',{
            label:'首页',
            key:'/,首页,1'
          }
        )
      },
      login( ) {
        let retCode = 0
        this.$axios.get(this.api.api_base.GETInfo, {})
          .then((response) => {
            if (response.data.code == '401') {
              window.open(response.data.redirectUrl, "_self");
            }
          })
          .catch((error) => {
            localStorage.setItem('IsLogin', '获取登录地址异常');
            this.$store.state.alertFlag
          })

      },
      logoutClick() {
        console.log('logoutchick');
        this.$router.push('/logout')
      },
      tuichu(){
        this.$axios.get(this.api.api_base.GETLogout,{})
          .then((response)=>{
            localStorage.clear();
            sessionStorage.clear()
            this.$store.state.tabsStack = [];
            // window.open(response.data.toUrl,"_self");
            if(response.data.toUrl&&response.data.code=='0'){
              localStorage.clear();
              sessionStorage.clear()
              this.$store.state.tabsStack = [];
              // this.$router.go(0)
              this.userObj=''
              this.$router.push({
                path:'/home'
              })
            }
          })
          .catch((error)=>{
            this.$message('退出失败!!!');
          });

      }

    }
  }
</script>

<style lang="less" scoped>
  .top{
    position: relative;
    .tipWarp{
      position: absolute;
      right: 20px;
      bottom: 15px;
      font-size: 14px;
      color: #fff;
      .tuichu{
        cursor: pointer;
      }
    }
    img{
      display: block;
      width: 100%;
      font-size: 20px;
    }
  }

  .header {
    width: 100%;
    background-repeat-x: repeat;
    background: url(./img/bg_top.png);
    overflow: hidden;
  }
  .header .wrapper-left {
    float: left; }
  .header .header-logo {
    display: inline-block;
    line-height: 80px; }
  .header .header-logo img {
    width: 60px;
    vertical-align: middle; }
  .header .wrapper-content1 {
    display: inline-block;
    color: #fff;
    vertical-align: middle;
    margin-left: 5px;
    width: 320px; }
  .header .wrapper-content1 .title-top {
    font-size: 12px;
    margin-bottom: 2px;
    text-align-last: justify; }
  .header .wrapper-content1 .title-bottom {
    font-size: 20px;
    font-weight: 700;
    text-align-last: justify;
  }
  .header .wrapper-center {
    float: left;
    color: #fff;
    margin-left: 30px;
    margin-top: 40px; }
  .header .wrapper-center ul > li {
    list-style: none;
    float: left;
    padding: 2px 14px;
    cursor: pointer; }
  .header .wrapper-center ul > li > a {
    color: #ffffff }
  .header .wrapper-center .li-selected {
    color: #008cff;
    background: #fff;
    border-radius: 4px; }
  .header .wrapper-center .li-selected a{
    color: #008cff;
  }
  .header .wrapper-right {
    float: right;
    /*margin-right: 40px;*/
    padding-top: 42px; }
  .header .wrapper-right .Welcome {
    float: left;
    /*width: auto;*/
    padding: 0 10px; }
  .header .wrapper-right a {
    text-decoration: none;
    color: #fff;
    font-size: 12px;
    display: inline-block;
    width: 100px;
    letter-spacing: 1px; }
  .header .wrapper-right span {
    color: #fff;
    font-size: 12px;
    display: inline-block;
    letter-spacing: 1px; }
  .header .wrapper-right .user-login:after {
    content: "|";
    padding-left: 12px; }
  .header .wrapper-right .user-register {
    margin-left: 8px; }
  .el-button--text{
    color: #fff;
  }
  .el-button.is-disabled{
    color: #C0C4CC!important;
    font-size: 16px;
  }
</style>
