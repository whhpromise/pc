<template>
   <div>
        <div class="header clear">
          <div class="inner">
            <div class="header_left lt"><img src="../../static/img/lo2.png" alt=""></div>
            <div class="header_right rt">
                <ul class="clear">
                    <li><span class="icon-twitter">&nbsp;&nbsp;</span>卓新思创</li>
                    <li><span class="icon-comment">&nbsp;&nbsp;</span>在线客服</li>
                    <li><span class="icon-list-alt">&nbsp;&nbsp;</span>常见问题</li>
                    <li @click="show"><span class=" icon-lock">&nbsp;&nbsp;</span>安全中心</li>
                    <li @click="quit"><span class="icon-share">&nbsp;&nbsp;</span>退出</li>
                    <li><span>{{userName}}</span><span class="touxiang"></span></li>
                </ul>
            </div>
          </div>
        </div>
        <div class="nav">
           <div class="inner">
            <ul class="clear nav_ul">
                <router-link to="/tab"><li><span class="icon-twitter">&nbsp;&nbsp;</span>用户管理</li>></router-link>
                <router-link to="/tab2"><li><span class="icon-book">&nbsp;&nbsp;</span>课程管理</li></router-link>
                <li><span class="icon-tasks">&nbsp;&nbsp;</span>统计报表</li>
                <li><span class="icon-folder-close">&nbsp;&nbsp;</span>其他管理</li>
                <li><span class="icon-bookmark">&nbsp;&nbsp;</span>数据字典</li>
                <li><span class="icon-cog">&nbsp;&nbsp;</span>系统维护</li>
            </ul>
        </div>
     </div> 
     <!-- ---------------------------------模态框------------------------------------------- -->
      <div class="modal" v-show="modal">
           <div class="m_con">
               <div class="m_con_title clear">
                   <div class="tl lt">修改密码</div>
                   <div class="tr rt"><span class=" icon-remove" @click="hide"></span></div>
               </div>
                <div class="m_con_input clear">
                      <div class="l lt">
                         <p>*当前密码</p>
                         <p>*新密码</p>
                         <p>*确认密码</p>
                      </div>
                      <div class="r lt">
                          <input type="text" name="" id="" ref="password"><br>
                          <input type="text" name="" id="" ref="newpass"><br>
                          <input type="text" name="" id="" ref="yes"><br>
                      </div>
                </div>
                <div class="btn">
                    <button class="btn1" @click="sure">确定</button>
                    <button class="btn2"  @click="hide">取消</button>
                </div>
           </div>
       </div> 
   </div>
</template>

<script>
import Axios from 'axios';
import crypto from 'crypto'
export default {
  name:"Vheader",
    data(){
      return{
            userName:"", 
            modal:false
      }
  },
  methods:{
    //获取用户信息  
    getInfo(){
       Axios({
            url:"Handler/AdminLoginHandler?action=returninfo",
            method:"get",
          }).then(res=>{
            // console.log(res)
            this.userName=res.data.data.userName
            sessionStorage.setItem("pass",res.data.data.password)
          })
      },
    //   退出
    quit(){
        Axios({
            url:"Handler/AdminLoginHandler?action=quit",
            method:"get",
          }).then(res=>{
            if(res.data.success){
                alert(res.data.success)
                this.$router.push("/")
              }
          })
      },

   //显示模态框
    show(){
        this.modal=true
    },
   //隐藏模态框 
    hide(){
        this.modal=false
    },

    //修改密码
    sure(){
          var oldpwd=this.$refs.password.value
          var md5 = crypto.createHash("md5").update(oldpwd).digest("base64")
          var dbpwd = sessionStorage.getItem("pass")
          var yes = crypto.createHash("md5").update(this.$refs.yes.value).digest("base64")
          var newpass = crypto.createHash("md5").update(this.$refs.newpass.value).digest("base64")
          console.log(md5)
          console.log(dbpwd)
         if(md5===dbpwd){
            if(newpass!==md5) {
               if(yes===newpass){
                    Axios({url:"Handler/AdminRegHandler?action=updatepass", method:"post",                
                        data:{password:this.$refs.password.value,newpass:this.$refs.newpass.value}                            
                    }).then(res=>{
                        if(res.data.successs){
                            alert(res.data.successs+",请重新登录")
                            this.$router.push("/")
                        }
                    })
                }else{ alert("请重新确认密码")}
            }else{ alert("新密码与当前密码一致,请重新输入")}    
        }else{ alert("当前密码输入错误")}   
      
    }
},
    mounted(){
      this.getInfo()
    }
}
</script>

<style>
.header{
    background: #262626;
    color: white;
  
}
.header_right li{
    float: left;
    line-height: 48px;
    margin-right: 30px;
    font-family: "宋体";
    font-size: 12px;
    color: #9f9b95;
    cursor: pointer;
}
.header_left{
   margin-top: 3px;
}
.nav{
    background: #223260;
    padding: 17px 0px;
}
.nav .nav_ul{
    margin-left: 160px;
}
.nav li{
    float: left;
    margin-left: 50px;
    font-family: "宋体";
    font-size: 14px;
    color: white;
    cursor: pointer;
} 
span.touxiang{
    width: 30px;
    height: 30px;
    display: inline-block;
    background: url("../../static/img/tx.png") no-repeat center;
    background-size: 100% 100%;
}
/* -----------------------模态框---------------------------- */

 .modal{
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .4);
    position: fixed; 
    z-index: 9999; 
    left: 0;
    bottom: 0;
}
.modal .m_con{
    width: 480px;
    height: 300px;
    border: solid 5px #4664ad;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    z-index: 999;
    background: white;
    
}
.m_con_title{
    background: #4664ad;
    padding-bottom: 5px;
}
.m_con_input{
    margin: 50px auto;
    padding-left: 94px;
}
.m_con_input .l{
    text-align: right;
}
.m_con_input .r{
    padding-left:5px; 
}
.modal .btn{
    width: 200px;
    margin: 0 auto;
}
.modal .btn1{
    width: 80px;
    height: 30px;
    background: #46c540;
    border: 0;
}
.modal .btn2{
    width: 80px;
    height: 30px;
    background: #4664ad;
    border: 0;
    margin-left: 5px;
}
/* ------------------------模态框2------------------------------------ */

</style>
