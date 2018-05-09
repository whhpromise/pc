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
                   <input type="text" placeholder="模糊查找:姓名" v-model="text">
                   <button @click="search">查询</button>
               </div>
               <div class="tabs_title_r rt">
                   <button @click="add"><span class="icon-plus"></span>添加</button>
               </div>           
           </div>

           <!-- tabs_modal -->
           <div class="tabs_modal">
                <div class="modal_title">
                    <span class=" icon-th tt"></span>
                    <span>系统人员列表</span>
                </div>
                <div class="modal_msg">
                    <span class="msg_span w10">用户名</span>
                    <span class="msg_span w30">姓名</span>
                    <span class="msg_span w13">后台权限</span>
                    <span class="msg_span w13">手机</span>
                    <span class="msg_span w13">编辑日期</span>
                    <span class="msg_span w13">操作</span>
                </div>
                <div class="modal_list">
                    <ul class="clear" v-for="(item,index) in msg" :key="index">
                        <li class="w10">{{item.userName}}</li>
                        <li class="w30">{{item.trueName}}</li>
                        <li class="w13">{{item.power}}</li>
                        <li class="w13">{{item.phone}}</li>
                        <li class="w13">{{item.updateAt}}</li>
                        <li class="w13">
                            <!-- <span class="blue" @click="Edit(item.trueName)">编辑 -->
                              <span class="blue" @click="Edit(item.trueName)">编辑   
                            </span>&nbsp;&nbsp;&nbsp;<span class="blue del" @click="del(item.tokenId)">删除</span>
                        </li>
                    </ul>
                </div>
                 <div class="modal_menu">
                    <span class="bor">&lt;&lt;</span>
                    <span class="bor">&gt;&gt;</span>
                    <span>跳转到第</span>
                    <span><input type="number" value="1"></span>
                    <span>页</span>
                    <span class="bor">Go</span>
                    <span>/共2页[4条]</span>
                    <span class="bor">&lt;&lt;</span>
                    <span class="bor">&gt;&gt;|</span>
                    <span>1-3</span>
                 </div>
               <!-- 分页组件   -->
                 <div class="block">
                    <span class="demonstration"></span>
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3,2,1]"
                    :page-size=2
                    layout="prev,jumper,pager,next,total,sizes"
                    :total="count">
                    </el-pagination>
               </div>

           </div>
       </div>
   </div>
      <!-- ---------------------------------模态框添加用户------------------------------------------- -->
      <div class="modal" v-show="modal">
           <div class="m_con">
               <div class="m_con_title clear">
                   <div class="tl lt">添加用户</div>
                   <div class="tr rt"><span class=" icon-remove" @click="hide"></span></div>
               </div>
                <div class="m_con_input clear">
                      <div class="l lt">
                         <p>用户名</p>
                         <p>姓名</p>
                         <p>手机</p>
                         <p>权限选择</p>
                      </div>
                      <div class="r lt">
                          <input type="text"  v-model="username" value="username"><br>
                          <input type="text"  v-model="truename"><br>
                          <input type="text"  v-model="phone"><br>
                          <select  v-model="power">
                                    <option value="0">系统管理员</option>
                                    <option value="1">课程管理员</option>
                         </select>
                      </div>
                </div>
                <div class="btn">
                    <button class="btn1" @click="Reg">确定</button>
                    <button class="btn2"  @click="hide">取消</button>
                </div>
           </div>
       </div>  
     <!-- ---------------------------------模态框编辑信息------------------------------------------- -->
      <div class="modal" v-show="modal2">
           <div class="m_con">
               <div class="m_con_title clear">
                   <div class="tl lt">修改信息</div>
                   <div class="tr rt"><span class=" icon-remove" @click="hide2"></span></div>
               </div>
                <div class="m_con_input clear">
                      <div class="l lt">
                         <p>用户名</p>
                         <p>姓名</p>
                         <p>手机</p>
                         <p>权限选择</p>
                      </div>
                      <div class="r lt">
                          <input type="text" v-model="username" value="username" disabled="disabled"><br>
                          <input type="text" v-model="truename" value="truename"><br>
                          <input type="text" v-model="phone" value="phone"><br>
                          <select ref="vto">
                                    <option value="">系统管理员</option>
                                    <option value="1">课程管理员</option>
                         </select>
                      </div>
                </div>
                <div class="btn">
                    <button class="btn1"  @click="sure">确认修改</button>
                    <button class="btn2"  @click="hide2">取消</button>
                </div>
           </div>
       </div> 
</div>   
</template>
<script>
import Moban from "./moban"
import Axios from 'axios'
export default {
 name:"tabs",
 components:{Moban},
 data(){
     return{
          msg:[],
          modal:false,
          modal2:false,
          text:"",      
          username:"",
          truename:"",
          phone:"",
          power:"",
          pageStart:1,
          count:0,
          currentPage: 5,
          msg2:[]          
     }
 },
 methods:{
     vaxios(){
         Axios({
            url:"Handler/AdminshowList?action=show",
            method:"get",
            params:{
                pageStart:this.pageStart,
                searchText:this.text 
            }
          }).then(res=>{
           if(res.data.data.list){
              this.msg=res.data.data.list
              this.count=res.data.data.count
           }else{
               alert("没有匹配到您所查询的用户")      
           }
              
          })
     },
    //删除 
     del(a){
         var r=confirm("确认删除?");
            if (r==true){
                Axios({
                    url:"Handler/AdminshowList?action=delete",
                    method:"get",
                    params:{
                        tokenId:a
                           }
                    }).then(res=>{
                        if(res.data.success){
                            alert(res.data.success)
                            this.vaxios()
                        }
                    })
                  }else{}  
     },
     //添加
     Reg(){
      Axios({
          url:"Handler/AdminRegHandler?action=add",
          method:"post",
          data:{      
                userName:this.username,
                truename:this.truename,
                phone:this.phone,
                password:"123456",
                power:this.power
          }
      }).then(res=>{
          alert(res.data.success)
         this.hide()
         this.vaxios()
      })
  },
    //编辑
    Edit(a){
        Axios({
            url:"Handler/AdminshowList?action=show",
            method:"get",
            params:{
                pageStart:this.pageStart,
                searchText:a,
                tokenId:a
            },
          }).then(res=>{
            this.username=res.data.data.list[0].userName
            this.truename=res.data.data.list[0].trueName
            this.phone=res.data.data.list[0].phone
             this.show2()
          })
    },
    // 确认编辑
     sure(){
        Axios({
                url:"Handler/AdminRegHandler?action=update",
                method:"post",
                data:{
                    username:this.username,
                    phone: this.phone,
                    truename: this.truename
                    }
                }).then(res=>{
                    if(res.data.success){
                      alert(res.data.success)
                       this.hide2()
                       this.vaxios()
                    }
            })
            
     },
    //分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.pageStart=val
        this.vaxios()
    },
    //添加  
     add(){this.modal=true},
    //查询 
     search(){this.vaxios()},
   //显示模态框
     show(){this.modal=true},
   //隐藏模态框 
     hide(){this.modal=false},

     show2(){this.modal2=true},
   //隐藏模态框 
     hide2(){this.modal2=false},
 },
  mounted(){
        this.vaxios()
    },

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
    /* height: 55px; */
    padding: 10px 10px;
    border: solid 1px #d1cfc9;
}
.tabs .tabs_title_l input{
    width: 560px;
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

/* 模态 */
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
.modal_menu input{
    width: 40px;
}
.bor{
    border: solid 1px #d1cfc9;
}
.blue{
    color: blue;
}
.blue.del{
    color: red;
}
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
</style>
