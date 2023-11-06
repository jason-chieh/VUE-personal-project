<script >
import { RouterLink } from 'vue-router';
export default {
  data(){
    return{
      
    }
  },
  methods:{
    goSkillVue(){
      this.$router.push("/skill")
    }
  },
  components:{
      RouterLink
    }
}
</script>

<template>
  <!-- icon匯入 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <!-- 個人首頁主體 -->
<div class="bg">
  <!-- 上半部 -->
    <div class="header">
  <!-- 相片區-->
        <div class="headerLeft">
            <div class="jasonPhoto"></div>
            <h2>紀明杰</h2>
            <h5>Personal Blogger</h5>
        </div>
  <!-- 文字跳轉區-->
        <div class="headerRight">
            <video autoplay muted loop >
              <source src="../../photo/finalcut.mp4">
            </video>
            <div class="profile page">
              <h3>PROFILE:</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim laudantium, cumque est ipsa tempora quas repellendus consequatur id corporis illo.asdasdsasdasdsadasdas asdasdas dsad dsa s d asdsd sad sd </p>
            </div>
            <div class="hobby page">
              <h3>HOBBIES:</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim laudantium, cumque est ipsa tempora quas repellendus consequatur id corporis illo.asdasdsasdasdsadasdas asdasdas dsad dsa s d asdsd sad sd </p>
            </div>
            <div class="contact block">
              <h3>CONTACT</h3>
              <div class="circleBlock">
                <div class="circle">
                  <a href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i></a>
                </div>
                <div class="circle">
                  <a href="https://www.facebook.com/"><i class="fa-brands fa-facebook"></i></a>
                </div>
                <div class="circle">
                  <a href="https://zh.wikipedia.org/zh-tw/%E7%94%B5%E8%AF%9D"><i class="fa-solid fa-phone-volume"></i></a>
                </div>
              </div>
            </div>
            <div class="scheule block">
              <RouterLink class="RouterLink" to="/schedule"><h3>PERSONAL RESEARCH</h3></RouterLink>
            </div>
        </div>
    </div>
    
    <div class="footer">
      <div class="skill">
                <video autoplay muted loop >
                  <source   src="../../photo/skill3.mp4">
                </video>
                <div @click="goSkillVue" class="skillText up">
                  <h2>SKILL:</h2>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint repudiandae quisquam obcaecati ullam quod at.</p>
                </div>
                <div  class="skillRange up">
                  <img src="../../photo/HTML.jpg" alt="">
                  <img src="../../photo/CSS.JPG" alt="">
                  <img src="../../photo/JS.JPG" alt="">
                  <img src="../../photo/VUE.JPG" alt="">
                  <img src="../../photo//C++.JPG" alt="">
                  <img src="../../photo/CCC.JPG" alt="">
                  <img src="../../photo/PYTHON.JPG" alt="">
                  <img src="../../photo/JAVA.JPG" alt="">
                </div>
      </div>
      <div class="school">
        <div class="education">
          <h3>EDUCATION</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, earum.</p>
        </div>
        <div class="experience">
          <h3>EXPERIENCE</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Re ds sd s sss sm, earum.</p>
        </div>
      </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
