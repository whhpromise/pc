<template>
    <div :style="win" >
            <div class="passBox">
                <div class="passHeader">
                    <h3>添加</h3>
                    <span>X</span>
                </div>
                <div class="passCont">
                    <p>
                        <span>用户名:</span>
                        <input type="text" ref="username" disabled=disabled/>
                    </p>
                    <p>
                        <span>姓名:</span>
                        <input type="text" ref="truename"/>
                    </p>
                    <p>
                        <span>手机:</span>
                        <input type="text" ref="phone"/>
                    </p>
                    <p>
                        <span>权限选择:</span>
                        <select ref="power">
                             <option value="0">系统管理员</option>
                             <option value="1">课程管理员</option>
                        </select>
                    </p>
                    <p>
                        <button  @click="sure">确定</button>
                        <button @click="cancel" style="width:100px;height:34px;background:#abcdef">取消</button>
                    </p>
                </div>
            </div>
            
    </div>
</template>

<script>
import Axios from "axios"
import crypto from 'crypto'
export default {
  props:['addauth',"token",'info'],
  data() {
    return {
      win: {
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
        background: "rgba(255,255,255,0.6)",
        position: "absolute",
        zIndex: 999,
        left: 0,
        top: 0
      },
      isShow:false,
      cleartoken:""
    }
   
  },
  methods: {
    cancel(){
       this.$emit("receve",this.isShow)
    },
    sure(){
      console.log(this.info)
      this.$emit("clear",this.cleartoken)
      // this.$refs.username.value=this.info.username
      Axios({
        url:this.token?'Handler/AdminRegHandler?action=update':'Handler/AdminRegHandler?action=add',
        method:"post",
        data:{
          userName:this.$refs.username.value,
          truename:this.$refs.truename.value,
          phone:this.$refs.phone.value,
          password:"123456",
          power:this.$refs.power.value
        }
      }).then(res=>{
        if(res.data.success){
           this.token=""
           this.addauth()
           this.cancel()
        }
          
      })

    }
  },  

  mounted() {
    if(this.token){
      this.$refs.username.value=this.info.username
      this.$refs.truename.value=this.info.truename
      this.$refs.phone.value=this.info.phone
      this.info.tokenId=""
    }else{
      this.$refs.username.value=""
      this.$refs.truename.value=""
      this.$refs.phone.value=""
    }
     
  }
};
</script>

<style scoped>
.passBox {
  width: 390px;
  height: 260px;
  background: #fff;
  margin: 200px auto;
  border: 8px solid #4e66b3;
}
.passHeader {
  height: 30px;
  background: #4e66b3;
  font-size: 14px;
  color: #fff;
}
.passHeader span {
  float: right;
  margin-top: -15px;
}
.passCont {
  padding: 30px 23px;
}
.passCont p {
  line-height: 40px;
}
.passCont p span {
  text-align: right;
  display: inline-block;
  width: 100px;
}
.passCont p input {
  line-height: 23px;
  width: 190px;
}
.passCont p button {
  width: 100px;
  height: 34px;
  border: none;
  margin-left: 50px;
  outline: none;
}
</style>
