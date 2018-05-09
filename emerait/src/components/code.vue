<template>
    <div>
         <canvas id="canvas" width="100px" height="37px" @click="changeVeri"></canvas>
    </div>
</template>

<script>
/* 
  四方面
  1 绘制矩形
     1.1 rect() x y w h
     1.2 填充颜色   fillstyle=""   
  2 绘制小点
     2.1  arc() x y o r 2π  false
  3 绘制干扰线
     3.1  line  
  4 绘制文字
     4.1 font  
*/
import Axios from 'axios';
export default {
    data(){
        return{
          canvas:"",
          width:"",
          height:"",
          ctx:"",
        //   url:"https://www.easy-mock.com/mock/5ad9637b7bd0967f61786e1e/ex/ex"
         url:"/Handler/AdminLoginHandler?action=veri",
        //  url:'http://localhost:3000/d'
        }
    },
    methods:{
        changeVeri(){
           Axios.get(this.url).then(res => {
                      console.log(res.data.data)
                     this.drawpic(res.data.data); 
                   });  
        },
        //动态传值给登录页
    //   Co(){
    //     this.$emit("Comp",this.code)
    //   },
        randomNum(min,max){
            return Math.floor(Math.random()*(max-min)+min);
        },
        randomColor(min,max){
            var r=this.randomNum(min,max);
            var g=this.randomNum(min,max);
            var b=this.randomNum(min,max);
            return 'rgb('+r+','+g+','+b+')';
        },
       drawpic(txt){
       //绘制图形
            this.ctx.fillStyle=this.randomColor(180,240);
            this.ctx.fillRect(0,0,this.width,this.height);
      //绘制干扰线
      for(var i=0;i<10;i++){
            this.ctx.strokeStyle=this.randomColor(50,255);
            this.ctx.beginPath();
            this.ctx.moveTo(this.randomNum(0,this.width),this.randomNum(0,this.height));
            this.ctx.lineTo(this.randomNum(0,this.width),this.randomNum(0,this.height));
            this.ctx.lineWidth=1;
            this.ctx.closePath();
            this.ctx.stroke();            
            }
       //绘制干扰点
        for(var i=0;i<50;i++){
            this.ctx.fillStyle=this.randomColor(50,250);
            this.ctx.beginPath();
            this.ctx.arc(this.randomNum(0,this.width),this.randomNum(0,this.height),1,0,Math.PI*2,false);
            this.ctx.fill();
            this.ctx.closePath();                      
            } 
        //绘制文字 
        for(var i=0;i<4;i++){
            var text=txt[i]
            this.ctx.fillStyle=this.randomColor(50,250);
            this.ctx.beginPath();
            this.ctx.font=this.randomNum(16,30)+"px SimHei";
            var x=20*i+20;
            var y=this.randomNum(18,25);
            var deg=this.randomNum(-30,30);
            this.ctx.rotate(deg*Math.PI*2);
            this.ctx.fillText(text,x,y)
            this.ctx.fill();
            this.ctx.closePath();
            }  
        }
    },
    mounted(){
      this.canvas=document.getElementById("canvas");
      this.width=this.canvas.width;
      this.height=this.canvas.height;
      this.ctx=this.canvas.getContext("2d");
      this.changeVeri();   
    
    },

}
</script>

<style>

</style>