$maincolor:#018948;
.bg{
  width: 100vw;
  height: 100vh;
  padding: 4vh 2vw;
  background-color: $maincolor;
  .header{
    width: 96vw;
    height: 45vh;
    display: flex;
    position: relative;
    background-color: white;
    .headerLeft{
      width: 30vw;
      height: 45vh;
      // background-color: white;
      padding: 2vh 1vw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
// ------------------------------------------背景動畫以下
      background-image: 
      radial-gradient(closest-side,rgb(30, 226, 128),rgba(163, 240, 201,0)),
      radial-gradient(closest-side,rgb(123, 121, 240),rgba(117, 161, 134,0)),
      radial-gradient(closest-side,rgb(177, 80, 233),rgba(298, 107, 103,0)),
      radial-gradient(closest-side,rgb(250, 146, 61),rgba(2112, 114, 113,0)),
      radial-gradient(closest-side,rgb(250, 247, 85),rgba(67, 104, 86,0));
      background-size: 
      20vmax 30vmax, 5vmax 5vmax, 27vmax 25vmax, 35vmax 39vmax, 25vmax 19vmax;
      background-position: 
      -7vmax 7vmax, 1vmax -11vmax, 10vmax 10vmax, -15vmax -10vmax, 10vmax 0vmax;
      background-repeat: no-repeat;
      background-color: white;

      animation: 20s movement linear infinite;
      @keyframes movement {
        0%{
          background-size: 
          20vmax 30vmax, 17vmax 19vmax, 27vmax 25vmax, 35vmax 39vmax, 25vmax 19vmax;
          background-position: 
          -10vmax 3vmax, 14vmax -1vmax, 20vmax 19vmax, -19vmax -11vmax, 5vmax 15vmax;
        }
        25%{
          background-size: 
          17vmax 25vmax, 15vmax 11vmax, 15vmax 22vmax, 31vmax 35vmax, 23vmax 15vmax;
          background-position: 
          0vmax 7vmax, 4vmax 7vmax, 7vmax 1vmax, 5vmax -11vmax, 1vmax 1vmax;
        }
        50%{
          background-size: 
          25vmax 22vmax, 17vmax 15vmax, 21vmax 29vmax, 29vmax 19vmax, 17vmax 11vmax;
          background-position: 
          -1vmax 14vmax, 5vmax -4vmax, 15vmax 1vmax, -7vmax -4vmax, 12vmax 7vmax;
        }
        75%{
          background-size: 
          18vmax 15vmax, 14vmax 21vmax, 17vmax 15vmax, 30vmax 33vmax, 20vmax 13vmax;
          background-position: 
          -14vmax 7vmax, 7vmax -3vmax, 22vmax 4vmax, -10vmax -1vmax, 7vmax 9vmax;
        }
        100%{
          background-size: 
          20vmax 30vmax, 5vmax 5vmax, 22vmax 25vmax, 35vmax 39vmax, 25vmax 19vmax;
          background-position: 
          -10vmax 3vmax, 14vmax -11vmax, 20vmax 19vmax, -19vmax -11vmax, 10vmax 15vmax;
        }
        
      }

// -------------------------------------背景動畫以上
      .jasonPhoto{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        // background-color: pink;
        background-image: url(../../photo/S__18448405.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        &:hover{
            // transform: scaleX(-1); 
            animation: rotate 3s linear infinite;
            @keyframes rotate {
            0%{
                transform: scaleX(1)
            }
            50%{
                transform: scaleX(-1)
            }
            100%{
                transform: scaleX(1)
            }
            }
        }
      }
    }

    .headerRight{
      width: 66vw;
      height: 45vh;
      background-color: transparent;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      // padding: 2.5vh 1vw;
      position: relative;
      video{
        position: absolute;
        width: 66vw;
        height: 45vh;
        opacity: 40%;
      }

      // 自我介紹跟興趣特質
      .page{
        width: 30vw;
        height: 25vh;
        margin-top: 2vh;
        padding: 1% 2%;
        background-color: transparent;
        z-index: 1;
        &:hover{
          transform: translate(-5px ,-5px);
          box-shadow: 0 0 10px black;
        }
        
      }
      // 社群媒體跟學習檔案
      .block{
        width: 30vw;
        height: 10vh;
        padding: 1% 2%;
        background-color: transparent;
        display: flex;
        align-items:center;
        justify-content: space-between;
        z-index: 1;
        .RouterLink{
          text-decoration: none;
          color: black;
        }
        &:hover{
          transform: translate(-5px ,-5px);
          box-shadow: 0 0 10px black;
        }
      }
      .circleBlock{
        display: flex;
        .circle{
        width: 3.5vmax;
        height: 3.5vmax;
        background-color: $maincolor;
        margin: 1% 1%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          transform: translate(-5px ,-5px);
        }
        a{
          color: black;
        }
        i{
          font-size:2vmax;
        }
      }
      }

    }


  }


  .footer{
    width: 96vw;
    // height: 45vh;
    background-color:$maincolor ;
    display: flex;
    margin-top: 2vh;
    .skill{
      background-color: white;
      position: relative;
      .skillText{
        display: flex;
        padding: 2% 2%;

        &:hover{
          box-shadow: 0 0 10px black;
        }
        .RouterLink{
          color: black;
          text-decoration: none;
        }
        h2{
          width: 20%;
          margin-left: 3vmax;
          z-index: 1;
        }
        p{
          margin: 0;
          z-index: 1;
        }
      }
      .skillRange{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        img{
          width: 5vmax;
          height: 5vmax;
          margin: 2.8% 6%;
        }
      }
      video{
        position: absolute;
        opacity: 40%;
        width: 100%;
        height: 100%;
      }


    }
    .school{
      margin-left: 1vw;
      background-color: white;
      display: flex;
      .education{
        width: 15vw;
      }
      .experience{
        width: 30vw;
      }
      h3{
        margin:20px 20px;
      }
      p{
        margin:20px 20px;
      }
    }
  }
}
</style>
