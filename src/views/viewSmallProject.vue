<script >
export default {
    data(){
        return{
        // 預覽頁跳轉
        page:0,
        // 登入畫面跳轉
        trackerpage:1,
        // 房地產頁面轉換
        housepage:1,
        // 註冊密碼
        account:"",
        Password:"",
        rePassword:"",
        // 登入的東西跟去local確認的東西
        loginaccount:"",
        loginPassword:"",
        checkacc:"",
        checkpaw:"",
         // 抓取使用者名稱
        userName:"",
        // 最主要陣列
        arr:[],

        // 防呆變數
        product:"",
        money:"",

        //三個加減變數
        incomeNum:0,
        outcomeNum:0,
        totalNum:0,
        // 刪除索引值跟刪除物品的錢錢
        key:"",
        delNum:"",
        // 房地產
        arr3:["都心區","23區東部","區西部"],
        arr12:["台北市","台中市","台南市","台東市","台北市","台中市","台南市","台東市","台北市","台中市","台南市","台東市"]
        }
    },
    components:{
        
    },
    methods:{
        showAll(){
            this.page=1
        },
        showAll2(){
            this.page=2
        },
        back(){
            this.page=0
        },
        signup(){
            this.trackerpage=2
        },
        signupBack(){
            this.trackerpage=1
        },
        // 秀密碼
        showPassword(){
        var passwordcheck = document.getElementById("passwordcheck");

        if (passwordcheck.type === "password") {
            passwordcheck.type = "text";
        } else {
            passwordcheck.type = "password";
        }
        },
        // 註冊並畫面跳轉
        regi(){
            if(this.account==""){
                alert("帳號沒填，請確實填寫")
            }else if(this.Password==""){
                alert("密碼沒填，請確實填寫")
            }else if(this.rePassword==""){
                alert("確認密碼沒填，請確實填寫")
            }
            else if(this.Password != this.rePassword){
                alert("密碼跟確認密碼不相同，請確實填寫")
            }
            else{
            localStorage.setItem("account",JSON.stringify(this.account))
            localStorage.setItem("Password",JSON.stringify(this.Password))
            // localStorage.setItem("rePassword",JSON.stringify(this.rePassword))
            alert("註冊成功");

            // 清空畫面
            this.account="";
            this.Password="";
            this.rePassword="";

            this.trackerpage=1
            }
        },
        // 登入並秀出使用者
        login(){
            this.loginaccount = JSON.parse(localStorage.getItem("account"))
            this.loginPassword = JSON.parse(localStorage.getItem("Password"))


            if(this.loginaccount== this.checkacc && this.loginPassword== this.checkpaw){
                this.trackerpage=3
                this.userName=JSON.parse(localStorage.getItem("account"))
            }
            else{
                // console.log(this.loginaccount)
                // console.log(this.loginPassword)

                alert("帳號密碼錯誤")
            }
        },
        // 前往新增網頁
        add(){
            this.trackerpage=4
        },
        // 新增物品返回鍵
        addback(){
            this.trackerpage=3
        },
        // 新增物品
        addProduct(){
        if(this.product =="" || this.money == ""){
            alert("請勿空白")
        }
        else{
            let obj = {
            name: this.product,
            money: this.money
            }
            this.arr.push(obj);


            if(this.money>=0){
            this.incomeNum = this.incomeNum+this.money
            }else{
            this.outcomeNum = this.outcomeNum+this.money
            }


            // 加總並清空並跳轉
            this.totalNum =  this.incomeNum + this.outcomeNum;
            this.product ="";
            this.money = "";
            this.trackerpage = 3;
        }
        },
        // 前往刪除物品頁面
        pruductdelete(index){
            this.key=index
            this.trackerpage =5
        },
        // 刪除物品跟錢錢
        delafter(index){
            index = this.key
            this.delNum =this.arr[index].money

            if(this.delNum>=0){
                this.incomeNum =  this.incomeNum-this.delNum
                this.totalNum =  this.incomeNum + this.outcomeNum;
            }else{
                this.delNum = Math.abs(this.delNum)
                this.outcomeNum = this.outcomeNum +this.delNum
                this.totalNum =  this.incomeNum + this.outcomeNum;
            }

            // 刪除陣列的數並跳轉回去
            this.arr.splice(index, 1);
            this.trackerpage = 3
        },
        trackerback(){
            this.trackerpage=1
        },
        // 房地產以下
        housetologin(){
            this.housepage=2
        },
        housetohome(){
            this.housepage=1
        },
        logintologin2(){
            this.housepage=3
        },
        hometoblur(){
            this.housepage=4
        },
        hometocity(){
            this.housepage=5
        },
        citytocitycenter(){
            this.housepage=6
        },
        citytoFinal(){
            this.housepage=7
        },
        
    }
}
</script>

