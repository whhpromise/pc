<template>
 <div>
     <Moban></Moban>
   <div class="tabs">
       <div class="inner">
           <div class="tabs_title">
                   <a href="">首页</a>/
                   <a href="">用户管理</a>/
                   <a href="">系统人员</a>
           </div>
           <div class="tabs_seach clear">
               <div class="tabs_title_l lt">
                   <input class="" type="text" placeholder="模糊查找:姓名" v-model="username">
                   <input class="" type="text" placeholder="邮箱" v-model="email">
                   <input class="" type="text" placeholder="手机号" v-model="phone">
                   <button @click="search">查询</button>
               </div>
               <div class="tabs_title_r rt">
                   <button><span class="icon-plus"></span>添加</button>
               </div>           
           </div>

           <!-- tabs_modal -->
           <div class="tabs_modal">
                <div class="modal_title">
                    <span class=" icon-th tt"></span>
                    <span>系统人员列表</span>
                </div>
                <div class="modal_msg">
                   
                    <span class="msg_span w30">姓名</span>
                    <span class="msg_span w13">邮箱</span>
                    <span class="msg_span w13">手机</span>
                    <span class="msg_span w10">学号</span>
                    <span class="msg_span w13">编辑日期</span>
                    <span class="msg_span w13">操作</span>
                </div>
                <div class="modal_list">
                    <ul class="clear" v-for="(item,index) in msg" :key="index">
                        <li class="w30">{{item.username}}</li>
                        <li class="w13">{{item.email}}</li>
                        <li class="w13">{{item.phone}}</li>
                        <li class="w10">{{item.StudentID}}</li>
                        <li class="w13">{{item.updateAt}}</li>
                        <li class="w13"><span class="blue s1">正常</span>&nbsp;&nbsp;&nbsp;<span class="blue s2" @click="Freeze(index,item.tokenId)">冻结</span></li>
                    </ul>
                </div>
                 <div class="modal_menu">
                    <!-- 分页组件   -->
                <div class="block">
                    <span class="demonstration">完整功能</span>
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                    </el-pagination>
                </div>
                 </div>
           </div>
       </div>
   </div>
   <el-button type="text" @click="open4">点击打开 Message Box</el-button>
 </div>   
</template>

<script>
import '../../node_modules/element-ui/lib/theme-chalk/index.css'
import Moban from "./moban"
import Axios from 'axios'
export default {
    components:{Moban},
    data(){
        return{
        username:"",
        phone:"",
        truename:"",
        currentPage: 4,
        pageStart:1,
        username:"",
        phone:"",
        email:"",
        msg:""
        }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      open4() {
        const h = this.$createElement;
        this.$msgbox({
          title: '添加',
          message: h('p', null, [
            h('i', { style: 'color: teal' }, '用户名'),
            h('input'),
            h('br'),
            h('i', { style: 'color: teal' }, '电话'),
            h('input'),
            h('br'),
            h('i', { style: 'color: teal' }, '邮箱'),
            h('input'),
           
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = alert(1)   //点击确定执行的事件
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
      vajax1(){
           Axios({
                url:"Handler/StudentList?action=show",
                method:"get",
                params:{
                 
                  pageStart:this.pageStart,
                  username:this.username,
                  phone:this.phone,
                  email:this.email       
            }
                }).then(res=>{
                  console.log(res)
                   this.msg=res.data.data.list
                //    console.log(this.msg)
            })
      },
      Freeze(a,b){
         console.log(a)
         var inner=document.querySelectorAll(".modal_list .s2")[a].innerHTML
         if(inner=="冻结"){
             document.querySelectorAll(".modal_list .s2")[a].innerHTML="解冻"
             document.querySelectorAll(".modal_list .s2")[a].style.color='red'
             document.querySelectorAll(".modal_list .s1")[a].innerHTML='已冻结'
         }else{
             document.querySelectorAll(".modal_list .s2")[a].innerHTML="冻结"
             document.querySelectorAll(".modal_list .s2")[a].style.color='black'
             document.querySelectorAll(".modal_list .s1")[a].innerHTML='正常' 
         }
         Axios({
             url:"Handler/StudentHandler?action=updateFreeze",
             method:"post",
             data:{
                 tokenId:b,
                 isstate:document.querySelectorAll(".modal_list .s2")[a].innerHTML
             }
         })
      },
      search(){
          this. vajax1()
      }
    },
    mounted(){
       this.vajax1()
    }
}
</script>

<style>
.tabs{
   
}
.tabs .tabs_title{
    padding: 10px 0;
    background: #f7f5f5;
}
.tabs .tabs_seach{
    width: 100%;
    padding: 10px 10px;
    border: solid 1px #d1cfc9;
}
.tabs .tabs_title_l input{
    width: 180px;
    height: 30px;
    text-indent:15px;
}
.tabs .tabs_title_l button{
    width: 80px;
    height: 30px;
    border: 0;
    background: #1fbb5c;
    color: white;
}
.tabs .tabs_title_r button{
    width: 80px;
    height: 30px;
    border: 0;
    background: #1fbb5c;
    color: white;
    margin-right: 10px;
}
/* ---------------tabs_modal----------------------- */
.tabs_modal{
    width: 100%;
    /* height: 360px; */
    border: solid 1px #d1cfc9;
    margin-top: 20px;
}
.modal_title{
    border-bottom: solid 1px #d1cfc9;
}
.modal_title .tt{
    display: inline-block;
    border-right: solid 1px #d1cfc9;
    padding: 5px;
}
.modal_msg{
     border: solid 1px #d1cfc9;
     background: #f1efed;
     font-size: 0;
}
.modal_msg>span{
    display: inline-block;
    border-right:  solid 1px #d1cfc9;
    padding: 5px;
    font-size: 14px;
}
.w10{
    width: 10%;
}
.w13{
    width: 13%;
}
.w30{
    width: 30%;
}
.modal_msg>span:nth-child(6){
    border-right: 0;
} 
.modal_list{
    border-bottom: solid 1px #d1cfc9;
    padding-bottom: 50px; 
}
.modal_list li{
    float: left;
    text-align: left;
    padding: 5px;
    text-indent: 5px;
}
.modal_menu{
    padding: 5px;
}
.modal_menu span{
    display: inline-block;
    margin-right: 5px;
}
/* .modal_menu input{
    width: 40px;
} */
.bor{
    border: solid 1px #d1cfc9;
}
.blue{
    color: blue;
}
</style>
