<template>
  <div class="wrap">
     <!-- <canvas id="canvas"></canvas> -->
       <div class="box">
            <div class="title clear">
                <div class="title_left lt">
                  <img src="../../static/img/lo.png" alt="">
                </div>
                <div class="title_right lt">
                  <p class="p1">翡翠学院后台</p>
                  <p class="p2">the sysmaster ficuischool</p>
                </div>    
            </div>
            <div class="text">
               <div class="in1 in">
                  <div class="img1 img lt"></div>
                  <input type="text" placeholder="用户名" ref="username">
               </div>
               <div class="in2 in">
                 <div class="img2 img lt"></div>
                 <input type="text" placeholder="密码" ref="password">
               </div>
               <div class="in3 in">
                 <div class="img3 img lt"></div>
                 <input type="text" ref="code">
               </div>
                <div class="yzm rt"><Vcode></Vcode></div>
            </div>
            <div class="btn">
                <button class="btn1 lt">
                  <a href="">忘记密码?</a>
                </button>
                <button class="btn2 rt" @click="login">登录</button>
                <button class="btn2 rt zc">注册</button>
            </div>
       </div> 
  </div>
</template>

<script>
import Axios from 'axios';
import Vcode from './code'
import bg_canvas from './bg_canvas'
export default {
  name: 'login',
  components:{Vcode},
  data () {
    return {
      username:"",
      password:"",
      code:""
    }
  },
  methods:{
      login(){
        Axios({
            url:"Handler/AdminLoginHandler?action=checkveri",
            method:"get",
            params:{
            veri:this.$refs.code.value
            }
        }).then(res=>{
             console.log(res.data.success)
            if(res.data.success){
                console.log(this.$refs.code.value.length)
                if(this.$refs.code.value.length>0){
                      if(res.data.success == "校验成功"){
                          this.nextLogin()
                       }else{alert("验证码输入不正确")} 
                }else{alert("验证码不能为空")}
            }
        })
      },
      nextLogin(){
          
          Axios({
            url:"Handler/AdminRegHandler?action=login",
            method:"post",
            data:{
               userName:this.$refs.username.value,
                password:this.$refs.password.value
            }
        }).then(res=>{
            if(res.data.success){
                console.log(res.data.success)
                alert(res.data.success)
                this.$router.push("list")
            }else if(res.data.err){
                alert(res.data.err+","+"请注册")
                this.$router.push("zhuce")
            }
        })
           
      },
    //   showmsg(data){
    //       console.log(data+"我是传值")
    //   }
  }
}
</script>

<style scoped>
.box .text input{
  color: white;
}
.wrap{
width: 100%;
height: 100vh;
overflow: hidden;
background: #0c1a4e;
}
.box{
    width: 590px;
    height: 345px;
    margin: 100px auto;
    padding: 20px 40px;
    box-sizing:border-box;
}
.box .title{
    width: 100%;
    color: white;
}
.box .title_left{
    width: 30%;
    text-align: right;
    margin-right: 5px;
}
.box .title_left img{
   width: 50px;
   height: 50px;
}
.box .title_rigth{
    width: 58%;
    text-align: left;
}
.box .title .p1{
    font-size: 24px;
}
.box .text{
    /* text-align: center; */
    padding: 20px 0px;
    margin-left: 25px;
    position: relative;
}
.box .text .in{
    width: 455px;
    height: 35px;
    border: solid 1px #324a81;
    margin-top: 25px;
}
.box .text .in input{
    width: 80%;
    height: 70%;
    border: 0;
    padding-left: 15px;
    margin-top: 5px;;
    background: transparent;
    outline:none;
    cursor: pointer;
}
.box .text .in .img1{
    width: 35px;
    height: 35px;
    background: url('../../static/img/username.png') no-repeat center;
    background-size: 70% 70%;
    border-right: solid 1px #324a81;
}
.box .text .in .img2{
    width: 35px;
    height: 35px;
    background: url('../../static/img/password.png') no-repeat center;
    background-size: 70% 70%;
    border-right: solid 1px #324a81;
}
.box .text .in.in3{
    width: 340px;
}
.box .text .in .img3{
    width: 35px;
    height: 35px;
    background: url('../../static/img/identifying.png') no-repeat center;
    background-size: 70% 70%;
    border-right: solid 1px #324a81;
}
.box .yzm{
    width: 70px;
    height: 30px;
    /* background: white; */
    position: absolute;
    bottom: 27px;
    right: 58px;
}
.box .btn{
    text-align: center;
    padding: 20px 0px;
}
.box .btn button{
    width: 112px;
    height: 32px;
    border: 0;
    color: white;
    text-align: center;
}
.box .btn .btn1{
    background: #1aafcd;
}
.box .btn .btn1 a{
    color: white;
}
.box .btn .btn2{
    background: #20bb5c;
    margin-right: 10px;
}
.box .btn .btn2.zc{
    background: palevioletred;
}
</style>