<template>
    <!-- 整個預覽 -->
    <div v-show="page==0" class="bg">
        <div class="block1">
            <div class="bgLeft">
                <div @click="showAll" class="bigbigCircle"></div>
                <hr />
            </div>
            <div class="bgRight">
                <div class="greenCircle"></div>
                <div class="grayCircle"></div>
                <div class="rightText">
                    <h1>房地產小試身手</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero asperiores earum neque commodi inventore voluptatum adipisci odio consectetur iste? Veniam.</p>
                </div>
            </div>
        </div>
        <div class="block2">
            <div class="block2bgLeft">
                <div @click="showAll2" class="block2bigbigCircle"></div>
                <hr />
            </div>
            <div class="block2bgRight">
                <div class="block2greenCircle"></div>
                <div class="block2grayCircle"></div>
                <div class="block2rightText">
                    <h1>記帳小系統</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero asperiores earum neque commodi inventore voluptatum adipisci odio consectetur iste? Veniam.</p>
                </div>
            </div>
        </div>
        
    </div>

    <!-- 房地產 -->
    <div v-show="page==1" class="bg2">
        <!-- header -->
        <div class="top">
            <div @click="housetohome" class="square"></div>
            <span class="span1 spanfff">公司</span>
            <span>|</span>
            <span class="spanfff">文化</span>
            <i class="fa-solid fa-mobile-screen-button"></i>
            <span style="margin: 0 2vw;">0989325378</span>
            <div class="btnPlace">
                <button type="">按我</button>
                <span style="color: white;">|</span>
                <button type="">跳轉</button>
            </div>
            <button @click="back" class="bg2BackBtn" type="button">x</button>
        </div>
                <!-- bootstrap -->
                <div v-show="housepage==1" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="../../photo/house/banner1.png" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="../../photo/house/banner2.png" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="../../photo/house/banner3.png" class="d-block w-100" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
                <!-- 登入 -->
                <div v-show="housepage==2" class="login">
                    <div class="bgArea">
                        <div class="loginArea">
                            <div class="emailArea">
                                <i class="fa-regular fa-envelope"></i>
                                <i class="fa-solid fa-question"></i>
                                <label for="">Email</label><br>
                                <input type="email" name="" id="">
                            </div>
                            <div class="passwordArea">
                                <i class="fa-solid fa-question boti"></i>
                                <label for="">Password</label><br>
                                <input type="password" name="" id="">
                            </div>
                            <div class="reg">
                                <input type="checkbox">
                                <span>continue </span>
                                <span class="regi">register</span>
                            </div>
                            <button @click="logintologin2" type="button">登入</button>
                        </div>
                    </div>
                </div>
                <!-- 登入的登入 -->
                <div v-show="housepage==3" class="login2">
                    <div class="login2bg">
                        <div class="login2sixArea">
                            <button type="button">請按我啊</button>
                            <button type="button">不要</button>
                            <button type="button">拜託</button>
                            <button type="button">不要阿</button>
                            <button type="button">拜托拉</button>
                            <button type="button">好啦</button>
                        </div>
                    </div>
                </div>
                <!-- 毛玻璃 -->
                <div v-show="housepage==4" class="blurblur">
                    <div class="blurbg">
                    <div class="blurArea">
                        <div class="blur"></div>
                    </div>
                    </div>
                </div>
                <!-- 城市 -->
                <div v-show="housepage==5" class="city">
                    <div class="citybg">
                        <div class="citybigArea">
                            <div  @click="citytocitycenter" class="citycity" v-for="item1 in arr3">
                                <h3>{{item1}}</h3>
                                <hr>
                                <div class="citytwelveArea">
                                    <button type="button" v-for="item in arr12">
                                        <input type="checkbox">
                                        <label for="">{{item}}</label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 城市中心 -->
                <div v-show="housepage==6" class="citycenter">
                    <div class="citycenterbg">
                        <div class="citycenterbigArea">
                            <div @click="citytoFinal" class="citycenterone" v-for="item in arr3">
                                <div class="citycenteroneLeft">
                                    <div class="citycentersquare"></div>
                                </div>
                                <div class="citycenteroneRight"> 
                                    <span>都心區</span>
                                    <span>{{item}}</span><br>
                                    <hr>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- 城市打字 -->
                <div v-show="housepage==7" class="final">
                    <div class="finalbg">
                        <div class="finalbigArea">
                            <div class="finalone">
                                <button class="finalbutton1" type="button"></button>
                                <div class="finaloneLeft">
                                    <div class="finalsquare"></div>
                                </div>
                                <button class="finalbutton2" type="button"></button>
                                <div class="finaloneRight"> 
                                    <span>都心區</span>
                                    <span>a物件</span><br>
                                    <hr>
                                </div>
                            </div>
                            <textarea id="story" name="story" rows="5" cols="33">
                            It was a dark and stormy night...
                            </textarea>
                        </div>
                    </div>
                </div>



        <div class="bot">
            <button @click="housetologin" type="button">登入</button>
            <button @click="hometoblur" type="button">毛玻璃</button>
            <button @click="hometocity" type="button">都市</button>
        </div>
    </div>

    <!-- 記帳 -->
    <div v-show="page==2" class="bg3">
            <!-- 登入 -->
            <div v-show=" trackerpage==1" class="trackerbg">
            <div class="Area">
                <h1>Expense Tracker</h1>
                <div class="account page">
                <p>Account</p>
                <input id="logincheck" type="text" placeholder="帳號" v-model="this.checkacc">
                </div>
                <div class="Password page">
                <p>Password</p>
                <input id="passwordcheck" type="password" placeholder="密碼" v-model="this.checkpaw">
                <i @click="showPassword" class="fa-solid fa-eye"></i>
                </div>
                <div class="btnArea" >
                <button @click="signup" type="button">sign up</button>
                <button @click="login" class="blue" type="button">login in</button>
                </div>
                <button class="trackerbgbtn" @click="back" type="button">x</button>
            </div>
            
            </div>
            <!-- 註冊--->
            <div v-show="trackerpage==2" class="trackerbg2">
            <div class="Area2">
                <h1>Sign up</h1>
                <div class="account2 page2">
                <p>Account</p>
                <input id="reg1" type="text"  v-model="this.account" >
                </div>
                <div class="Password2 page2">
                <p>Password</p>
                <input id="reg2"  type="password"   v-model="this.Password">
                <i @click="showPassword" class="fa-solid fa-eye"></i>
                </div>
                <div class="repeat page2">
                <p>Reapeat password</p>
                <input id="reg3" type="password"   v-model="this.rePassword">
                <i @click="showPassword" class="fa-solid fa-eye"></i>
                </div>
                <div class="btnArea2" >
                <button @click="signupBack" type="button">cancel</button>
                <button @click="regi" class="blue2" type="button">sign up</button>
                </div>
            </div>
            </div>
            <!-- 記帳畫面-主畫面 -->
            <div v-show="trackerpage==3" class="trackerbg3">
                <div  class="trackerbg3bg">
                    <button @click="back" style="color: white;border: 0;background-color: red;position: absolute; top: 20%; right: 5%;" type="button">x</button>
                    <div class="trackerbg3bgLeft">
                        <h2>Expense Tracker </h2>
                        <h2>{{this.userName}}!!!歡迎回來</h2>
                        <h4>Your Balacne</h4>
                        <h1>{{this.totalNum}}</h1>
                        <h2 @click="trackerback">back</h2>
                    </div>
                    <div class="trackerbg3bgRight">
                        <div class="trackerbg3top trackerbg3page">
                        <div class="trackerbg3topl">
                            <p>INCOME</p>
                            <p>{{this.incomeNum}}</p>
                        </div>
                        <div class="trackerbg3topr">
                            <p>OUTCOME</p>
                            <p>{{this.outcomeNum}}</p>
                        </div>
                        </div>
                        <div class="trackerbg3mid trackerbg3page">
                        <button @click="add" type="button">加入選項</button>
                        </div>
                        <div class="trackerbg3bot trackerbg3page" >
                                <div class="trackerbg3newArea" v-for="(item, index) in arr" >
                                    <span>{{item.name}}</span>
                                    <div class="trackerbg3moneyArea">
                                    <span>${{item.money}}</span>
                                    <button @click="pruductdelete(index)" :key="index" type="button">Delete</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 記帳畫面-物品輸入 -->
            <div v-show="trackerpage==4" class="trackerbg4">
                <div  class="trackerbg4blackBLur">
                    <div  class="trackerbg4bg2">
                        <div class="trackerbg4addArea">
                        <p>品項</p>
                        <input type="text" v-model="product" >
                        <p>價錢</p>
                        <input type="number" v-model="money">
                        <div class="trackerbg4addbtn" >
                            <button @click="addProduct" type="button">按我新增</button>
                        </div>
                        </div> 
                        <button @click="addback" class="trackerbg4xxBtn" type="button">X</button> 
                    </div>
                </div>
            </div>
            <!-- 記帳畫面-物品刪除 -->
            <div v-show="trackerpage==5" class="trackerbg5">
                <div v-show="page==2" class="trackerbg5blackBLur2">
                    <div  class="trackerbg5bg3">
                    <div class="trackerbg5delArea">
                        <h2>確定刪除嗎?</h2>
                        <button @click="delafter(index)" type="button">確定</button>
                    </div>
                    <button class="trackerbg5delBackBtn"   id="delBackBtnId" @click="addback" type="button">X</button>
                    </div>
                </div>
            </div>

    </div>

