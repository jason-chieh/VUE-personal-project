<script >
import { RouterLink } from 'vue-router';
export default {
    data(){
        return{
          page:0,
          workArr:[[],[],[],[],[],[],[],[]],
          workName:"",
          workContent:"",
          headerWorkNum:0,
          isChecked:0,
          finishWorkNum:0,
          workrate:0,
          key:"",
          dayKey:"",
          arr:["星期一","星期二","星期三","星期四","星期五","星期六","星期日","這週注意事項"]
        }
    },
    methods:{
        goback(){
          this.$router.push("/")
        },
        prepareAddWork(indexOut){
          this.page = 1
          this.dayKey = indexOut 
        },
        prepareAddWorkBack(){
          this.page = 0 
        },
        AddWork(dayKey){
          let obj ={
            work:this.workName,
            content:this.workContent
          }
          this.workArr[dayKey].push(obj)
          this.page = 0 
          this.headerWorkNum++

        },
        finishWorkNumCal(){
          finishWorkNum++
        },
        delWork(index,indexOut){
          const checkbox1 = document.getElementById("checkbox1");
          this.workArr[indexOut].splice(index, 1);
          this.headerWorkNum--;
          if(checkbox1.value){
            this.finishWorkNum++;
          }else{
            this.finishWorkNum--;
          }
        },
        num(){
          const checkbox1 = document.getElementById("checkbox1");
          if(checkbox1.value){
            this.finishWorkNum++;
          }else if(on){
            this.finishWorkNum--;
          }
        }
    },
    components:{
        RouterLink,
    },
    updated(){
    },
}
</script>

<!-- -------------------------------------------------------------------- -->
<template>
  
<div  class="bg">
    <div class="header">
        <div class="top">
            <i @click="goback" class="fa-solid fa-house-user"></i>
            <h1 @click="goschedule">週計劃表</h1>
            
        </div>
        <div class="bot">
            <div class="startPlan page">
                <span class="spanWork" @click="getPlanNum">預計計劃:</span>
                <span >{{this.headerWorkNum}}</span>
            </div>
            <div class="finishPlan page">
                <span>完成計劃:</span>
                <span>{{this.finishWorkNum}}</span>
            </div>
            <div class="rate page">
                <span>完成率:</span>
                <span>{{this.workrate}}%</span>
            </div>
            <div class="lineRate page">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 30%;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">30%
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
            <div class="day page" v-for="item,indexOut in arr">
                <button @click="prepareAddWork(indexOut)" :key="indexOut" class="titleBtn" type="button">{{item}}</button>
                <div class="workContent" v-for="item,index in workArr[indexOut]">
                    <input type="checkbox" id="checkbox1" @change="num" value="true"  :key="index">
                    <p>{{item.work}}</p>
                    <button  type="button" @click="delWork(index,indexOut)" :key="index">刪除</button>
                    
                </div>
            </div>
    </div>
</div>


<div v-if="page==1" class="bg2black" >
  <div  class="prepareAddWorkBg">
    <div class="prepareAddWorkArea">
          <p>工作標題</p>
          <input type="text" v-model="workName">
          <p>工作內容</p>
          <input type="te" v-model="workContent"><br>
          <button @click="AddWork(dayKey)" type="button">新增</button>
    </div>
    <button @click="prepareAddWorkBack" class="closeBtn" type="button">X</button>
  </div>
</div>

</template>
<!-- -------------------------------------------------------------------- -->



<style lang="scss" scoped>
.bg{
  width: 100vw;
  height: 100vh;
  position: relative;
  .header{
    width: 100vw;
    height: 25vh;
    // background-color: #629DF6;
    background:linear-gradient( 90deg,#2F4F4F , #018948);
    color: white;
    .top{
        height: 10vh;
        display: flex;
        align-items: center;
        margin-left: 5vw;
        .RouterLink{
            color: white;
        }
        h1{
            font-weight: bold;
            margin:0 1.5% ;
            margin-top: 5vh;
            &:hover{
                cursor:pointer;
            }
        }
        i{
            margin-top: 5vh;
            font-size: 25pt;
            &:hover{
                cursor:pointer;
            }
        }
    }
    .bot{
        display: flex;
        .page{
            margin: 0 3vw ;
            margin-top: 5vh;
            font-size: 20pt;
            font-family:"Comic Sans MS", cursive;
            .spanWork{
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .lineRate{
            width: 20vw;
            margin-top: 40px;
            .progress{
                height: 4.5vh;
                background-color: transparent;
                border: 1px solid white;
                .progress-bar{
                    color: black;
                    background-color: white;
                }
            }
        }
    }
}
.content{
  width: 100vw;
  height: 75vh;
  display: flex;
  flex-wrap: wrap;
  .day{
    width: 21vw;
    height: 30vh;
    border: 1px solid black;
    border-radius: 5px;
    margin: 2% 2%;
    .titleBtn{
      width: 100%;
      height: 20%;
      border: 0;
      color: white;
      border-radius: 5px;
      background:linear-gradient( 90deg,#2F4F4F , #018948);
    }
    .workContent{
      display: flex;
      margin: 1.5% 1.5%;
      background-color: #EDDCAE;
      position: relative;
      input{
        font-size: 16pt;
        width: 20px;
        margin: 1% 1%;
      }
      p{
        font-size: 16pt;
        overflow: auto;
        margin: 0;
        margin-left: 20px;
      }
      button{
        color: white;
        border: 0;
        border-radius: 5px;
        background-color: rgb(248, 65, 65);
        position: absolute;
        right: 1%;
        top: 10%;
      }
    }
  }
}
}

.bg2black{
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .7);
  position: absolute;
  transform:translate(-50%,-50%);
  top: 50%;
  left: 50%;
  .prepareAddWorkBg{
  width: 35vw;
  height: 60vh;
  background-color: white;
  background-image: url("../../photo/—Pngtree—forest_429424.png");
  background-position-y: 130px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
  border: 3px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items:baseline;
  .prepareAddWorkArea{
    width: 20vw;
    height: 40vh;
    background-color: transparent;
    text-align: center;
    p{
      font-weight: bold;
      font-size: 16pt;
      margin: 0;
      margin-top: 20px;
    }
    input{
      border-radius: 3px;
    }
    button{
      margin-top: 30px;
      border: 0;
      border-radius: 5px;
      background-color: #018948;
      color: white;
      width: 100px;
      height: 30px;
    }
  }
  .closeBtn{
    position: absolute;
    right: 2%;
    top: 2%;
    border: 0;
    font-size: 16pt;
    background-color: transparent;
  }
}

}


</style>