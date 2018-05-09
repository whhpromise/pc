<template>
    <div>
        <fc-header></fc-header>
        <div class="nav">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item><a>活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="adminInput">
             <el-input  placeholder="请输入内容" v-model="text"></el-input>
             <el-button type="success" @click="search">查询</el-button>
             <el-button type="info" @click="add">添加</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="userName"
                    label="用户名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="trueName"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="power"
                    label="后台权限">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机">
                </el-table-column>
                <el-table-column
                    prop="updateAt"
                    label="编辑日前">
                </el-table-column>
                <el-table-column
                    prop="tokenId"
                    label="操作">
                    <template slot-scope="scope">
                    <el-button type="text" @click="del(scope.row)" size="small">删除</el-button>
                    <el-button type="text"  size="small" @click="edit(scope.row)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
             <div class="block">
              <el-pagination  @current-change="currentpage"
                layout="prev, pager, next"
                :page-size="3"
                :total='count'>
              </el-pagination>
            </div>
           <Add v-if="addshow" @receve="addhide" :addauth="getadminlist" :token="tokenId" :info="userInfo" @clear="getclear"></Add>

    </div>
</template>

<script>
import Axios from "axios";
import fcHeader from "./moban"
import Add from "./add"
export default {
    data(){
        return{
            tableData:[],
            text:"",
            addshow:false,
            pageStart:1,
            count:0,
            tokenId:"",
            userInfo:{}
        }
     },
     methods:{
         getadminlist(){
             Axios({
                 url:"Handler/AdminshowList?action=show",
                 method:"get",
                 params:{
                     pageStart:this.pageStart,
                     searchText:this.text
                 }
             }).then(res=>{ 
                this.tableData=res.data.data.list
                this.count=res.data.data.count
             })
         },
         addhide(val){
             this.addshow=val
         },
         search(){
              this.getadminlist()
         },
         del(row){
            Axios({
                url:"Handler/AdminshowList?action=delete",
                method:"get",
                params:{
                    tokenId:row.tokenId
                }
            }).then(res=>{
                if(res.data.success){
                    alert(res.data.success)
                    this.getadminlist()
                }
            })
         },
         edit(row){
            this.addshow=true
            this.tokenId=row.tokenId
            this.userInfo.username=row.userName;
            this.userInfo.truename=row.trueName;
            this.userInfo.phone=row.phone
            this.userInfo.tokenId=row.tokenId
        
         },
         add(){
             this.addshow=true
         },
         currentpage(page){
            this.pageStart=page
            this.getadminlist()
         },
         getclear(val){
            this.tokenId=val
         }
     },
     components:{fcHeader,Add}, 
    //   
     mounted(){
         this.getadminlist()
         document.body.style.background="#fff"
         
      
     }
}
</script>

<style>
.adminInput{
    /* width:90%; */
    height:40px;
    border:1px solid #ccc;
    padding:10px;
    /* box-sizing: border-box */
}
.el-input{
    width:40%;
    float: left;
}
.el-button{float:left;}
</style>