</template>

<style lang="scss" scoped>
$maincolor:#018948;
$maincolor2:#475467;
$maincolor3:rgb(82, 82, 240);
$main:#E0ECDE;

// 預覽頁面
.bg{
    width: 100vw;
    background-color: $main;

    .block1{
        display: flex;
        .bgLeft{
            width: 25vw;
            height: 85vh;
            background-color: $maincolor;
            .bigbigCircle{
                position: absolute;
                width: 500px;
                height: 500px;
                border-radius: 50%;
                top: 16%;
                left: 5%;
                background-image: url("../../photo/house/房地產預覽.JPG");
                background-size:230%;
                background-repeat: no-repeat;
                background-position: 30%;
                transition: 1s;
                z-index: 1;
                animation: 4s movement linear infinite;
                @keyframes movement {
                    0%{
                        transform: translate(0px, 0px);
                    }
                    25%{
                        transform: translate(0px,10px);
                    }
                    50%{
                        transform: translate(0px,20px);
                    }
                    75%{
                        transform: translate(0px,10px);
                    }
                    100%{
                        transform: translate(0px,0px);
                    }
                    
                }
                &:hover{
                    border-radius: 10%;
                    cursor: pointer;
                }
            }
            hr{
                position: absolute;
                bottom: 5%;
                left: 4%;
                width: 553px;
                height: 10px;
                border: 0;
                padding: 3px;
                background: repeating-linear-gradient(135deg, #000000 0px, #000001 3px, transparent 1px, transparent 6px);
            }
        }
        .bgRight{
            width: 75vw;
            height: 85vh;
            position: relative;
            .greenCircle{
                width: 15vw;
                height: 30vh;
                border-radius: 50%;
                background-color: #3ed18a;
                position: absolute;
                top: 50%;
                right: 45%;
                opacity: 50%;
            }
            .grayCircle{
                width: 5vw;
                height: 10vh;
                border-radius: 50%;
                background-color: rgb(174, 164, 147);
                position: absolute;
                top: 20%;
                right: 10%;
                opacity: 50%;
            }
            .rightText{
                width: 50vw;
                height: 60vh;
                background-color: transparent;
                position: absolute;
                top: 15%;
                right: 7%;
            }
        }
    }
    .block2{
        display: flex;
        .block2bgLeft{
            width: 25vw;
            height: 85vh;
            background-color: $maincolor;
            .block2bigbigCircle{
                position: absolute;
                width: 500px;
                height: 500px;
                border-radius: 50%;
                top: 98%;
                left: 5%;
                background-image: url("../../photo/moneytracker/記帳預覽.JPG");
                background-size:230%;
                background-repeat: no-repeat;
                background-position: 45%;
                transition: 1s;
                z-index: 1;
                animation: 4s movement linear infinite;
                @keyframes movement {
                    0%{
                        transform: translate(0px, 0px);
                    }
                    25%{
                        transform: translate(0px,10px);
                    }
                    50%{
                        transform: translate(0px,20px);
                    }
                    75%{
                        transform: translate(0px,10px);
                    }
                    100%{
                        transform: translate(0px,0px);
                    }
                    
                }
                &:hover{
                    border-radius: 10%;
                    cursor: pointer;
                }
            }
            hr{
                position: absolute;
                top: 172%;
                left: 4%;
                width: 553px;
                height: 10px;
                border: 0;
                padding: 3px;
                background: repeating-linear-gradient(135deg, #000000 0px, #000001 3px, transparent 1px, transparent 6px);
            }
        }
        .block2bgRight{
            width: 75vw;
            height: 85vh;
            position: relative;
            .block2greenCircle{
                width: 15vw;
                height: 30vh;
                border-radius: 50%;
                background-color: #3ed18a;
                position: absolute;
                top: 50%;
                right: 45%;
                opacity: 50%;
            }
            .block2grayCircle{
                width: 5vw;
                height: 10vh;
                border-radius: 50%;
                background-color: rgb(174, 164, 147);
                position: absolute;
                top: 20%;
                right: 10%;
                opacity: 50%;
            }
            .block2rightText{
                width: 50vw;
                height: 60vh;
                background-color: transparent;
                position: absolute;
                top: 15%;
                right: 7%;
            }
        }
    }

}
// 房地產互動
.bg2{
    width: 100vw;
    height: 85vh;
    background-color: $main;
    .top{
        width: 100vw;
        height: 20vh;
        background-color: rgb(204, 203, 203);
        display: flex;
        align-items: center;
        position: relative;
        .bg2BackBtn{
            background-color: red;
            font-size: 16pt;
            font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            border: 0;
            color: white;
            position: absolute;
            top: 5%;
            right: 2%;
        }
        .square{
            width: 80px;
            height: 80px;
            margin-left: 10vw;
            background-color: $maincolor2;
            cursor: pointer;
        }

        .spanfff{
            font-size: 16pt;
            margin: 0 2vw;
        }
        .span1{
            margin-left: 10vw;
        }
        span{
            font-size: 16pt;
        }
        i{
            margin-left: 30vw;
        }
        .btnPlace{
            background-color: $maincolor2;
            button{
            background-color: $maincolor2;
            border: 0;
            font-size: 16pt;   
            width: 7vw;
            height: 5vh;
            color: white;

            }
        }
    }
    // 房地產登入
    .login{
        .bgArea{
    width: 100vw;
    height: 100vh;
    background-color: #7889a1;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginArea{
        width: 20vw;
        height:50vh;
        background-color: #7889a1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .emailArea{
            position: relative;
                .fa-regular{
                position: absolute;
                top: 30px;
                left: 5px;
                }
                .fa-solid{
                position: absolute;
                top: 30px;
                right: 5px;
                }
                input{
                    width: 20vw;
                    padding: 0 8%;
                }
        }
        .passwordArea{
            position: relative;
                .boti{
                position: absolute;
                position: absolute;
                top: 30px;
                right: 5px;
                }
                input{
                    width: 20vw;
                    padding-right: 8%;
                }
        }
        .reg{
            width: 100%;
            display: flex;
            span{
                font-size: 14pt;
            }
            .regi{
                margin-left:9vw;
                font-weight: bold;
            }
        }
        button{
            background-color: $maincolor2;
            border-radius: 10px;
            width: 10vw;
            font-size: 14pt;
            color: white;
            margin-top: 50px;

        }
    }
}
    }
     // 房地產登入的登入
    .login2{
        .login2bg{
    background-color: #7889a1;
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login2sixArea{
        width: 50vw;
        height: 50vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background-color: #7889a1;
            button{
                width:15vw ;
                height: 20vh;
                color: white;
                background-color: $maincolor2;
            }
    }

}
    }
    // 房地產毛玻璃
    .blurblur{
        .blurbg{
    width: 100vw;
    height: 100vh;
    background-color: #7889a1;
    display: flex;
    justify-content: center;
    align-items: center;
    .blurArea{
        width: 40vw;
        height: 60vh;
        background-image: url("https://obs.line-scdn.net/0hD5wVUfsiGxpKLw1DuntkTXB5GHV5QwgZLhlKGQlBRS1mHQgbI0hWLGkoQCMwS1xEI0lcdGwtACsyGQ9PdB5W/w644");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .blur{
            width: 25vw;
            height: 30vh;
            &:hover{
                backdrop-filter: blur(20px);
            }
        }
    }
}
    }
    // 房地產城市
    .city{
        .citybg{
    width: 100vw;
    height: 100vh;
    background-color: #7889a1;
    display: flex;
    justify-content: center;
    align-items: center;
    .citybigArea{
        width: 35vw;
        height: 80vh;
        .citycity{
            h3{
            margin: 0;
            }
            hr{
                margin:11px 0 ;
            }
        }

        .citytwelveArea{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
        button{
            width: 7vw;
            height: 5vh;
            margin:0.5% 0.5% ;
            background-color: $maincolor2;
            color: white;
            border-radius: 10px;
            input{
                margin-right: 20px;
            }

        }
    }
}
    }
    // 房地產成市中心
    .citycenter{
        .citycenterbg{
            width: 100vw;
            background-color: #7889a1;
            display: flex;
            justify-content: center;
            align-items: center;
            .citycenterbigArea{
                width: 60vw;
                padding: 2% 2%;
                .citycenterone{
                    display: flex;
                    .citycenteroneLeft{
                        .citycentersquare{
                            width: 150px;
                            height: 150px;
                            border-radius: 20px;
                            margin: 10px 10px;
                            background-color:$maincolor2 ;
                        }
                    }
                    .citycenteroneRight{
                        width: max-content;
                        margin: 10px 10px;
                        span{
                            font-size: 20pt;
                        }
                        hr{
                            width: 45vw;
                        }
                    }
                }
            }
        }
    }
    // 房地產打字地方
    .final{
        .finalbg{
            width: 100vw;
            background-color: #7889a1;
            display: flex;
            justify-content: center;
            align-items: center;
            .finalbigArea{
                width: 60vw;
                height: 100vw;
                padding: 2% 2%;
                .finalone{
                    display: flex;
                    position: relative;
                    .finalbutton1{
                        position: absolute;
                        top: 50%;
                        left: -30px;
                        transform: translateY(-50%);
                        font-size: 24px;
                        cursor: pointer;
                        padding: 10px;
                        background-color:transparent;
                        border: 0;
                        color: #fff;
                        &:before{
                            content: '';
                            display: block;
                            width: 0;
                            height: 0;
                            border-top: 10px solid rgb(233, 233, 233);
                            border-right: 10px solid transparent;
                            border-left: 10px solid transparent;
                            transform:rotate(90deg);
                        
                        }

                    }
                    .finalbutton2{
                        position: absolute;
                        top: 50%;
                        left: 160px;
                        transform: translateY(-50%);
                        font-size: 24px;
                        cursor: pointer;
                        padding: 10px;
                        background-color:transparent;
                        border: 0;
                        color: #fff;
                        &:before{
                            content: '';
                            display: block;
                            width: 0;
                            height: 0;
                            border-top: 10px solid rgb(233, 233, 233);
                            border-right: 10px solid transparent;
                            border-left: 10px solid transparent;
                            transform:rotate(270deg);
                        
                        }

                    }
                    .finaloneLeft{
                        .finalsquare{
                            width: 150px;
                            height: 150px;
                            border-radius: 20px;
                            margin: 10px 10px;
                            background-color:$maincolor2 ;
                        }
                    }
                    .finaloneRight{
                        width: max-content;
                        margin: 10px 10px;
                        span{
                            font-size: 20pt;
                        }
                        hr{
                            width: 45vw;
                        }
                    }
                }
            }
            textarea{
                margin-top: 100px;
                width: 58vw;
                height: 90vh;
            }
        }
    }
    // 房地產最下面三個頁面跳轉
    .bot{
    width: 100vw;
    height: 40vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #7889a1;
    padding: 0 10vw;
    button{
    width: 20vw;
    height: 20vh;
    background-color: $maincolor2;
    } 
    }
}
//記帳的互動視窗
.bg3{
    .trackerbg{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: bisque;
    position: relative;
        .trackerbgbtn{
            position: absolute;
            top: 5%;
            right: 5%;
            background-color: red;
            border: 0;
            color: white;
        }
        .Area{
            width: 30vw;
            height: 50vh;
            // background-color: aqua;
            h1{
            text-align: center;
            color: $maincolor3;
            }
            .page{
            width: 30vw;
            margin-left: 40px;
            input{
                width: 70%;
                height: 4vh;
                padding-right: 20px;
                border-radius: 5px;
            }
            }
            .Password{
            position: relative;
            i{
                position: absolute;
                right: 32%;
                bottom: 10%;
            }
            }
            .btnArea{
            margin-top: 50px;
            text-align: center;
            button{
                border: 0;
                border-radius: 10px;
                width: 100px;
                height: 30px;
                margin: 0 2%;
            }
            .blue{
                background-color: $maincolor3;
            }
            }
        }
    }
    .trackerbg2{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $maincolor3;
    .Area2{
        width: 30vw;
        height: 50vh;
        // background-color: aqua;
        h1{
        text-align: center;
        color:white;
        }
        .page2{
        width: 30vw;
        margin-left: 40px;
        color: white;
        input{
            width: 70%;
            height: 4vh;
            padding-right: 20px;
            border-radius: 5px;
        }
        }
        .Password2{
        position: relative;
        i{
            position: absolute;
            right: 31%;
            bottom: 10%;
            color: black;
        }
        }
        .repeat{
        position: relative;
        i{
            position: absolute;
            right: 31%;
            bottom: 10%;
            color: black;
        }
        }
        .btnArea2{
        margin-top: 50px;
        text-align: center;
        button{
            border: 0;
            border-radius: 10px;
            width: 100px;
            height: 30px;
            margin: 0 2%;
            background-color: gray;
            color: white;
        }
        .blue2{
            background-color: white;
            color: $maincolor3;
        }
        }
    }
    }
    .trackerbg3{
        .trackerbg3bg{
        width: 100vw;
        height: 100vh;
        display: flex;
        .trackerbg3bgLeft{
            width: 30vw;
            height: 100vh;
            text-align: center;
            background-color: $maincolor3;
            color: white;
            h2{
            margin-top: 20vh;
            }
            h4{
            margin-top: 10vh;
            }
        }
        .trackerbg3bgRight{
            width: 70vw;
            height: 100vh;
            .trackerbg3page{
            margin: 0% 30%;
            }
            .trackerbg3top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15vh;
            p{
                font-size: 20pt;
                font-weight: bold;
                text-align: center;
            }
            .trackerbg3topl{
                color: green;
            }
            .trackerbg3topr{
                color: red;
            }
            }
            .trackerbg3mid{
            text-align: center;
            margin-top: 2vh;
            button{
                border: 0;
                background-color: $maincolor3;
                color: white;
                width: 200px;
                height: 30px;
                border-radius: 5px;
            }
            }

            // 隱藏超出版面
            .trackerbg3bot{
            margin-top: 3vh;
            height: 50vh;
            background-color: white;
            overflow: auto;
            .trackerbg3newArea{
                display: flex;
                justify-content: space-between;
                padding: 3% 3%;
                border: 1px solid $maincolor3;
                background-color: transparent;
                border-radius: 5px;
                margin: 2% 2%;
                span{
                margin: 0 10px;
                font-size: 16pt;
                }
                button{
                color: white;
                background-color: $maincolor3;
                border-radius: 5px;
                border: 0;font-size: 16pt;
                }
            }
            }
            
        }
}

    }
    .trackerbg4{
        .trackerbg4blackBLur{
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .7);
        position: absolute;
        top: 0;
        left: 0;
        .trackerbg4bg2{
        width: 40vw;
        height: 60vh;
        background-color: white;
        border-radius: 5px;
        border: 1px solid $maincolor3;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .trackerbg4addArea{
            width: 20vw;
            height: 40vh;
            background-color: white;
            font-weight: bold;
            p{
            color: $maincolor3;
            font-size: 16pt;
            margin: 0;
            }
            input{
            margin-top: 10px;
            width: 98%;
            height: 4vh;
            border: 1px solid $maincolor3;
            }
            .trackerbg4addbtn{
            text-align: center;
            button{
                margin-top: 30px;
                background-color: $maincolor3;
                border: 0;
                color: white;
                border-radius: 5px;
                width: 200px;
                height: 30px;
            }
            }
        }
        .trackerbg4xxBtn{
            position: absolute;
            right:0;
            top: 0;
            font-size: 30pt;
            color: $maincolor3;
            border: 0;
            margin: 1% 1%;
            background-color: transparent;
        }
        }
        }
    }
    .trackerbg5{
        .trackerbg5blackBLur2{
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .7);
        position: absolute;
        top: 0;
        left: 0;
        .trackerbg5bg3{
        width: 20vw;
        height: 30vh;
        background-color: white;
        border: 3px solid $maincolor3;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        .trackerbg5delArea{
            width: 20vw;
            height: 30vh;
            background-color: white;
            text-align: center;
            h2{
            margin-top: 7vh;
            }
            button{
            border: 0;
            border-radius: 5px;
            background-color: red;
            color: white;
            width: 200px;
            height: 40px;
            }
            
        }
        .trackerbg5delBackBtn{
            position: absolute;
            top: 2%;
            right: 2%;
            border: 0;
            background-color: transparent;
            color: $maincolor3;
            font-size: 18pt;

            }

        }
        }

    }
}
</style>
