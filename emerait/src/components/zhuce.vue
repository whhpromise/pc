<template>
    <div>
       用户名：  <input type="text" ref="username">
       姓名：<input type="text" name="truename">
       手机号：<input type="text" name="phone">
       权限选择:<select name="power">
           <option >系统管理员</option>
           <option>课程管理员</option>
       </select>
       <input type="submit" @click="Reg"/>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
  data(){
      return{
      userName:""
      }
  },
 methods:{
      
  Reg(){
      Axios({
          url:"Handler/AdminRegHandler?action=add",
          method:"post",
          data:{
          userName:this.$refs.username.value,
          }
      }).then(res=>{
          if(res.data.success){
              alert(res.data.success)
          }else if(res.data.err){
            alert(res.data.err)
          }
          
      })
  }
 }
}
</script>

<style>

</style>
