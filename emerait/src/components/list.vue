<template>
    <div>
        <VList></VList>
        <div class="box1 clear">
             
                <div class="l1">
                    <p class="icon-th-large"></p>
                    <p>课程列表</p>
                    <p>查询现有课程</p>
                    <p>管理课程</p>
                </div>
                <div class="l1">
                    <p class=" icon-plus"></p>
                    <p>课程列表</p>
                    <p>查询现有课程</p>
                    <p>管理课程</p>
                </div>
                <div class="l1">
                    <p class="icon-arrow-up"></p>
                    <p>课程列表</p>
                    <p>查询现有课程</p>
                    <p>管理课程</p>
                </div>
                <div class="l1">
                    <p class=" icon-facetime-video"></p>
                    <p>课程列表</p>
                    <p>查询现有课程</p>
                    <p>管理课程</p>
                </div>
                <div class="l1">
                    <p class="icon-user-md"></p>
                    <p>课程列表</p>
                    <p>查询现有课程</p>
                    <p>管理课程</p>
                </div>
                <div class="l1">
                    <p class=" icon-file"></p>
                    <p>课程列表</p>
                    <p>查询现有课程</p>
                    <p>管理课程</p>
                </div>


        </div>
         <div class="wrap_box2">
            <div class="box2 clear">
                <div class="box2_left lt">
                     <div id="myChart1"></div>
                </div>
                <div class="box2_right lt">
                     <div id="myChart2"></div>
                </div>
            </div>
         </div>

    </div>
</template>

<script>
// import Vue from "vue"
import VList from "./moban"
import Echarts from 'echarts'
// Vue.prototype.$echarts = echarts 
export default {
    components:{VList},
  name: 'list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    //初始化 init()
    this.chartOne=Echarts.init(document.getElementById("myChart1"))
    this.chartOne.setOption({
        //提示信息
        tooltip:{
           formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox:{
         feature: {
            restore: {},
            saveAsImage: {}
        }
        },
         series: [
        {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter:'{value}%'},
            data: [{value: 50, name: '完成率'}]
        }
    ] 
    })
    // setInterval(function () {
    // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    //  chartOne.setOption(option, true);
    //  },2000);

   this.drawLine()
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
       this.chartOne=Echarts.init(document.getElementById("myChart2"))
        // 绘制图表
        this.chartOne.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
            

        });

    }
  }
}
</script>

<style>
.box1{
    width: 100%;
    padding: 30px 0px;
    background: #214079;
}
.box1>div{
    width: 162px;
    height: 197px;
    background: whitesmoke;
    float: left;
    background:#2e4974;
    margin-left: 3%;
    text-align: center;
    box-sizing:border-box;
    padding-top:20px;  
    color: white;
}
.box1>div:hover{
    background: #1cb4e5;
    cursor: pointer;
}
.box1 .l1 p:nth-child(1){
    margin-top: 5px;
    font-size: 50px;
}
.box1 .l1 p:nth-child(2){
   font-size: 20px;
}
.box1 .l1 p:nth-child(3){
    font-size: 12px;
    margin-top: 20px;
 }
 .box1 .l1 p:nth-child(4){
    font-size: 12px;
    margin-top: 5px;
 }
 .wrap_box2{
     padding: 20px 40px;
     background:#214079; 
     padding-left: 57px;
 }
 .box2{
     padding: 20px;
     background: linear-gradient(to bottom right, #384974 , #a5939f)
 }
 .box2 .box2_right{
     margin-left: 40px;
 }
 .box2 .box2_left{
     width: 380px;
     height: 380px;
 }
 #myChart1,#myChart2{
     width: 380px;
     height: 380px;
 }
 
</style>
