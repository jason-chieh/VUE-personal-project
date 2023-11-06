<script >
import skillHeader from "./skillHeader.vue";
import viewSmallProject from "./viewSmallProject.vue";
import { RouterLink,RouterView } from 'vue-router';

import {mapState,mapActions} from 'pinia';
import indexState from '../stores/indexState';
export default {
    data(){
        return{
            // 畫面跳轉
            page:0,
            // 猜數字變數
            small:1,
            big:100,
            variable:Math.floor(Math.random()*100)+1,
            x:1,
            guessnumber:0,
            titleh1:"猜數字遊戲(上限5)",
            showh1:"1~100",
            // 氣象局api
            allData:[],
            // 蛋糕的照片嘗試用v-for匯入
            newsPhotoArr:["../../photo/cake/5.png","../../photo/cake/6.png","../../photo/cake/7.png"],

        }
    },
    methods:{
        // 這邊是header的來回切換
        goback(){
            this.$router.push("/")
        },
        javaPageChange(x){
            this.page=x
        },
        htmlPageChange(y){
            this.page=y
        },
        vuePageChange(z){
            this.page=z
        },
        // 這邊是html照片的來回切換
        onePhotoGo(){
            this.page=1
        },
        Photoback(){
            this.page=0
        },
        twoPhotoGo(){
            this.page=2
        },
        threePhotoGo(){
            this.page=3
        },
        fourPhotoGo(){
            this.page=3.1
        },
        oneHtml(){
            this.page=0.5
        },
        twoHtml(){
            this.page=0.6
        },
        threeHtml(){
            this.page=0.7
        },
        fourHtml(){
            this.page=0.8
        },
        javaVideoHtml(){
            this.page=4.1
        },
        javaVideo2Html(){
            this.page=4.2
        },
        javaVideo3Html(){
            this.page=4.3
        },
        javaVideo4Html(){
            this.page=4.4
        },
        //找質數java
        findPrime(){
            const enternumber = document.getElementById("enternumber");
            const totalnumber = document.getElementById("totalnumber");
            const shownumber = document.getElementById("shownumber");

            let enter = parseInt((enternumber.value));
            let arr = [];

            for(let i=1;i<enter;i++){
                if(isPrime(i)){
                    arr.push(i)
                }
            }

            function isPrime(i) {
                if (i == 1) {
                    return false;
                }
                if  (i ==2){
                    return true;
                }
                for (let k = 2; k < i; k++) {
                    if (i % k == 0) {
                    return false;
                    }
                }
                return true;
            }
            totalnumber.innerText ='總共'+ arr.length+ '個'
            shownumber.innerText = arr

        },
        // 猜數字
        findNumber(){
            console.log(this.variable)
    
                while(this.x<6){
                    this.guess();
                    this.titleh1 ="已猜次數"+this.x
                    this.x++;
                    break;
                }
                while(this.x==6){
                    this.guess();
                    this.titleh1 ='次數已達上限'
                    break;
                }
        },
        guess(){
            
            if(this.guessnumber>this.variable && this.big>=this.guessnumber){
                this.big = this.guessnumber;
                this.guessnumber= "";
                this.showh1 =this.small+"~"+this.big;        
            }
            else if(this.guessnumber<this.variable && this.guessnumber>=this.small){
                this.small = this.guessnumber;
                this.guessnumber= "";
                this.showh1 =this.small+"~"+this.big;
            }
            else if(this.guessnumber>this.big || this.guessnumber<this.small){
                this.showh1="猜數字區間"+this.small+"~"+this.big
                this.guessnumber= "";
            }
            else{
                this.showh1 = this.guessnumber+"恭喜猜中囉寶貝"
            }
        },
        // 天氣api
        weatherApiChanged(){
                const selectCity = document.getElementById("selectCity")
                const city = document.getElementById("city")
                const temperature = document.getElementById("temperature")
                const weather = document.getElementById("weather")
                const rainyrate = document.getElementById("rainyrate")
                const photoArea = document.getElementById("photoArea")

                let locationName ="";
                let  weatherName="";
                let  mintempatuare="";
                let  maxtempatuare="";
                let  rainyrate1="";
                let  weanumber="";
                
                let cityArr = this.allData.records.location;
                // console.log(this.allData)

                cityArr.forEach(element => {    
                    if(selectCity.value ==element.locationName){
                        locationName = element.locationName;
                        city.innerText = "城市:"+locationName;

                        weatherName = element.weatherElement[0].time[0].parameter.parameterName;
                        weather.innerText = "天氣:"+weatherName;

                        mintempatuare = element.weatherElement[2].time[0].parameter.parameterName;
                        maxtempatuare = element.weatherElement[4].time[0].parameter.parameterName;
                        temperature.innerText = "溫度:"+mintempatuare+"度C"+"~"+maxtempatuare+"度C"

                        rainyrate1 = element.weatherElement[1].time[0].parameter.parameterName;
                        rainyrate.innerText = "降雨機率:"+rainyrate1+"%";

                        weanumber = element.weatherElement[0].time[0].parameter.parameterValue;
                        console.log(weanumber)

                        if(weanumber==1){
                            photoArea.innerHTML = "<i style='font-size:100pt;' class='fa-solid fa-sun'></i>"
                        }else if(weanumber>1 && weanumber<=5 ){
                            photoArea.innerHTML = "<i style='font-size:100pt;' class='fa-solid fa-cloud-sun'></i>"
                        }
                        else if(weanumber>5 && weanumber<=8 ){
                            photoArea.innerHTML = "<i style='font-size:100pt;' class='fa-solid fa-cloud'></i>"
                        }
                        else if(weanumber>8 && weanumber<=17 ){
                            photoArea.innerHTML = "<i style='font-size:100pt;' class='fa-solid fa-cloud-rain'></i>"
                        }
                        else if(weanumber>17){
                            photoArea.innerHTML = "<i style='font-size:100pt;' class='fa-solid fa-bolt'></i>"
                        }

                    }
                });
        },
        // 進階api
        pingdoneApi(){
            const pingdone = document.getElementById("pingdone")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(pingdone.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        newTaipeiApi(){
            const newTaipei = document.getElementById("newTaipei")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(newTaipei.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        taipeiApi(){
            const taipei = document.getElementById("taipei")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(taipei.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        tainanApi(){
            const tainan = document.getElementById("tainan")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(tainan.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        KaohsiungApi(){
            const Kaohsiung = document.getElementById("Kaohsiung")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Kaohsiung.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        KeelungApi(){
            const Keelung = document.getElementById("Keelung")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Keelung.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        ChanghuaApi(){
            const Changhua = document.getElementById("Changhua")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Changhua.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        hualienApi(){
            const hualien = document.getElementById("hualien")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(hualien.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        taitungApi(){
            const taitung = document.getElementById("taitung")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(taitung.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        nantouApi(){
            const nantou = document.getElementById("nantou")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(nantou.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        ChiayiApi(){
            const Chiayi = document.getElementById("Chiayi")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Chiayi.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        Hsinchu_CountyApi(){
            const Hsinchu_County = document.getElementById("Hsinchu_County")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Hsinchu_County.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        Hsinchu_CityApi(){
            const Hsinchu_City = document.getElementById("Hsinchu_City")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Hsinchu_City.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        YilanApi(){
            const Yilan = document.getElementById("Yilan")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Yilan.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        MiaoliApi(){
            const Miaoli = document.getElementById("Miaoli")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Miaoli.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        YunlinApi(){
            const Yunlin = document.getElementById("Yunlin")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Yunlin.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        TaichungApi(){
            const Taichung = document.getElementById("Taichung")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Taichung.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        TaoyuanApi(){
            const Taoyuan = document.getElementById("Taoyuan")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Taoyuan.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        kinmenApi(){
            const kinmen = document.getElementById("kinmen")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(kinmen.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        PenghuApi(){
            const Penghu = document.getElementById("Penghu")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Penghu.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        LianjiangApi(){
            const Lianjiang = document.getElementById("Lianjiang")
            const showCityName = document.getElementById("showCityName")
            const showWeather = document.getElementById("showWeather")
            const showMinTempatuare = document.getElementById("showMinTempatuare")
            const showMaxTempatuare = document.getElementById("showMaxTempatuare")
            const showIcon = document.getElementById("showIcon")

            let cityArr = this.allData.records.location;
            cityArr.forEach(element => {
                if(Lianjiang.attributes.value.value==element.locationName){
                    showCityName.innerText = "城市:"+element.locationName;
                    showWeather.innerText = "天氣:"+element.weatherElement[0].time[0].parameter.parameterName;
                    showMinTempatuare.innerText =element.weatherElement[2].time[0].parameter.parameterName+"°C";
                    showMaxTempatuare.innerText = element.weatherElement[4].time[0].parameter.parameterName+"°C";

                    if(element.weatherElement[0].time[0].parameter.parameterValue==1){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-regular fa-sun"></i>'
                    }
                    if(1<element.weatherElement[0].time[0].parameter.parameterValue&&6>=element.weatherElement[0].time[0].parameter.parameterValue){
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud"></i>'
                    }else{
                        showIcon.innerHTML = '<i style="font-size: 100pt;" class="fa-solid fa-cloud-rain"></i>'
                    }
                }
            });
        },
        // pinia的方法
        ...mapActions(indexState,["getLocation","setLocation"]),

    },
    components:{
        RouterView,
        RouterLink,
        skillHeader,
        viewSmallProject
    },
    computed:{
        ...mapState(indexState,["location","locationInfo"])
    },
    // 目前監聽頁面轉換
    watch:{
        page(newPage, oldPage) {
        // console.log(`page 變化了，新值為: ${newPage}，舊值為: ${oldPage}`);
        this.setLocation(newPage)
    }
    },
    mounted(){
        fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-E86AF89D-8D80-4BBC-859D-C78A8F8C5F10")
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //     allData=data ;
        //     this.allData1=allData;
        // })
        .then(response => {
        // 將API回應轉換為JSON格式
        return response.json();
        })
        .then(data => {
        // 將API回應的JSON數據設置到組件的responseData數據屬性中
        this.allData = data;
        })
    }
}
</script>


<template>
    <skillHeader @javaPageChange="javaPageChange" @htmlPageChange="htmlPageChange" @vuePageChange="vuePageChange"/>
    <!-- html網頁列表 -->
    <div v-if="page==0" class="bg">
        <div class="one pageBlock">
            <div class="oneLeft"></div>
            <div class="oneMid">
                <h1>初出茅廬</h1>
                <p>第一個作品選擇自己喜歡的咖啡品牌，當作練習的對象，雖然沒辦法100%復刻官網原有的樣子但是讓我收穫滿滿</p>
                <button @click="oneHtml" type="button">按我互動</button>
            </div>
            <div class="oneRight">
                <img @click="onePhotoGo" src="../../skillPhoto/作品一預覽.png" alt="">
            </div>
        </div>
        <div class="two pageBlock">
            <div class="greenBlock">
                <img @click="twoPhotoGo" src="../../skillPhoto/熊預覽.JPG" alt="">
            </div>
            <div class="twoText">
                <h1>經驗累積</h1>
                <p>透過自身大量練習基本架構，累積自己的實作能力，靈活運用HTML,CSS實現畫面</p>
                <button @click="twoHtml" type="button">按我互動</button>
            </div>
        </div>
        <div class="three pageBlock">
            <div class="threeText">
                <h1>靈活運用</h1>
                <p>嘗試透過網頁localStorage，搭配JavaScript撰寫登入系統，註冊到登入網頁實現。</p>
                <button @click="threeHtml" type="button">按我互動</button>
            </div>
            <div class="threePhoto">
                <img @click="threePhotoGo" src="../../skillPhoto/熊登入.png" alt="">
            </div>

        </div>
        <div class="four1 pageBlock">
            <div class="four1Photo1">
                <img @click="fourPhotoGo" src="../../photo/cake/蛋糕預覽左.JPG" alt="">
            </div>
            <div class="four1Photo2">
                <img @click="fourPhotoGo" src="../../photo/cake/蛋糕預覽右.JPG" alt="">
            </div>
            <div class="four1Text">
                <h1>善用工具</h1>
                <p>學會外部插件bootstrap可套入預設的版面加以靈活運用</p>
                <button @click="fourHtml" type="button">按我互動</button>
            </div>
        </div>
    </div>
    <!-- java網頁列表 -->
    <div   v-if="page==4" class="bg2">
        <div class="b1">
            <div class="videoArea">
                <video @click="javaVideoHtml"  autoplay muted loop>
                    <source src="../../skillPhoto/找質數.mp4">
                </video>
            </div>
            <p>從基本數學邏輯開始學起，從簡單迴圈訓練自己的邏輯</p>
        </div>
        <div class="b2">
            <div class="videoArea">
                <video @click="javaVideo2Html" autoplay muted loop>
                    <source src="../../skillPhoto/猜數字.mp4">
                </video>
            </div>
            <p>製作小遊戲"終極密碼"，設定判斷式並限制猜數字的次數</p>
        </div>
        <div class="b3">
            <div class="videoArea">
                <video @click="javaVideo3Html"   autoplay muted loop>
                    <source src="../../skillPhoto/天氣api串聯.mp4">
                </video>
            </div>
            <p>學習API的串接跟資料抓取，並透過HTML值的改變達到資料即時更新</p>
        </div>
        <div class="b4">
            <div class="videoArea">
                <video  @click="javaVideo4Html"  autoplay muted loop>
                    <source src="../../skillPhoto/天氣subline.mp4">
                </video>
            </div>
            <p>自己學習SUBLINE的功能，透過SVG圖檔轉換HTML並呈現，滑鼠滑動到設定的區塊內會有位置改變，並且核對API資料並呈現</p>
        </div>
    </div>
    <!-- vue小專案區 -->
    <div v-if="page==5" class="bg3">
        <viewSmallProject />
    </div>




<!-- 顯示預覽圖片區 -------------------------------------------------------------------------------->
<div @click="Photoback" v-if="page==1" class="onePhotoBlack">
    <div class="onePhotoArea">
        <img src="../../skillPhoto/作品一.png" alt="">
    </div>
</div>
<div @click="Photoback" v-if="page==2" class="twoPhotoBlack">
    <div class="twoPhotoArea">
        <img src="../../skillPhoto/熊網頁.png" alt="">
    </div>
</div>
<div @click="Photoback" v-if="page==3" class="threePhotoBlack">
    <div class="threePhotoArea">
        <img src="../../skillPhoto/熊登入完整.png" alt="">
    </div>
</div>
<div @click="Photoback" v-if="page==3.1" class="fourPhotoBlack">
    <div class="fourPhotoArea">
        <img src="../../photo/cake/蛋糕全.png" alt="">
    </div>
</div>

<!-- html網頁列表的互動式網頁 ---------------------------------------------------------------------->

            <!-- 星巴克 -->
<div v-if="page==0.5" class="bgOneShowAll">
        <div class="greenheader "></div>
        <div class="grayheader">
        <div class="grayheaderContent page">
                <a href="https://www.starbucks.com.tw/home/index.jspx?r=9"><img src="../../photo/stuckbus/星巴克logo.png" alt="星巴克logo" class="logoPicture"></a>
                            <div class="dropdownMenu">
                                <button type="button" class="dropbtn">咖啡</button>
                                    <div class="dropcontent">
                                        <a href="https://www.starbucks.com.tw/products/drinks.jspx">咖啡飲品</a>
                                        <a href="https://www.starbucks.com.tw/coffee/coldbrew/coldbrew.jspx">冷萃咖啡</a>
                                        <a href="https://www.starbucks.com.tw/coffee/our-coffees.jspx">居家調理咖啡</a>
                                        <a href="https://www.starbucks.com.tw/coffee/reserve.jspx">典藏咖啡</a>
                                    </div>
                            </div>
                            <div class="dropdownMenu">
                                <button type="button" class="dropbtn">商品</button>
                                <div class="dropcontent">
                                    <a href="https://www.starbucks.com.tw/products/drinks.jspx">飲品</a>
                                    <a href="https://www.starbucks.com.tw/products/food.jspx">糕點</a>
                                    <a href="https://www.starbucks.com.tw/products/collection.jspx">咖啡用品及設備</a>
                                    <a href="https://www.starbucks.com.tw/products/otgcard/view.jspx">隨行卡</a>
                                </div>
                            </div>
                            <div class="dropdownMenu">
                                <button type="button" class="dropbtn">門市</button>
                                <div class="dropcontent">
                                    <a href="https://www.starbucks.com.tw/stores/allevent.jspx">最新活動</a>
                                    <a href="https://www.starbucks.com.tw/stores/reserve_modern.jspx">特色門市</a>
                                    <a href="https://www.starbucks.com.tw/stores/lecture.jspx">門市服務</a>
                                </div>
                            </div>
                            <div class="dropdownMenu">
                                <button type="button" class="dropbtn">星禮程</button>
                                <div class="dropcontent">
                                    <a href="https://www.starbucks.com.tw/rewards/current_activity.jspx">專屬活動</a>
                                    <a href="https://goldreward.starbucks.com.tw/?_gl=1*lzupnf*_ga*ODI1MTg2Mzk5LjE2OTUyMTY3MTc.*_ga_K7P3P4D8DP*MTY5NTY1MDQyMi4yMy4xLjE2OTU2NTA4MjkuMzYuMC4w">累積點數金禮程</a>
                                    <a href="https://www.starbucks.com.tw/faq/faq.jspx">常見問題</a>
                                </div>
                            </div>
                            <div class="dropdownMenu">
                                <button type="button" class="dropbtn">第四生活空間</button>
                                <div class="dropcontent">
                                    <a href="https://www.starbucks.com.tw/digital/apps.jspx">星巴克行動app</a>
                                    <a href="https://www.starbucks.com.tw/digital/delivery.jspx">外送服務</a>
                                    <a href="https://www.starbucks.com.tw/digital/starnews_overview.jspx">咖啡新聞</a>
                                    <a href="#">咖啡訂閱服務</a>
                                    <a href="https://www.starbucks.com.tw/digital/socialmedia.jspx">星巴克社群服務</a>
                                    <a href="https://www.starbucks.com.tw/digital/newspaper.jspx">星消息電子報</a>
                                </div>
                            </div>
                            <div class="dropdownMenu">
                                <button type="button" class="dropbtn">送禮專區</button>
                                <div class="dropcontent">
                                    <a href="#">飲料卷</a>
                                    <a href="#">中秋禮盒</a>
                                    <a href="#">電子票卷</a>
                                    <a href="#">星意禮</a>
                                    <a href="#">隨行卡企業採購</a>
                                </div>
                            </div>
                            <a href="https://www.starbucks.com.tw/onlineshopping/index.jspx"><button type="button" class="livestorebtn">線上門市</button></a>
                            <a href="https://www.starbucks.com.tw/25yearsintaiwan/index.jspx"><button type="button" class="annivesarybtn">25週年專區</button></a>

                            <a href="https://www.starbucks.com.tw/recruit/opportunities.jspx"><button type="button" class="recuritbtn"><i class="fa-solid fa-person"></i>  夥伴招募</button></a>
                    

                            <a href="https://www.starbucks.com.tw/recruit/opportunities.jspx"><button type="button" class="mapbtn"><i class="fa-solid fa-location-dot"></i>  門市查詢    </button></a>
                            
                        </div>    
                    </div>            
                    <div class="moonfestival page">
                        <a href="https://www.starbucks.com.tw/products/food/festival/23_mid-autumn/index.jspx"><img  src="../../photo/stuckbus/星巴克中秋.JPG" class="moonimg" alt=""></a>
                    </div>
                    <div class="imgplayer">
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                <a href="https://www.starbucks.com.tw/products/collection.jspx"><img src="../../photo/stuckbus/banner1.JPG" class="d-block w-100" alt="..."></a>
                                </div>
                                <div class="carousel-item">
                                <a href="https://www.starbucks.com.tw/coffee/our-coffees.jspx"><img src="../../photo/stuckbus/banner2.JPG" class="d-block w-100" alt="..."></a>
                                </div>
                                <div class="carousel-item">
                                <a href="https://www.starbucks.com.tw/products/collection/view.jspx?catId=114"><img src="../../photo/stuckbus/banner3.JPG" class="d-block w-100" alt="..."></a>
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
                    </div>
                    <div class="reward page">
                    </div>
                    <div class="fourbox page">
                        <a href="https://www.starbucks.com.tw/stores/allevent/show.jspx?n=3145"><img src="../../photo/stuckbus/box1.JPG" class="box1img four" alt=""></a>
                        <a href="https://www.starbucks.com.tw/faq/otgcard_9.jspx"><img src="../../photo/stuckbus/box2.JPG" class="box2img four" alt=""></a>
                        <a href="https://www.starbucks.com.tw/coffee/how-to-customize/index.jspx"><img src="../../photo/stuckbus/box3.JPG" class="box3img four" alt=""></a>
                        <a href="https://www.starbucks.com.tw/digital/delivery.jspx"><img src="../../photo/stuckbus/box4.JPG" class="box4img four" alt=""></a>
                    </div>

                    <div class="socialmedia ">
                        <div class="socialmediacontent page">
                            <a href="https://www.facebook.com/starbuckstaiwan?ref=nf"><i class="fa-brands fa-facebook-f" style="font-size:25pt;"></i></a>
                            <a href="https://www.instagram.com/starbuckstw/"><i class="fa-brands fa-instagram" style="font-size: 25pt;margin-left: 15px;" ></i></a>
                            <a href="https://www.youtube.com/user/STARBUCKSTW?feature=mhum"><i class="fa-brands fa-youtube" style="font-size: 25pt;margin-left: 15px;"></i></a>
                            <a href="https://line.me/R/ti/p/@471vnurh?from=page&openQrModal=true&searchId=471vnurh"><i class="fa-brands fa-line" style="font-size: 25pt;margin-left: 15px;"></i></a>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="footercontent page">
                        <h3>認識我們
                            <p>關於星巴克</p>
                            <p>企業責任</p>
                            <p>企業公告</p>
                            <p>星聞室</p>
                        </h3>
                        <h3>夥伴招募
                            <p>夥伴招募</p>
                            <p>成為我們的夥伴</p>
                            <p>我們的福利</p>
                            <p>發展晉升與專業學習</p>
                        </h3>
                        <h3>社群平台
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>YouTube</p>
                            <p>LINE</p>
                        </h3>
                        <h3>顧客關懷
                            <p>常見問題</p>
                            <p>我在星巴克的小故事</p>
                            <a href="https://www.starbucks.com.tw/stores/allevent/show.jspx?n=1016"><p style="color: green;font-weight: bold;">網路謠言澄清說明</p></a>
                        </h3>
                        </div>
                    </div>
</div>
            <!-- 熊熊網站 -->
<div v-if="page==0.6" class="bgTwoShowAll">
    <div class="header">
        <div class="headLeft">
            <button type="button" id="storeInformation">店家介紹</button>
            <a href=""><button type="button">產品列表</button></a>
            <button type="button">登入夜面</button>
            <button type="button">線上購物</button>
        </div>
        <div class="headlogo"></div>
        <div class="headRight">
            <button type="button">門市資訊</button>
            <button type="button">加盟專區</button>
            <button type="button">聯絡我們</button>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-regular fa-user"></i>
        </div>
    </div>
    <div class="videoArea boder">
        <video class="video-back"  autoplay muted loop>
            <source src="../../photo/bear/New Diet _ We Bare Bears _ Cartoon Network (1).mp4"> 
        </video>
    </div>
    <div class="introduce" id="introduce1">
        <div class="threeBearIntroduce">
            <img class="pictureIntroduce0" src="../../photo/bear/介紹.png" alt="">
            <img class="pictureIntroduce" src="../../photo/bear/toppng.com-we-bare-bears-background-2775x2046.png" alt="">
        </div>
        <div class="textArea">
            <img class="threeBearLogon" src="../../photo/bear/We_Bare_Bears.png" alt="">
            <h1>熊熊遇見你介紹</h1>
            <p>《熊熊遇見你》是卡通頻道工作室製作的改編自丹尼爾·鍾的網路漫畫《三裸熊》的美國動畫情景喜劇。該節目講述了三隻熊，灰熊、熊貓和白熊，以及他們在舊金山灣區與人類世界融合的尷尬嘗試。
            該劇於2015年7月27日首播,2019年5月27日結束,共播出4季140集。改編電影於2020年6月30日以數字方式發行,隨後於2020年9月7日在卡通網絡播出。一個名為熊熊寶貝遇見你的衍生劇集於2019年5月宣布正在開發中,並於2022年1月1日首播</p>
            <div class="moreButtonPlace">
                <button type="button" class="moreButton" id="introduceBtn"> <a href="https://zh.wikipedia.org/zh-tw/%E5%92%B1%E4%BB%AC%E8%A3%B8%E7%86%8A">查看更多</a></button>
            </div>
        </div>
        <div class="threeBearPlace">
            <img class="threeBear" src="../../photo/bear/三隻熊.png" alt="">
        </div>
    </div>

</div>
            <!-- 熊熊登入 -->
<div v-if="page==0.7" class="bgThreeShowAll">
    <div class="outArea">
    <div class="area">
        <h1>LOGIN</h1>
        <div class="inputBox">
            <input type="email" placeholder="email">
            <i class="fa-solid fa-square-envelope"></i>
        </div>
        <div class="inputBox">
            <input type="password" placeholder="password">
            <i class="fa-solid fa-lock"></i>
        </div>
        <div class="rember-foget">
            <label for=""><input type="checkbox" name="" id="">remenber me</label>
            <a href="">forget password</a>
        </div>
        <button type="button">login</button>
        <div class="register">
            <p>Don't have account?
                <a href="">register</a>
            </p>
        </div>
    </div>
    </div>
</div>
            <!-- 蛋糕切版 -->
<div v-if="page==0.8" class="bgFourShowAll">
    <div class="header page111">
        <div class="block"></div>
        <div class="photo1"></div>
    </div>
    <div class="content page111">
        <div class="contentText">
            <h1>title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur r, sir, sit amet consectetr, sit amet consectetr, sit amet consectetr, sit amet consectett amet consectetr, sit ameet consectetur r, sir, sit amet consectetr, sit amet consectetr, sit amet consectetr, sit amet consectett amet consectetr, sit ameet consectetur r, sir, sit amet consectetr, sit amet consectetr, sit amet consectetr, sit amet consectett amet consectetr, sit ameet consectetur r, sir, sit amet consectetr, sit amet consectetr, sit amet consectetr, sit amet consectett amet consectetr, sit amet consectetr, sit amet consectetr, sit amet consectetadipisicing elit. Cumque eius a suscipit ex explicabo illo vel est facilis magni cum.</p>
        </div>
        <img src="../../photo/cake/1.png" alt="">
    </div>
    <div class="onsale page111">
        <h1>ON SALE</h1>
        <div class="threeBlock">
            <div class="photo3">
                <button type="button">item</button>
            </div>
            <div class="photo4">
                <button type="button">item</button>
            </div>
            <div class="photo5">
                <button type="button">item</button>
            </div>
        </div>
        <hr />
    </div>
    <div class="news page111">
        <h1>NEWS</h1>
        <div class="bootstrapArea">

            <div class="card" style="width: 20rem;" v-for="item in newsPhotoArr">
                <img :src="item" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                
            </div>

        </div>
        <button type="button">more</button>
    </div>

    <div class="content2 page111">
        <img src="../../photo/cake/8.png" alt="">
        <div class="c2Text">
            <h1>title</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi consectetur obcaecati ipsa vel provident quibusdam minus dolore ducimus corrupti accusamus!</p>
        </div>
    </div>


    <div class="footer">
        <h3>2023 cpoyright @tag you are great</h3>
    </div>

</div>
<!-- java網頁列表的互動式網頁 -->

            <!-- 找質數 -->
<div v-if="page==4.1" class="bg2Show">
    <div class="backgroundColor">
        <div class="title">
            <h1>找質數</h1>
        </div>
        <div class="game">
            <div class="gameinput">
                <span>找</span>
                <input id="enternumber" type="number" style="border-radius: 5px;margin: 0 10px;">
                <span>以內的質數:</span>
                <button @click="findPrime" type="button" id="findbtn">尋找</button><br>
            </div>
            <h3 id="totalnumber">總共 _ 個</h3>

            <h3 id="shownumber" table style="word-break:break-all">.........</h3>

        </div>
    </div>
</div>
            <!-- 猜數字 -->
<div v-if="page==4.2" class="bg2Show2">
    <div class="outGame">
    <div class="game">
        <h1 id="titleh1">{{this.titleh1}}</h1>
        <h1 id="showh1" style="font-size: 40pt;" >{{this.showh1}}</h1>
        <input type="number" style="font-size: 20pt;" id="" v-model="this.guessnumber"><br>
        <button @click="findNumber" type="button" id="guessNumberCheckBtn">回答</button>
    </div>
    </div>
</div>
            <!-- 天氣api -->
<div v-if="page==4.3" class="bg2Show3">
    <div class="outweather">
    <div class="area">
        <h1>天 氣 預 報</h1>
        <div class="checkboxplace">
            <select @change="weatherApiChanged" name="" id="selectCity" >
                <option value="">請選擇</option>
                <option value="臺北市">臺北市</option>
                <option value="新北市">新北市</option>
                <option value="桃園市">桃園市</option>
                <option value="臺中市">臺中市</option>
                <option value="臺南市">臺南市</option>
                <option value="連江縣">連江縣</option>
            </select>
        </div>

        <div class="showweather">
            <div class="left">
                <h3 id="city">城市:</h3>
                <h3 id="temperature">氣溫:</h3>
                <h3 id="weather">天氣:</h3>
                <h3 id="rainyrate">降雨機率:</h3>
            </div>

            <div id="photoArea" class="right">
                <img src="https://en.pimg.jp/046/559/339/1/46559339.jpg" alt="">
            </div>
        </div>
    </div>
    </div>
</div>
            <!-- 進階天氣 -->
<div v-if="page==4.4" class="bg2Show4">
    <div class="outsvg">
        <svg version="1.1"
	 id="svg2606" inkscape:output_extension="org.inkscape.output.svg.inkscape" inkscape:version="0.46" sodipodi:docname="Taiwan_ROC_political_division_map.svg" sodipodi:version="0.32" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 850 1200"
	 style="enable-background:new 0 0 850 1200;" xml:space="preserve">

<path id="path2462" class="st0" d="M314.2,1002.4l-3.5,6.2l1,0.9l1.3,0.4l2.7-0.8l0.5-1.1l3-3.2l2.9-1.8l0.4-1l-0.3-1.1l-1.1-0.5
	l-0.4-0.9l-0.9-0.7l-1.3,0.1l-2.1,1l-0.7,0.8l-0.9,0.4l-0.5,0.9L314.2,1002.4L314.2,1002.4z"/>
<path id="path2464" class="st0" d="M77.1,584.3v1.4V584.3L77.1,584.3z"/>
<path id="path2466" class="st0" d="M95,577.9l0.7-2.5l2-0.7l-0.9,1.4l-0.5,2.3L95,577.9L95,577.9z"/>
<path id="path2468" class="st0" d="M103.8,570.9l2.3-0.4l-0.5,1.8L103.8,570.9L103.8,570.9z"/>
<path id="path2470" class="st0" d="M61.3,618.6l-0.2,2.5l2.1-0.9L61.3,618.6L61.3,618.6z"/>
<path id="path2472" class="st0" d="M65,624.9l-4.3,2.3l-1.6-0.7l0.4,2.3l5.4-0.4l4.1-2.5l-0.4-1.3l-2.5-0.4L65,624.9L65,624.9z"/>
<path id="path2474" class="st0" d="M58,579.5l-0.6,1.2l-0.2,0.8l0.8,0.9l-1.5,1.4l0.4,1.1l1.1,0.5l0.8,0.7l0.4,0.8l-0.9,0.4
	l-0.7,2.1l0.4,1.2l-1.2,0.4h-1.3l-1.1,0.7l0.4,1l1.4,0.3l1.8,2.3v1.3l-0.5,1.1l-1,0.7l-0.7,0.9l-1,0.7l-1,0.3l-1.8-1.6l-1.3,0.4
	l-0.9,0.7l-0.6,1l-1.5,1.3l-0.6,0.9l0.9,0.5h1.3l0.6-0.8h4l0.7-0.6l0.9-0.4l2.6,0.4l1.2,0.5h1.3l1.2-0.5l-0.4-1.2l-0.7-0.9l-0.4-1
	l-0.1-1.3l1.5-1.4l-1.2-2.9l3.7-3.3l-0.4-0.9l-1-0.7l-0.2-1.2l0.6-2.1l-0.5-1.2l-0.6-0.8l-0.3-1.1l0.4-1l1-0.6h2.7l2.3-0.6l1-0.6
	l0.2-1.3l-0.7-0.6l-1.1,1l-1.1,0.3l-1.3-0.6l-2.1-2.4l0.3-1.2l-0.4-1l-1.1,0.1l-0.8,0.7l-2.2,4.1L58,579.5L58,579.5z"/>
<path id="path2476" class="st0" d="M72.9,569.1l-1,1l0.1,1.2l3,2.1l0.6,1.1l0.6-0.6l0.9-2.1L78,571l2.8,0.1l0.5,1.2v1.3l0.7,0.8
	l0.4,1l2.2,2.3l0.4,1.3l0.9,0.2l0.8-1l0.2-1.3l2.2-1.3l1.3-0.2l-0.1-1.2l-1.3-1.2l-0.5-0.8l0.8-1.4l-1.4-0.1l-1.7-3.1l-0.7-0.2
	l-0.8,0.5l-2.1-0.6l-0.3-1.1l-1.3-0.2l-1.3,0.5l-0.5,1.1L78,568l-2.3-0.3l-1.1-0.5l-0.3-0.6L72.9,569.1L72.9,569.1z"/>
<path id="path2478" class="st0" d="M85.1,580.5l-1.4,1.9l1.8,1.7h1.3l1-0.6l0.1-1.3l1.7-2.1l-0.8-0.5h-1.3l-1.3,0.3L85.1,580.5
	L85.1,580.5z"/>
<path id="path2480" class="st0" d="M88.4,584.4l-1.2,0.5l-0.4,1l0.4,1.1l1.1,0.5h1.3l1.3-0.3l0.4-1.2l-0.6-0.9l-1.2-0.6L88.4,584.4
	L88.4,584.4z"/>
<path @mouseover="PenghuApi" id="Penghu" value="澎湖縣" sodipodi:nodetypes="csssssssssssssssssssssssssssssssssssssssssssssssssssscsssscsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscsssssssssssssssssssssssc" class="st0" d="
	M81.3,593.2l-2.9,2.5l-1.2,0.4h-1.3l0.6,1.2v1.3l-0.3,1.3l-1.8,1.5l-0.2,1.3l1,0.5l2.4-1.1l1-0.7l1.4,0.1l0.9,0.6l0.8,0.9l-2.7,2.9
	l-1.3,0.2l-2.7-0.4l1.5,1.7l2.1,0.9l1.6-0.2l1.2-0.7l4,0.1l0.8,1.1l0.4,1.2l-1.3,2.1l-0.2,0.7l1.2,0.8l-0.1,1l-1.1,1.1l-1.2-0.1
	l-0.8-0.7l-1.1-0.5l-1.3,0.2l-1.6,3.4l-1.5,1.6l0.6,1.1l2.6,0.3l1.4-0.2l1.8-0.6l1.5-0.1l1.6,1.8l1.2-0.3l0.2-1.2l1.1-1l0.1-1.3
	l0.4-1.3l-1.1-0.6l-0.2-1l0.9-1l0.6-1.2l4.5-3.5l1.2-0.2l2.2-2.8l0.4-1.1l1-0.8l6.2-0.2l1.9-0.9l0.8,0.6l0.3,1.3l0.6,1.2l1.1,0.7
	l1.3-0.3l1-0.5h1.4l0.5-0.8l-3.1-3.3l-0.8-2.9l0.4-1.1V597l-0.5-1.2l-2.4-2.6l-0.6-2.1l-0.7,0.8l-0.4,2.5l-1.3-0.2l-0.6-1.3
	l-0.8-0.9l0.4-0.8l0.7-0.5l-1.7-1.6l-1.2-0.4l-0.8,0.8l-1.7,3.1l-1-0.2l-0.9,0.3l-1.5,1.5l-0.3,1.1l-0.7,0.2l-0.1-4l1-2.1l-1.5,0.2
	l-0.8,0.5l-5.2,0.9l-0.8,0.6l0.1,1.3l0.7,1v1.3l-0.5,0.9l-1.3,0.4l-0.8,1v2.8l-0.7,0.8l-1.3-0.6l-1-0.9l0.2-1.8l-1.4-0.2l-0.2-1.3
	l0.7-1.2l0.1-0.8L81.3,593.2L81.3,593.2z"/>
<path id="path2484" class="st0" d="M71.1,606l-0.5,1.3l-1,0.4l-0.4,1.2l0.1,2.6l1.5,0.7l0.4,0.7l0.9,0.8l0.4-0.9l-0.7-0.9l1.2-1.1
	l-0.7-0.8l-0.3-2.9l-0.9-0.7"/>
<path id="path2486" class="st0" d="M73.4,614.1v1.4l4.4,0.1l0.5-0.8l-0.7-0.9l-1.1-0.8l-0.5-0.8l-0.3,1L73.4,614.1L73.4,614.1z"/>
<path id="path2488" class="st0" d="M88.5,542.6l-1.9,3.2l0.4,1.6l1.3,0.5l1.1-1.8l1.3-1l1.6,0.3l1.3-0.6l1.1-1.1l-4.2-2.9l-1,0.1
	L88.5,542.6L88.5,542.6z"/>
<path id="path2490" class="st0" d="M1.4,652.1L0,655.3l1.4,0.9l1.6-0.4l1.4-0.9v-1.3l-2.3-1.8L1.4,652.1L1.4,652.1z"/>
<path id="path2492" class="st0" d="M52.9,657.2l0.9,1.9v8.7l-0.4,1.6l-1.5,0.6l0.9,1.3l5.6,0.1l0.4-0.9l-0.6-1.4l0.6-1.3l1.6-0.5
	l1.3,1.4l1.3,0.9l1.5-0.5l0.9-1h1.9l1.1-0.8l-0.5-1.6l-0.8-1.3l-1.6,0.6l-2,2.3l-4.5-2.7l-0.5-1.4v-3.8l-1,0.3l-1.9-0.1L52.9,657.2
	L52.9,657.2z"/>
<path id="path2494" class="st0" d="M62.9,697.6l0.3,1.9l1.6,0.1l-1-1.4L62.9,697.6L62.9,697.6z"/>
<path id="path2496" class="st0" d="M66.4,700.4l-0.5,2l-1,1.4l1.6-0.5l1.8-2.3L66.4,700.4L66.4,700.4z"/>
<path id="path2498" class="st0" d="M105.9,701.9l-0.9,1.9l0.8,1.1v1.4l1.1,1.1l0.8-0.1v-1.9l1.3-1.4l0.6-1.3l-1-0.9l-1.9-0.1
	L105.9,701.9L105.9,701.9z"/>
<path id="path2500" class="st0" d="M34.3,714.6l-3.2,1.1l-0.4,1.5l0.4,1.8l1.1,0.9v1.9l1.8,2.4l0.6,0.3l0.1-1.8l1.5-1l1.5-0.4
	l0.4-3.7l1.3-1.1l-2.5-2L34.3,714.6L34.3,714.6z"/>
<path id="path2523" class="st0" d="M787,185.2l1.5,0.9l1.3-0.1l0.3-1.6l1.8-0.1l1.8,0.3l0.5,1.6l1.6,1l-0.6,1l-1.6,0.6l-3.7-0.1
	l-2-1.9L787,185.2L787,185.2z"/>
<path id="path2525" class="st0" d="M648.9,895.6v2.7l2.3,1.6l0.7,2.5v2.7l1.1,1.3l2.5,0.4l2.5,3l2.5,0.7l1.8-0.4l-1.8-1.8l-0.2-2.1
	l2.9-4.1v-2.7l-0.5-2.3l-1.6-1.3l-2.7,0.2l-2.3-1.1l-5.2,0.9L648.9,895.6L648.9,895.6z"/>
<path id="path2527" sodipodi:nodetypes="csssssssssssc" class="st0" d="M678.7,1110.2l1.4,2l1.6,1.4h2.7l2.5,0.5l1.3-0.4l0.7-2
	l1.3-1.6l0.4-2.3l-2.3-1.1l-1.6-1.6l-2-0.5l-4.3-3.8l-0.7-2l0.2-2.5l2.5-0.2l-0.2-2.1l-1.4-1.4l-0.4-2.3l1.3-1.4l-1.1-1.6l-9.8,0.2
	l-2,0.7h-5.4l-1.6-1.1l-1.6,0.4v1.8l2,1.3v7.9l1.1,1.6l2.5,0.9l5,6.3h5.4l2.1,1.4L678.7,1110.2L678.7,1110.2z"/>
<g id="g4330" transform="translate(4.6145365,50.433747)">
	<path id="path2643" class="st0" d="M80.6,276.7l-0.8,0.6l-0.6,0.7l-2.5-0.4l-0.9,0.5l-0.5,1v2.8l-0.5,0.9l-0.1,1.3l-0.8,0.6h-1.4
		l-0.9,0.5l0.3,1.4l0.6,0.9l-0.5,1l-0.8,0.8l-1,0.4h-0.4l0.6,1.1l2.6,0.2l0.5,1.2l1.3-0.1l2-2.7l1.1-0.3l1.2,0.3l0.6,0.8l1-0.5
		l0.6-0.9l-0.1-1.3l0.6-0.9l2.7-0.1l1.2-0.4l0.6-0.7l1.5-4.2l-0.2-1.2l-3-1.8l-0.7-0.8l-0.9-0.5l-1.3-0.3L80.6,276.7L80.6,276.7z"/>
	<path id="path2645" class="st0" d="M52.9,295.2l0.5,1.1l0.6,0.9l-0.4,0.7L55,298l0.9,0.5l0.8-0.6l-0.2-0.6l-1.4-0.1l-0.6-2.1
		L52.9,295.2L52.9,295.2z"/>
	<path id="path2647" class="st0" d="M51.5,298.9l-0.6,0.8l2.3,0.6l0.7-0.6L51.5,298.9L51.5,298.9z"/>
	
		<path @mouseover="kinmenApi" id="kinmen" value="金門縣" sodipodi:nodetypes="csssssssssssssssssssssssscsssssssssssssssssssscssssssssssscssssssssssssssssssssscssssssssscsssssssssssssssssscsssssscsssssssssscsssssssssssscsssssssssssssscsssssssssssscssssssssssssssc" class="st0" d="
		M139.6,258.8l-0.4-1.3l-0.6-0.9v-1.4l-0.6-0.8l0.6-0.6h-1.2l0.1-0.7l-0.9-0.1l-0.7,0.2l-0.4-0.6l-1.6,1.7l-0.5-0.9l0.9-0.6
		l-0.8-0.6l-0.9,0.6l-0.6,0.8l1,0.8l0.7,1l-0.4,1.1l-1.2,0.2l-1.7,1.2l-1.2,0.2l-1.2-0.1l-0.5,0.3l-0.3,0.9l0.5,0.7l0.1,1.3l1.3-1.4
		l1,0.5h1.4l-0.1,0.7h-1.4l0.9,0.8l0.5,0.9l-0.8,0.6v1.4l-0.9-0.3l-1.2-1.7l-0.7-0.6l-0.2,0.9l0.6,0.9v0.3l-0.9,1l-0.9,0.6l-0.6,0.8
		l-0.9,0.5h-1.4l1.3,1.2l-0.4,0.5l0.6,2.4l-0.3,0.7h-0.6l-1.7,1.4l-0.6,0.9l-8.1-1.1l-10.8-7.8l-1.2-0.3l-0.4-0.3l-0.6,0.7l-1.3,0.2
		l-2.1,2.1l-1.2,0.2l-2,3.8l2.2,1.3l1.2,0.3l-0.2-0.9l-0.7-0.8l0.9-0.5l2.8,0.1l0.5-1.1l0.9-0.6l0.7,0.8l-0.1,1.7l-0.7,0.7l-2.4,0.5
		l-0.5,1.2v1.8l0.4,0.3l0.7,1.2l0.7,2.4v2.8l0.2,0.7l1.6,0.2l0.6,0.7l-0.1,1.3l-1,0.4l-0.6-1.7l-0.5,0.9l-2.2,0.3l-0.1,2.3l-0.8,0.6
		l-4,0.1l-0.6-0.5l0.1-1.3l-0.8,1.7l-1.1-0.2l-0.3,0.9l1,0.7l0.9,0.4l1.7,2.2l1.5,1.2l0.6,1l2.7,0.2l1,0.5l0.6,1.1l1.3,0.5l1.5,0.2
		l2,1.3l0.5-0.8l1.6-0.3l0.4-1l0.7-0.6l0.6-2.4l3-4.3l0.7-0.6l0.6-0.9l0.8-0.6l0.2-0.5l1.2-0.2l0.8-0.6l1.2-0.3l0.7-0.6l0.9-0.5
		l1.3-0.1l2-0.8l7.9-0.6l1.5,0.6l1.7,1.4l0.9,0.5h1.4l2.3,0.9l2.4,2.4l-0.1,1.1l-0.6,0.8l-0.8,0.6l-0.6,0.2l1.1,0.5h1.4l1-0.4
		l0.8-0.6l1.2-0.3l0.6-0.9l2.3-0.6l0.4-1l-0.5-0.8l0.3-1l0.8-0.4l1.4,0.3l0.6-0.7l0.4-0.8l-1.4-1.7l-0.2-1l1.8-1.1l1-0.1l0.6,0.6
		l1-0.8l-0.4-0.8l0.1-0.9l0.5-0.7l-0.9-0.5h-1.4l-0.3-0.7l-0.7-0.7l-0.7-3.4v-2.2l1.5-0.9l0.4-1.1l-0.6-0.7l-2,0.7l-0.9-0.3
		l-0.5-0.9l-0.6-2.3l0.2-1.2l-0.6-0.6l-0.9-0.5l-0.2-3.4L139.6,258.8L139.6,258.8z"/>
	<path id="path2655" class="st0" d="M141.9,253.8l-1.1,0.4l0.5,0.5h1.4L141.9,253.8L141.9,253.8z"/>
	<path id="path2657" class="st0" d="M148.3,288.9l-0.6,0.6l1.3-0.1L148.3,288.9L148.3,288.9z"/>
</g>
<g id="g4313" transform="translate(13.831957,20.350481)">
	<path id="path2671" class="st0" d="M36.8,179.2h6l-2,3.2l-4.4-0.4L36.8,179.2L36.8,179.2z"/>
	<path id="path2673" sodipodi:nodetypes="cssssssc" class="st0" d="M51.9,181.1l-4,9.5l1.6-0.4l7.6-5.2l-4-1.6L51.9,181.1
		L51.9,181.1z"/>
	<path @mouseover="LianjiangApi" id="Lianjiang" value="連江縣" sodipodi:nodetypes="csssssssssssc" class="st0" d="M32,112l-0.4,4.4l0.8,4.8l-0.8,2.8l6.4,0.8l4.8-1.2l6.4-5.2
		l-2.8-3.6l-3.2,2.8l-4.4,0.8l-2.4-3.2L32,112L32,112z"/>
	<path id="path2677" class="st0" d="M51.5,114.4l1.2,2.4L51.5,114.4L51.5,114.4z"/>
	<path id="path2679" sodipodi:nodetypes="cssssssssssssc" class="st0" d="M49.9,96.5l0.4,9.5l0.8-4.4l3.2-2l4.8-0.4l3.6-2.4l2.8,3.2
		l0.8-2l-3.6-6L49.9,96.5L49.9,96.5z"/>
	<path id="path2681" sodipodi:nodetypes="csssc" class="st0" d="M56.3,75.8l-2.4,4.8l1.7,0.7l1.9-1.5L56.3,75.8L56.3,75.8z"/>
	<path id="path2683" class="st0" d="M62.2,86.5l-2.8,2.8l4-0.8L62.2,86.5L62.2,86.5z"/>
	<path id="path2685" class="st0" d="M227.2,45.8l-0.1,1.5l-0.8,0.9l-0.4,1.2l1.2,0.8l4.1-1.3l1.5-2.2l1.2,0.3l1.3-0.4l-0.6-1.1
		l-1.4-0.5l-2-1.8l-1.1-0.2l-0.7,1.7l-1,1.2L227.2,45.8L227.2,45.8z"/>
	<path id="path2687" class="st0" d="M224,41.4l-2.4,2.1l0.2,0.7l4.2,0.3l-0.2-1.2L224,41.4L224,41.4z"/>
</g>
<g id="g4342" transform="translate(920.81618,114.6225)">
	<path id="path4338" class="st0" d="M-697.7,169l-0.5,2.5l1.4,1.4l1.6,0.7V171l-1.3-1.4L-697.7,169L-697.7,169z"/>
	<path id="path4340" class="st0" d="M-690.8,173.3l-1.3,2.1l1.8,1.1l1.8-1.3l-1.3-1.4L-690.8,173.3L-690.8,173.3z"/>
</g>
<path id="path4401" class="st0" d="M63,934.8l-1.4,4.3l3.2,2.9l3.9-1.8l1.8-3.9l-3.2-2.1L63,934.8L63,934.8z"/>
<g id="g4418" transform="translate(84.886708,7.5966231)">
	<path id="path4403" class="st0" d="M-29.4,1000.8l0.4,4.6l3.6-2.1L-29.4,1000.8L-29.4,1000.8z"/>
	<path id="path4405" sodipodi:nodetypes="cssssssc" class="st0" d="M-10.4,993.3l-4.6,0.7v5.4l2.9,3.9h2.5l1.8-3.9l0.7-4.6
		L-10.4,993.3L-10.4,993.3z"/>
</g>
<path id="path2421" sodipodi:nodetypes="cssssssssssssssssssssssssssssssssssc" class="st1" d="M323.7,626.6l0.5,3.3l3,3l-2,4.5
	l10.1,1.5l1,2.8l2,2.8l2.5,1.3l2.5-1.5l1.3-2.5l4.5-3.5l2,1.8l4.5,1.5l0.8-2.5l3.5-4.3l-2-2l-0.8-3l-3-0.8l-1.3-2.5l-2.3-1.5l-2.8,1
	l-2-1.8l-1.8-2.5l-2.5-1.3l-3,0.8l-7.1,5.1l-3-0.8L323.7,626.6L323.7,626.6z"/>
<path  @mouseover="taipeiApi"  id="taipei" value="臺北市" class="st1" d="M650.7,86.2l-1.3,2.7l-1.3,1.3l-0.4,0.7l-1.3,1.4v2.7l-1.8,1.1l-0.4,2.3l0.7,2.3l1.8,1.3l5.7,0.7
	l3.6,3.4l1.4,2.7l0.2,8.2l-2.7,3.7l-1.8,1.6l-0.9,2l0.5,5.2l1.1,2.1l2.1-0.2l2-1.1l1.3-1.8l1.3-0.2l2.9,1.3l1.6,1.3l0.7,2v2.7
	l1.3,2.1l2.3,1.6l2.5,0.2l1.1,4.3l3.8,2.5l10,1.1l2.1-0.9h2.9l0.2-1.8l-4.8-2.3l-0.4-2.5l0.2-2.1l-1.3-4.1v-2.3l1.3-2l1.8-1.1l5,0.4
	l1.6-1.1l2.1-0.5l6.8,0.4l0.5-1.4l-1.6-0.7l-2.3,0.7L697,124l-4.8-3.6l-0.9-2l1.3-1.6l-0.4-2l-1.4-1.4l1.1-1.3l2.3-4.8l-0.5-4.6
	l-7.7-6.6l0.5-2.3l1.4-1.6l-0.5-1.8l-2.9-2.5l-1.1-1.6l-0.2-5.2l-2.9-2.9v-2.7l0.7-2V71l-4.6,0.4l-2-3.6l-1.4-1.6l-2.5,3.9l-2,0.9
	l-0.9,2l-3.8,2.1l-0.9,2.3l-1.6,1.1l-2.5,0.2l-2,0.9l-3,3.6l-0.9,2.3L650.7,86.2L650.7,86.2z"/>
<path id="path2417" sodipodi:nodetypes="csssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssc" class="st1" d="
	M388.1,392.7l-2,7.1v3.8l-5.1,10.4l1.8,3l2.8,1l3.5,4.5l2.8,1l2,1.8l3,0.8l5.8-1l1.3,3.3l3.3-0.3l1.8-2l2.5-1.3l6.3-1.5l2.5-1.3
	l0.8-3v-3.3l-2.8-1l-1.8-2.3l2.3-1.5l3.3,0.5l2.8,1.3h7.1l6.3-1.5l1.8-2h7.6l0.3-11.1l-2.3-1.5l-2.8-1l-4.3-3.3H435l-4,4.8l-2.3,1.5
	l-6.1,1.8l-3.5,0.3l-2.5-1.3l-1.5-2.3H408l-2.3-1.5h-3l-2.5,1.8l-5.6-1.8l-2.8-1.8L388.1,392.7L388.1,392.7z"/>
<path @mouseover="KeelungApi" id="Keelung" value="基隆市" sodipodi:nodetypes="ccssssssssscssssssssssssssssssssssssssscssssssssssssssssssssssssssscssssssssssssssssssssssscsss" class="st1" d="
	M747.5,93.3l0.1-1.2l-1.1-1.1l0.5-3.4l-1.8,0.1l-2.4,1.5l-2.2-2l-1.9-0.2l-0.9-0.6v-2.1l-1.6-0.4l-0.8,1.4l-1.5,0.4l-0.4-1.5h-1.3
	l0.5,1.5l1.4,2l-1.8,2.3l-2.8,2l-1.3,0.1l2.3-2.2l-0.8-1.4v-3.2l-1.5-0.1l-1.4-0.8l-1.8-0.3l-2-2h-3.9l-1.1-0.8l0.3-1.4l-0.4-0.9
	l-1.8,1.2l-2,0.7l-1.1,1.6l-2.3,0.5l-1.3,1.6l-4.1,1.8l-2.5,0.2l-2,0.7l-1.8,1.3l-4.8,0.5v2.7l1.1,2l2.3,0.7l1.4,1.6l0.2,2.5l3,6.8
	l2.3,1.6l1.6,2.1l2.3,0.5l1.4-1.3v2l1.6,1.8l7,1.8l5.4,4.6l5.2,0.4l4.6-2.3l2.5-0.2l1.1-1.8l0.7-2.1l-4.6-4.5v-4.8l-0.5-2.1l2.3-0.5
	l2.9-3l2.5,0.5l1.8,1.3l0.9,0.2l1.8-2.9l1.4-1.4L747.5,93.3L747.5,93.3z"/>
<path @mouseover="pingdoneApi" id="pingdone" value="屏東縣"  sodipodi:nodetypes="csssssssssscssssscssssssssssscssscsssssssscssssssssssssssssscssssscssssssscscsssssssssssssssssssssssccssssssssssssssssssssssscssssssssscssscssssssssscsssssssssssscsssssssssscsssssssssscsssssssssssssssssssssssssssssssscssssssssscsssssssssssssssssscsssssssssssssssssscsssssssssscssssssssssssscssssssssssssssscsssssssssssssssssssssssssssssssssssscsssssssssssssssssssscsssssssssssssssssssssssssssssssssssssscsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscsssssssc" class="st1" d="
	M475.8,1036.9l-3,1l-2,1.8l-3.3,1.3l-2.8-4.8l-3-0.8h-4l-1.3-2.8l-2.8-1l-2.3-1.5l-4.3,0.3l-0.5-2.3l0.8-3.3l1.8-1l-2.8-1l-1-2.5
	l-4.8-2.8l1.8-2.3l2.5-1.3l-0.3-7.6l-2.5-1.5l-1.3-2.5h-2.8l-3.8-4l-3.5-1.8l4.8-14.6l6.6-1l1.3-2.8l-0.8-3.3l-2.8-2l-2.5-5.3
	l-4-2.5l-0.3-3l-1-3l4.3-3.3v-3.8l-4-8.1l-0.5-4.3l-1.8-1l-1-3l0.5-3.5l2.8-5.1l-1.3-2.8l1.5-2.3l1-2.8l-0.3-3.5l1-2.5l2-2l0.8-3
	l1.8-2l0.3-1l4-5.6l0.3-3.5l1.8-2.3l0.3-2.5l3.3,0.5l3.5-1.8l6.1-1.3l3-6.3l11.1-0.5l2-2.3l0.3-3.5l1.8-2l0.5-9.9l2-2l-1-2.3v-3.8
	l-1-3.3l-2.5-1.3l-3.3-0.3l-2.8-2.5l-0.8-1.5l-1-8.3l-3.8-2.5l-2.3,0.8l-0.3-1.3l-2.5-1.3l-1-0.3h-3.3l-1.5,2.3l-5.1,2.5l-1.8,2.3
	l-2.8,1.5l-2.8-1.5l-6.3-7.6l-8.6-5.3h-3.8l-3,0.8l-3.3,4.8l-3,0.8l-1,1h-2.8l-2.8-1.3v-3.8l-1.8-2l-3-1.3l-3,0.8l-2.8,2l-3.5,0.3
	l-6.6,4.5l-1.3,0.5l-4,3.3l-0.3,1.3l-2.5,3.3l-2.3,1.8l-3.5,0.3l-6.1-1.5l-2.8,1.3h-3.8l-1.5-2.3l-4.5-0.3l-1.8-0.8l-2.5,1.3
	l-1.5,9.8l-1.3,2.5l-0.5,3.3l-1.3,2.8l0.3,15.2l-0.8,1.3l0.3,4.5l-1.8,6.8l-1.8,2.3l-2,6.1l-0.3,18.2l3.5,4.3l-2.8,16.4l-1.3,2.8
	l-2.5,2.2l-0.2,1.8l-0.8,1.1l-0.1,3.8l-0.5,1.3l0.8,1.8l0.1,9.1l2.9,0.3l2,1.9l-0.1,1.8l-0.9,0.3l1.8,2.4l5,3.7l0.9,1.3l1.4,0.6
	l0.6,0.1l-0.2,0l0.2,0.4l3,1.3l1.2,1.3l1.5,1l2.9,1l1.1,1l1.5,0.8l1,0.9l1.7,0.8l1.1,1l9.6,5.2l1.1,1.4l1.7,0.5l10.8,8.7l0.9,1.3
	l2,5.4l-0.4,0.8l5.4,3.7l5.8,7.3l0.5,1.5v4.8l1.8,2.9l0.8,3.4l-0.1,1.8l-0.5,1.5l0.1,1.5l4,3.4l0.9,1.3l1.3,1l0.8,1.3l1,3.5l3.3,3.4
	l-0.9,1.8v1.9l0.4,1.8l1.2,1.3l1.6,4.9l0.1,5.6l1,3.3v1.9l0.7,1.3l0.5,2.2l1.3,1.1l0.8,1.3l0.3,1.8l1.4,1.4l0.3,3.6l0.8,1.3
	l-0.1,1.9l-0.8,1.3l-5.2,1.5l0.3,1.7l1.8,0.4l0.5,1.3l-0.1,0.6l0.4,1.6l0.6,1.3l-0.6,1.3l-0.9,1l-2.5,1.5l-0.3,1.6l1,1.2l-3.8,3.5
	v3.7l1.5,0.9v1.9l1.3,1.1l-0.4,1.5l3.9,3.4l0.4,1.4l1.3,1.3l0.8,1.3l0.5,2.5l-0.9,3l0.1,5.9l-1.1,2.7l0.9,1.1l1.8,0.3l0.9,3.3l1,1.7
	l3.9,0.4l1.5-2.4l1.1-0.9l0.3-1.7l-0.8-3.2l0.6-1.4l1.4-0.6l2-2.2l1.3-0.6h1.9l0.5,1.4l4.2,2.9l0.5,0.1l2.3-0.1l1.6,0.4l0.6,1.3
	l1.5,0.4l1.4,0.9l1.9,0.6l1.9,0.1l3.8,3.8l0.1,1.8l1.9,0.6l0.9,0.8l0.6,1.3l0.1,1.8l2.7,2.5h1.9l1.3-0.9l-0.3-1.7l-1-0.9l-0.4-1.6
	l0.1-1.8l-0.5-1.4l-4.9-7.5v-7.3l0.5-1.4l-0.6-1.4l0.5-3l1-0.4l0.1-1.7l3.4-0.5l1.7-0.6l0.6-1.3l1.5-0.4l1.3-1l0.5-1.5l0.1-1.8
	l0.9-1l1.8-0.1l0.4-3.4l3.7-2.4l0.4-1.4l-2-2.5l-0.1-9.3l-1.2-1.7v-1.9l2.7-4.5l1-1.1v-1.5l-1.5-0.6l-2-2.2l-0.6-1.6l-0.3-4.8
	l0.3-0.7l0.9-0.1l0.5-0.6l0.7-0.5l0.3-0.7l-0.9-1.4l0.1-3.7l-0.8-1.3l0.3-0.6l0.5-0.6l0.3-0.6l0.2-0.8l-0.2-0.8v-1.9l-0.3-1
	l-0.4-0.6l0.1-1.1l-0.6-0.8l-0.3-0.8l0.2-1.6l1.4-1.2l0.4-0.6l0.2-0.7l0.1-1.8l-0.3-0.8v-0.7l0.2-0.5l-0.9-1l0.8-3.3l1-1.1l0.5-1.4
	l-1-1.2l-0.2-0.9"/>
<path @mouseover="YilanApi" id="Yilan" value="宜蘭縣" sodipodi:nodetypes="csssssssssssssssssssssssscsssssscsssssssssssssscsssssssssssssssssscsssssssssssssssssssssssssssscsssssssssssssssssssssssssssssssssssssscsssscsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscsssssssssssscssssssssssssscsssssssssssscssssssssssssssscsssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssscssssssssssssssssssssssssscssssssssssssssscssssssssssssssssssssssssssssssc" class="st1" d="
	M650.4,242.5l-0.5,1.2l-1.6,0.5l-3.5,0.3l-1.3,0.8l-1.8,2.4l-0.6,5.1l-2.3,3l-0.4,1.5l-0.6,1.3l-0.4,1.5l-3.4,5.3l-0.3,1.6H632
	l-1.4,0.6l-1.1,0.9l-0.4,0.7l-0.9,0.9l0.1,0.6l1.1,0.8l0.6,1.4l0.1,1.8l0.5,1.4l-1.3,1.1l-0.5,0.3l-0.5,0.8l-1.3,0.8l-1.4,1.5
	l-0.4,1.6l0.6,1.3l0.1,7.3l-0.8,1.8l-1.1,1.4l-1.4,1l-1.6,2.5l-1.8,1.4L619,300l-1.4-0.1l-3.4,4.9l-1.3,0.8l-1.9-0.4l-1.4,2.8
	l-1.4,0.8l-1.1,2.9l-0.9,1.1l-1.5,1.3l-1.3,2.5l0.1,1.6l-0.7,1l1.4,1.7l0.9,1.8l0.5,2.1l-0.9,7.1l2.7,2.7l2,0.7h4.8l4.1,7l1.8,0.9
	l2.7-0.4l1.3-1.6l1.6-1.3l2.3-0.4l1.8-0.9l7.1-0.9l2.1,1.1l1.1,1.8l1.6,1.1l1.3,2.1l12,7.7h8.1l3,1.3l4,0.5l8.1,5.6l8.3,1l3-0.8
	l-3-2.5l0.8-3l3.3-0.8l2.3-1.5l2.3,1l2-1.8l-0.8-1.5l-2-1.8l0.3-3.3l2-0.8l4.3,3.8l4.8,1.5l4.5,3.5l9.1,3.8l7.3,0.5l8.1,4l4.1,0.5
	l-0.2-4l-0.8-1.3l0.1-3.7l2.5-4.8l0.4-1.5l1.5-2.5l0.5-10.9l0.5-1.6l0.9-1.2v-2.1l1-3.5l1.8-2.4l0.5-1.8l2.7-1.6l1-1.2l1.3-2.6
	l0.1-1.8l4.5-4.3l4.6-1.9h1.9l0.5-0.3l-1.4-0.8l-1-1l-0.8-1.3V301l-2.5-1.5l-0.5-4.9l1.8-1.1l0.9-1.3l3.3-0.6l2.8-1.8l1.7-0.4
	l0.5-1.7l-0.1-1.5l-0.6-1.8l-0.1-1.8l-0.8-1.1l-0.3-3.5l0.8-1.1l-0.9-1.4l0.7-1.5h1.9l-0.3-1.4l-1-0.9l-0.3-0.5l1.5-0.7l-1.3,0.3
	l-1.8-0.7l-0.1-1.3l-2.4-2.2l0.4-1.6l1.8-0.1l1.5,0.9l0.3,1.8l1.8-0.1l1.5-0.8l-3.7-3.7l-3-1l-0.4-0.8l-0.5-0.2l-1.6-2.3l-0.1-1.3
	l-3.7-9.1l-0.1-3.8l-0.8-1.1l0.4-0.6v-2l-0.5-1.7l0.5-10.2l-2.9-3.2l-0.9-1.5v-1.7l-1.4-1.6l-0.6-3.4l0.1-1.8l-1-1l0.5-14l0.7-2.2
	V197l1.3-2.8l-0.3-3.7l1-3l0.1-1.8l2.4-5.2l0.3-1.8l1.3-2.2l1.5-0.8l1-2.9l0.9-1.1l1.4-0.5l3.8-4.4l1.3-0.6l3.2-3.7l0.3-3.5l0.5-1.5
	l2.8-1.6l1.5-0.4l1.5-2.2l1.2-0.9l1.2-0.6l2.5-3.5l0.3-1.9l1.8-1l1.8-0.3l1.2-0.5l1.1-1.1l1.7-0.3l1.3-0.8l1.9-0.1l2.7-1.2l-3.6-0.7
	l-2.5,0.2l-6.3,2.3l-5.4,0.4l-6.8,4.8l-1.4,1.6h-2.9l-2.3-0.9l-5.2-0.4l-1.8,1.4l-0.5,2.1l-0.9,1.8l4.1,5.9l-1.4,4.3l-5.9,3.9
	l-5.4-0.4l-2.3,0.4l-3,2.5l-2.5,3.2l0.5,2.3l-0.2,2.1l-1.4,1.8l-0.2,2.1l0.2,1.3l-2.5,0.5l-1.8,0.9l-7.5-1.1l-2.3,0.4l-2,1.1
	l-2.7,3.2l-4.8,2.6l-0.5,1.7l-1.8,1.6l-1.1,1.8l-2.1,0.7l-0.7,2l-1.6-1.8l-3.6,1.8l-10.5,1.3l1.4,1.3l-0.5,2.1l-2.3,1.8l-2.5-0.7
	l-1.8,1.1l-2.1,0.5l-0.9,2l0.2,2.5l-0.4,2.3l-2,1.6l0.4,2.5l1.4,1.4l0.7,2.1v2.7l-1.4,4.3l-2.3,0.4l-1.6,1.3l-1.1,1.6l-2.1,0.7
	l-2.7,0.2l-5.9,3.2l-0.5,2.5l-5.2,3.4l-4.6,0.7l-2.3,1.4L650.4,242.5L650.4,242.5z"/>
<path @mouseover="TaoyuanApi" id="Taoyuan" value="桃園市" sodipodi:nodetypes="csssssssssssssssssssssssscssssssssssssssssscssssssssssscssssssssssssssssssssssssssssssssssscssssssssssssssssscssssssssssssssscsssssssssssssssssssssssssssscssscssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssscsssscssssssssssssssssscssssssssssssssssscsssssssssssssssssscssssssssssssssssssssssscsssssssssssssssssssssssssssssssc" class="st1" d="
	M650.5,242.5l-0.5,1.2l-1.6,0.5l-3.5,0.3l-1.3,0.8l-1.8,2.4l-0.6,5.1l-2.3,3l-0.4,1.5l-0.6,1.3l-0.4,1.5l-3.4,5.3l-0.3,1.6H632
	l-1.4,0.6l-1.1,0.9l-1.5,1.9l-0.8,0.5l-1.8,0.4l-3.7-0.5l-1.5-0.9l-1.3-1.9h-0.9l-0.8-1l-0.5-1.5l-1.4-0.5V261l0.8-1.4l0.4-1.8
	l-1.5-0.8l-1.6-0.3l-1.3-0.8l-0.1-3.8l1-1l0.1-1.9l0.5-1.5l-0.3-1.9l-1.6-0.8h-1.9l-0.6-1.3l-0.3-1.8l-0.8-1.3l-1.1-0.9l-2.3-2.9
	l-2.9-1.4l-3,1l-1.4-0.5v-3.8l1.1-1.1l0.6-1.3v-3.8l-2.1-0.4l0.1-4.4l0.5-1.4l0.9-1.3l0.4-1.6l-1.3-1.3l-0.6-1.5l-1.8-0.4l-1.3-1.3
	l-1.4-0.5l-1.8-0.1l-0.5-0.8h-0.3l-1.6-0.9l-1-1.3l-1.5-0.9l-0.4-0.6l-0.1-1.1l-0.9-2.4l-1.5-0.6l-2.1-0.4v-1.9l-1.5-0.5l-3.9,1.8
	h-1.6l-5.7-4.5l-1.4-0.6l-1.1-1.1l-2-0.8v-1.4l-1.9-0.3l-1.8-0.6l-3.5-2.8l-0.6-0.9l-3-1.9l0.4-1.6l1.8-2.8l-0.5-5.6l-1.4-1l-11.7-1
	l-0.8-1.5l-0.3-1.9l1-0.9l-1.4-0.8l-1.3,0.9l-1.6,0.6l-1.9,0.1l-1.6-1.3l-2-0.6h-1.9l-1.3-1.4l-3-1.1l0.1-3.7l0.6-1.5l-1.1-3
	l-0.1-1.8l-1.8-0.1l-2.1-2.1l-3.7-0.3l-4.3,1.3l-2.3-1.5l-4.3,2.5l-3.1-0.8l0.5-0.8l1.3-1l3-4l0.6-1.4l1.3-1.3l1.3-0.8l1.8-1.9v-3.7
	l-0.9-1.3l0.1-1.8l3-3.8l1-2.9l1.1-0.9l2.4-3.5l4.7-4.1l3.9-1.8l1.6-0.3l1.2-1.2l1.5-0.5l2.5-1.6l1.3-1.4l1.7-1l1.8-0.5l2.8-2.2
	l1.5-0.6h2l12.1-3.2l1.5-1.3l3.5-1.6l3.7-3.7l1.7-1l2.1-0.1l8.3-3.4h1.9l1-1l3.5-0.8l1.5,0.5l2.5,2l2.4,0.1l0.8,1.9l1.3,1.4l1.3,0.4
	l1.3,1.6l5,0.5l9.3,4.5l-0.5,3.6l2,1.8l5.2,1.3h5.4l1.3,0.9l1.8,2.1l0.5,2.3v0.7l-0.9,1.8l0.4,2.3l1.3,1.4l2.3,1.6l-0.9,1.6l-2,1.3
	l-2,0.7l2.1,1.6l0.2,2.1l-1.6,1.1l-2.1,0.7l-2,3.6l-2.9,2l-11.3-0.4l-1.8,0.9l-0.5,2.1l1.1,2l-0.5,5l-1.4,1.4l-0.9,2l1.3,2.3
	l2.1,0.2l1.6,1.3l-2.1,1.4l-1.3,1.4l-0.9,2l0.9,4.3l4.5,2.7l3.4,5.2l-1.3,1.6l0.4,2.1l2.7,1.8l-1.6,1.3l-4.6,0.9l-0.2,2.1l2.5,0.4
	l1.6-1.3l1.6,1.6l1.8,1.1l2.9,0.7l2.7-0.2l2-1.1l5.4-0.4l1.3,0.7l0.4,0.9l1.4,1.4l0.7,2l2.9,2.9l1.6,0.9l1.6,1.8l0.2,2.5l0.9,2.5
	l2.3,0.7v2.7l-1.6,1.1l-1.1,1.6l-3.2,2.7l-1.1,2l0.4,2.3l0.9,1.8v1.1l2,5l3.2,3l-0.5,2l2.5,1.1l0.2,1.8l2.5,0.7l1.4,2l2,1.4l0.5,5
	L650.5,242.5L650.5,242.5z"/>
<path @mouseover="Hsinchu_CityApi" id="Hsinchu_City" value="新竹市" sodipodi:nodetypes="csssssssssssscsssssssssssssssscsssssssssssssssssscssssssssssssssssssscssssssscscsssssssssssssssssscc" class="st1" d="
	M472.7,222.7l0.2,1.1l1.3,0.6h2l1.4-0.5l1.1-0.9l1.4,0.5l1.9,2.3l0.5,1.6v1.5l4.9,1.3l0.7-0.5l2-2.4l0.4-3.7l1.3-2.9l1.6-0.4l1-1.5
	l1.5-0.6l1.1-0.9l0.5-1.5l0.9-1.4l5.4-1.3l-0.5-1.4l1.1-1.8l1.5-0.5h1.9l7.1,7.2l1.5-1v-3.8l-3.3-11.1l-1.9-2.6l-3.4-2.9l-3.7-0.4
	l-0.1-0.6l-0.5-1l-1.4-0.9h-1.9l-7.7-1.9l-1.9-2.7l-0.5-1.4l-1.6-1.2l-1,0.8l-1.5,0.6l-5.1,7l-1.3,1.1l0.6,3l-0.3,1l0.5,0.5l1.9,0.1
	l0.3,1.6l-0.8,1.5l-0.4,3.5l-0.8,1.1l-0.1,3.9l-1.9,2.5l-0.5,1.5l1.4,1.1l-0.8,1l-0.6,1.8l-2.3,2.2l-1.8,1L472.7,222.7L472.7,222.7z
	"/>
<path @mouseover="Hsinchu_CountyApi" id="Hsinchu_County" value="新竹縣" sodipodi:nodetypes="cssssssssssscssssssssssssssssssssssssssssssssssssssssssscsssssssssssscsssssssssssssssssssssssssssssssssssssssssssssssssssscsssssssssssssssscsssssssssssssssssscssssssssssssssssssscsssssssscssssssssssscssscsssssssssssssssssssssssssssscssssssssssssssscssssssssssssssssscssssssssssssssssssssssssssssssssssscssssssssssscssssssssssssssssscsssssscsssssssssssssscssssssssssssssssssc" class="st1" d="
	M602.6,319.2l-1.7,0.9l-0.6,1.4l-1.3,0.8l-5.8-0.1l-1.3,0.6l-5.7-0.1l-0.9-1l-0.1-2.1l0.3-1.3l-0.6-0.8v-3.8l-0.9-1.3l-1.5-0.9
	l-1.1-1.3l-0.6-1.5l-2.1-2.4l-0.6-1.5l-1.5-0.8l-0.8-1.1L574,302l-0.5-1.3l0.3-2.9l-1.1-1.5l-3.7-0.3l-1.5,0.5l-2.7,1.8h-4.3
	l-1.4,0.8h-1.9L556,298l-7.6-0.4l-1.4,0.5l-1.5-0.4h-1.9l-2.1,1.9L538,301l-3.4-0.8h-5.9v-2.1l-0.9-1.9v-2l0.8-1.5l2.1-2.3l0.5-1.5
	l-0.1-1.9l-1.5-2.9l-2.7-2.1l2-3.3l1.1-4.2l1.1-1.4l0.1-1.8l0.9-1.3l0.4-1.6l-1.4-0.8l-1.1-3.4l-1.9-0.5l-1.4-3.2l-0.9-0.4l-2,0.5
	l-1.5,0.9l-2.4-1.9l-0.9-1.5l-1.6-0.4l-1.3-0.9l-2-3.2l-1.8-0.3l-1.8-0.8l-0.1-1.8l-1.1-1.3l-1.8-0.3l-3.3-2.1l-0.9-1.5l-1.4-1.4
	l-1.6-2.9l-0.3-1.8l-2-0.8l0.4-1.3l0.9-1.4l0.3-1.6l1-1.3l-1.4-0.8l0.9-1.1l-3.5,0.3l-1.3,1l-1.5,0.6l-0.9-1.1H490l-1.5-0.8l-1-1.2
	l2.5-3.1l0.4-3.7l1.3-2.9l1.6-0.4l1-1.5l1.5-0.6l1.1-0.9l0.5-1.5l0.9-1.4l5.4-1.3l-0.5-1.4l1.1-1.8l1.5-0.5h1.9l7.1,7.2l1.5-1v-3.8
	l-3.3-11.1l-1.9-2.7l-3.4-2.9l-3.7-0.4l-0.1-0.6l-0.5-1l-1.4-0.9h-1.9l-7.7-1.9l-1.9-2.7l-0.5-1.4l-1.6-1.3l0.6-1.5l2-2.5l0.5-1.8
	l1-0.9l0.6-3.4l5.6-6.9l-0.8-1.5l-0.4-1.9l5.5-7.9l3.1,0.8l4.3-2.5l2.3,1.5l4.3-1.3l3.7,0.3l2.1,2.1l1.8,0.1l0.1,1.8l1.1,3l-0.6,1.5
	l-0.1,3.7l3,1.1l1.3,1.4h1.9l2,0.6l1.6,1.3l1.9-0.1l1.6-0.6l1.3-0.9l1.4,0.8l-1,0.9l0.3,1.9l0.8,1.5l11.7,1l1.4,1l0.5,5.6l-1.8,2.8
	l-0.4,1.6l3,1.9l0.6,0.9l3.5,2.8l1.8,0.6l1.9,0.3v1.4l2,0.8l8.2,6.3h1.6l3.9-1.8l1.5,0.5v1.9l2.1,0.4l1.5,0.6l0.9,2.4l0.1,1.1
	l0.4,0.6l1.5,0.9l1,1.3l1.6,0.9h0.3l0.5,0.8l1.8,0.1l1.4,0.5l1.3,1.3l1.8,0.4l0.6,1.5l1.3,1.3l-0.4,1.6l-0.9,1.3l-0.5,1.4l-0.1,4.4
	l2.1,0.4v3.8l-0.6,1.3l-1.1,1.1v3.8l1.4,0.5l3-1l2.9,1.4l2.3,2.9l1.1,0.9l0.8,1.3l0.3,1.8l0.6,1.3h1.9l1.6,0.8l0.3,1.9l-0.5,1.5
	l-0.1,1.9l-1,1l0.1,3.8l1.3,0.8l1.6,0.3l1.5,0.8l-0.4,1.8l-0.8,1.4v3.9l1.4,0.5l0.5,1.5l0.8,1h0.9l1.3,1.9l1.5,0.9l3.7,0.5l2.6-0.7
	l1.4,1l0.6,1.4l0.1,1.8l0.5,1.4l-1.3,1.1l-0.5,0.3l-0.5,0.8l-1.3,0.8l-1.4,1.5l-0.4,1.6l0.6,1.3l0.1,7.3l-0.8,1.8l-1.1,1.4l-1.4,1
	l-1.6,2.5l-1.8,1.4L619,300l-1.4-0.1l-3.4,4.9l-1.3,0.8l-1.9-0.4l-1.4,2.8l-1.4,0.8l-1.1,2.9l-0.9,1.1l-1.5,1.3l-1.3,2.5l-0.1,1.8
	L602.6,319.2"/>
<path @mouseover="MiaoliApi" id="Miaoli" value="苗栗縣" class="st1" d="M488.5,231.6l1.5,0.8h2.9l0.9,1.1l1.5-0.6l1.3-1l3.5-0.3l-0.9,1.1l1.4,0.8l-1,1.3l-0.3,1.6
	l-0.9,1.4l-0.4,1.3l2,0.8l0.3,1.8l1.6,2.9l1.4,1.4l0.9,1.5l3.3,2.1l1.8,0.3l1.1,1.3l0.1,1.8l1.8,0.8l1.8,0.3l2,3.2l1.3,0.9l1.6,0.4
	l0.9,1.5l2.4,1.9l1.5-0.9l2-0.5l0.9,0.4l1.4,3.2l1.9,0.5l1.1,3.4l1.4,0.8l-0.4,1.6l-0.9,1.3l-0.1,1.8l-1.1,1.4l-1.1,4.2l-2,3.3
	l2.7,2.1l1.5,2.9l0.1,1.9l-0.5,1.5l-2.1,2.3l-0.8,1.5v2l0.9,1.9v2.1h5.9l3.4,0.8l3.4-1.4l2.1-1.9h1.9l1.5,0.4l1.4-0.5l7.6,0.4
	l1.3,1.1h1.9l1.4-0.8h4.3l2.7-1.8l1.5-0.5l3.7,0.3l1.1,1.5l-0.3,2.9l0.5,1.3l1.6,0.9l0.8,1.1l1.5,0.8l0.6,1.5l2.1,2.4l0.6,1.5
	l1.1,1.3l1.5,0.9l0.9,1.3v3.8l0.6,0.8l-0.3,1.3l0.1,3.9l-1.8,0.9l-2,1.6l-1.4,1.8l-0.2,2.5l-3.4,5.5v2.7l-2.1,0.5h-2.7l-1.8-2.5
	l0.9-1.4l-2.7-1.1l-2,0.9l-0.7,2.1l-1.3,1.8l-2.3,0.7l-4.8,6.8l-2,0.7h-5.4l-1.8,1.3l-0.7,2l-0.7,0.2l-2,2.1l-0.4,2.5l-2.1,0.5
	l-3.4,2.9l-2.1,0.5l-5-0.5l-4.5,1.6l-5.4,6.8l-2.7,0.2l-2-1.1l-3.2-3l-0.4-2.5l-1.8-1.3l-2.7-3.9l-1.6,0.4h-2.7l-2-0.9l-5-0.4
	l-6.1-2.1l-4.8-0.2l-2.1,0.9l-1.4,1.4v2.7l0.9,2l0.4,5l-0.9,2l-1.8,1.4l-2.1,0.7l-10.4-0.4l-2,0.9h-5.4l-5.2-1.6l-3.2-3l-1.1-2
	l-1.6-1.3l-11.3-2.1l-3.4-2.9l-2.5-0.7l-1.4-2l-3.6-2l-1.4-1.6l-2.1-0.7l-1.3-1.6l-0.9-0.4l-3-0.4l-1.3-1.8l-3.2-2.1l-7.5-9.6h-0.4
	L407,331l-4.5-1.8l-2.3-3.8l-0.4-2l-3.8-4.7l1.6-0.7l3.8-3.2l3-3.9l0.6-1.4l5.2-6.8l1.3-3.2l1.4-1.9l9.5-28.2l2.3-2.9l0.1-0.8
	l1.2-1.3l3.2-0.8l2.7,2.3l1.1,1.7l0.4-1.5l-0.4-2l2.7-1.6h1.4l1,0.3l-0.1-1.7l-1.7-0.8l-1.5-1.1l1-0.9l0.6-3.3l3-5.3l1.7-0.3l2-2.4
	l5.6-0.3l4.4-2h2.4l3.9,1.4l1,1l2.3,0.5l1.3-0.8l-0.8-1l-1.9-0.3l-1.5-0.7l-0.8-1.6l-1.8-0.3l0.1-1.8l1-1.1l1.5-0.8l5.5-4.7l0.5-1.6
	l0.9-1.2l0.4-1.5v-1.9l1.3-2.8l1.3-1.1l0.9-1.3l1.9-0.8l0.5,1l1.3,0.6h2l1.4-0.5l1.1-0.9l1.4,0.5l1.9,2.3l0.5,1.6v1.5l4,1.1
	L488.5,231.6L488.5,231.6z"/>
<path @mouseover="ChanghuaApi" id="Changhua" value="彰化市" sodipodi:nodetypes="cssssssssssssssssssssssssssscsssssscssssssssssssssssssssssssssssssssscsssscsscssssssssssssscsssssssssscssssssssssssscsssssssscssssssssssssssssscsssssssssssssscsssssssssssssssscssssssssssssssscssssssssssssscssssssssssssssc" class="st1" d="
	M285.1,516.7l6.3,2.3l3.8,0.3l5.8,1.8l16.2-0.8l2.8-1l14.6,0.3l2.5-1.3l5.1,2.8l0.8,1.3l4.3,0.5l8.1,4l6.3,1.5l7.3-0.3l3-0.8
	l30.6,5.1l5.8-1.8l2-1.8l1.3-2.5V523l-2-0.5l-2.5,1.3h-3.3l-2.5-1.3l-7.3-7.8l0.3-2.3l1.3-2.5l-1.8-2l1.5-2.5l0.5-3.3l1.3-2.5
	l1.3-9.6l-0.5-2.8l0.5-2.3l-1-5.6l1.5-2.3l2-1.8l1.3-2.5l0.3-3.5l-1.3-2.8l-1.8-2l-0.5-0.3l0.3-3.8h7.6l4-2.3l-5.8-4.8l-1.1,0.7
	l-3.6,0.4l-1.6-1.4l-2.5-0.2l-1.4-7l0.9-2V441l-1.8-1.4l-1.6-2.1v-5.4l-0.4-0.9l-1.6-1.3h-2.5l-7.5-2.1l-2.7-0.2l-2-1.1l-2.1-0.5
	l-1.6-1.3l-2-0.9l-1.4-2.3h-0.5l-1.8-1.3l-1.3-1.6l0.2-2.5l1.3-1.6l-3.2-3.4l-0.4-2.7l-1.1-2.7l-0.4-2.3l-2.1-3.4l-4.4-2l-1.5,0.4
	l0.5,1.5l0.7,0.9l-1.5,0.8l-3.3,4.2l0,0.1l-2.7,4.3l-1.3,0.8l-5.6,0.1l0.3,1.5l1.5,1.3l-0.1,3.7l-1,0.9l-0.6,1.4l-0.4,1.8l-0.9,1.3
	l-0.1,3.8l-0.1,0.4l-1,1.5v1.9l0.6,1.3l-0.3,1.9l-1.4,1.3l-3,1.2l-0.8,1.8l-2.3,2.4l-0.3,3.5l-0.6,1.4l-2.7,0.5l-1.4,1.1l-1.6,0.3
	l-2.4,1.8l-1.4,0.5l-0.4,1.6l-4.1,3l-0.8,3v2.2l-0.9,1.5l-0.3,1.6l-1.3,0.9l-0.6,3.3l-2.4,0.2l-1.9-0.4l-1.4,1.2l-1,4.9l0.4,1.2h3.8
	v0.9l-4.8,7.2l-0.3-0.1l-0.4,2l-0.9,1.1l-0.4,1.5l-1,1l-1.3,4.8l-2.1,2.4l-0.5,1.8l-1.9,2.5l-0.6,1.5l-0.9,1l-0.3,2.2l-1.3,0.7
	l-1.1,1l-1.4,0.8l-0.9,1.3l-1.4,0.8v1.4l0.9,1.3l-0.7,0.5h-1.9l-0.9,1.3l-0.3,3.7l-0.4,1"/>
<path @mouseover="TaichungApi" id="Taichung" value="臺中市" sodipodi:nodetypes="cssssssssssssscsssssssssscssssssssssssscssscsssssssssssssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssscsssssssssssscssssssssssssssssssssssssssscsssssssssssssssssssssssssssscsssssssssscssssssssssssssssssssssssssscssssssssssssssssssssssssssssssscsssssssssssssssssssssssscsssssssssssssssssssscscsssssssssccssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssssssssssc" class="st1" d="
	M354.7,398.1l4.4,2l2.1,3.4l0.4,2.3l1.1,2.7l0.4,2.7l3.2,3.4l-1.3,1.6l-0.2,2.5l1.3,1.6l1.8,1.3h0.5l1.4,2.3l2,0.9l1.6,1.3l2.1,0.5
	l2,1.1l10.2,2.3h2.5l1.6,1.3l0.4,0.9v5.4l1.6,2.1l1.8,1.4v2.9l-0.9,2l1.4,7l2.5,0.2l1.6,1.4l3.6-0.4l1.1-0.7l5.7,4.8l8.9,3.2
	l2.1-0.5h5.4l2.5,0.5l1.8,1.6l2.1-0.2l4.3-1.4l6.4-7l3.8-9.8l3.2-3.2l4.5-1.3l1.3-1.6l-0.4-6.6l3.8-7.5l1.6-1.1l2.3,0.7l1.1,1.6
	l4.6,0.9l1.6,1.4v5.4l1.1,0.5l0.7-1.6l1.4-1.3l0.9-1.8l1.1-4.3l1.6,1.4l0.4,0.5l2.9,1.4l2.5,0.4l2.5-0.5l6.1-5.2l2.3-0.4l1.4,1.3
	l2.3,0.5l5.2-0.2l1.8-1.1l2.7-2.7l2-6.3l1.4-1.4l2.5-0.5l4.3,0.5l1.6-1.1h4.1l3.9-2l1.3-2l2-1.3l1.3-1.6l1.8-1.1l1.3-2l0.5-2.1
	l1.8-0.9l10.5-0.2l1.4-1.3l1.3-2l0.7-2l2.5-0.2l1.3-1.6l1.6-1.1l2,0.9l1.3,1.4l4.3,1.3l0.9-1.8l1.8-1.1h2.7l4.1-1.8l1.6,1.1l2.5,0.9
	l2-0.7l1.3-2.1l0.5-2.1l2.3-3.8h0.9l3.2,2.3l1.1,1.6l4.6,1.1h2.7l1.1-1.6l4.8,0.5l1.3,1.3l6.4,1.8l1.8-1.4l0.9-1.8l-0.2-2.5l3.8-1.6
	l1.1-1.6l2.7,0.2l1.4-1.3l0.5-2.3l-0.9-4.6l1.3-2l2.3-0.9l1.6-1.1l1.8-4.1l1.4-1.6h2.7l1.8-1.3l1.4-1.8l2.1-4.3l0.7-7.3l0.9-2
	l2.3-1.3l1.3-1.5l-1.3-2.1l-1.6-1.1l-1.1-1.8l-2.1-1.1l-7.1,0.9l-1.8,0.9l-2.3,0.4l-1.6,1.3l-1.3,1.6l-2.7,0.4l-1.8-0.9l-4.1-7h-4.8
	l-2-0.7l-2.7-2.7l0.9-7.1l-0.5-2.1l-0.9-1.8l-1.3-1.4l-0.4-0.2l-1.7,0.9l-0.6,1.4l-1.3,0.8l-5.8-0.1l-1.3,0.6l-6.5-0.2l-0.1,0.8
	l-1.8,0.9l-2,1.6l-1.4,1.8l-0.2,2.5l-3.4,5.5v2.7l-2.1,0.5h-2.7l-1.8-2.5l0.9-1.4l-2.7-1.1l-2,0.9l-0.7,2.1l-1.3,1.8l-2.3,0.7
	l-4.8,6.8l-2,0.7h-5.4l-1.8,1.3l-0.7,2l-0.7,0.2l-2,2.1l-0.4,2.5l-2.1,0.5l-3.4,2.9l-2.1,0.5l-5-0.5l-4.5,1.6l-5.4,6.8l-2.7,0.2
	l-2-1.1l-3.2-3l-0.4-2.5l-1.8-1.3l-2.7-3.9l-1.6,0.4h-2.7l-2-0.9l-5-0.4l-6.1-2.1l-4.8-0.2l-2.1,0.9l-1.4,1.4v2.7l0.9,2l0.4,5
	l-0.9,2l-1.8,1.4l-2.1,0.7l-10.4-0.4l-2,0.9h-5.4l-5.2-1.6l-3.2-3l-1.1-2l-1.6-1.3l-11.3-2.1l-3.4-2.9l-2.5-0.7l-1.4-2l-3.6-2
	l-1.4-1.6l-2.1-0.7l-1.3-1.6l-0.9-0.4l-3-0.4l-1.3-1.8l-3.2-2.1l-7.5-9.6h-0.4L407,331l-4.5-1.8l-2.3-3.8l-0.4-2l-3.6-4.7l-1.7,0.4
	l-0.3,2.3l-9.1,12.6l-1.9,4.7l0.3,3.8l-0.1,0.5l-1.3,1.6l-0.5,1.4l-2.8,1.3l-1,1.8l-4.7,3.2l0.1,1.4l0.5,1.2l0.1,2.1l-0.9,1
	l-2.4-0.8l2.8,1.3l0.5,1.3l-1,1.4l-0.9,0.8l-2.3-2.9l-0.9,0.5l-1.1,1.3l-2.2,1.2l0.1,1.8l-0.8,1.3l-2.8,1.6l-0.9,1.4l4.2,5.7
	l-0.1,1.6l-0.9,1.3L364,378l-1-1.9l0.2-1.6l-1.5,1.6l-1.5-0.1l-0.4-1.9l0.9-1.8l-0.1-1.8l-1.3,1.3l-2.3,6.4l1.6,1.3l0.6,1.4l0.6,0.5
	l0.1-0.3l1.8,1.1v1.9l-0.6,1.5l-3.9,5.7l-1.2,0.9l-1.5,3.8L354.7,398.1L354.7,398.1z"/>
<path @mouseover="YunlinApi" id="Yunlin" value="雲林縣" sodipodi:nodetypes="csssssssssssssssssscssssssssssssssscsssssscssssssssssssssssssssssssssscssssssssssssscsssssssssssssssssssscsssssssssssssssssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssc" class="st1" d="
	M426.5,590.2v-3l-2.3-2l-3.3-0.5l-1,2.8l-2.8,0.5l-3.3-0.8l-0.8,3l-3,0.5l-3.5-0.3l-2.3-1.5l-1.5-2.8l-0.8-3l-4.8,3.5l-0.3-7.3
	l2-5.8l0.3-0.3l1.8-4l0.5-3.3l-0.3-3.5l-1.5-2.5l-0.3-7.3l0.8-3l2.8,0.5l0.5-7.1l-5.1-10.9l-20.7-3l-3.8-1.5l-2-0.3l-10.4,1
	l-14.4-5.6l-4.3-0.5l-0.8-1.3l-5.1-2.8l-2.5,1.3l-14.6-0.3l-7.6,2L301,521l-5.8-1.8l-3.8-0.3l-6.4-2.2l-3.9,0.1l-1.3-0.7l-1.4-0.3
	l-0.5,1.5l-1.8,0.1l-6.1,10.8l-0.1,0.7l-2.2-0.1l-1.3,0.8l-2,2.4l-0.6,1.6l-0.3,3.8l-1,1.2l-0.3,1.6l1.7,2.4l-0.3,1.8l-1.7,2.4
	L259,547l-0.4,1.5v1.9l-2.2,1.2v2.4l-0.1-0.1l-0.5,0.3l-0.4,1.6v1.9l0.5,1.4l1.9,0.1l1.4,2l-2.3,2.8l-1.4,2.8l-0.4,1.5l-1.9,3.2
	l-1,3.5l-1.3,1.9l-2.6,7.4l0.3,7.5l-0.4,1.5l0.1,1.4l1.8,0.9l-0.1,1.7l-1.5,0.6l-2.2,1.6l0.5,2.2l1.1,0.6l1.5,0.3l0.1,1.9l-1,1.3
	v3.8l1.3,0.9l2,2.8l1.4,1.1l-1.3,0.8l-0.9,1.7l-1.8,0.1l-0.5-1.4l-1-0.9l-1.5,0.9l-2.2,2.5l3.9,0.1l5.8,2.3h3.8l1.5,2.3h3.8l2.8-1.3
	l6.3,2.3l3.8,0.5l2.3-1.8l1.8-2.3l0.3-3.5l-0.8-3l2-2h3.3v3.3l3.5,1.3l1-2.8l4.8-2.8l0.8-3.5l1.8-2l6.3-2.5l2.8,1.5l1.8-6.1l1.5-2.5
	l4,0.3l2.5-1.3l1-3l5.8-1.8l1-2.8l2.3-1.8l1.8-2.3l2.8,1.3l2.3,1.8l2.8,1l5.8-2.3h7.6l5.3-2.8l5.1,1.3l1.5,5.1l4.3,3.5l1.5,2.3
	l2.5,1.5l3.5,0.3l2.3,1.8l3,1l13.9,1.5l2.8-1.5l1.8-2l5.6,0.3l-0.5,3.8l2,3.3l2-2l3.3-0.8l2,2l3-0.3l2.8-1l3.5,0.3l2.8,1.5l3.5,0.5
	l1.3-2.5v-3.5l-0.8-3l-1.5-2.3L426.5,590.2L426.5,590.2z"/>
<path @mouseover="hualienApi" id="hualien" value="花蓮縣" sodipodi:nodetypes="csssssssssssscsssscssssssscsssssssssssssssssssssssssssssscsssssscssssssscsssssssssscsssssscsscssssssssssssssssscsssssssssssssssscssssssssssssssssssssssssssscssssssssssssssssssssscssssssssssscsssssssssssscssssssscsssssssssssscssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssccsssssssssssssssscsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssscsssssssssssssssssssssssssssssssssssssssssssscssssssssssssssssssssc" class="st1" d="
	M655.9,649.2l-3.4-0.9l-2.3-1.8l-3-0.8h-3.8l-2.8,1l-4.3,3.5l-7.3,13.1l-0.3,0.3l0.5,4.5l2,2.3l3.3,1.8v0.3l-12.1,18.4l-0.5,8.8
	l-1.8,2.3l-2.3,1.5l-1.3,2.5l-1.5,6.1l-2.3,1.8v3.8l-1.5,2.8l-0.3,2.8l-3,5.8l-4.3,3.5l-1,2.8l0.8,3.5v11.4l-1,2.8l-9.8,1.5
	l-2.5,1.8l-2-0.3l-0.3-3.5l-1.8-3.3l-2-1.8l-4.5-0.3l-1-0.8l-1.8-2.3l-3-1l-2.5-1.5v-2.8l-3.8-5.3v-4.3l-1.3-2.8l-1.8-2.3l-5.1-3.3
	l-5.3,2.5l-0.5,1.3h-1l-2.8-1.3l-1.3-2.5l-3.5-4l-3.5-0.3l-5.3-3.3h-4.3l-1.3-2.5l-0.8-0.8L526,701l0.3-3.8l-3.8-4.8l-0.8-2.5l0.8-3
	l-0.3-3.5l-15.4-10.6l-3-0.8l1-3.5l1.8-2.5l3.3-1l-0.5-2.3l1.5-2.3l3.3-0.5l1.5-2.3v-7.1l-2.3-1.5l-0.5-1.6l1.3-1.1l3-0.8l3-2l3-0.8
	l0.8-3.5l-1-3l-2.3-1.8l1.8-2l0.8-3.3l2-2.3l2.3-1.5l0.8-3l2.3-1.5l3.5,0.3l2.8-1.3h3.8l1.3-0.5l2.5,1.5l3,0.8l4.8-4v-7.6l0.8-3
	l2.3-1.5l-2.3-6.3l2.5-1.3l3.8,1l2.8-1.3l1.5-2.3l3.3-1.5l4.5-0.3l3.8-8.3l1.3-10.4l1.3-2.5v-3.8l2-5.6v-9.3l-2.5-2.3l-0.3-3.5
	l0.8-2.8l-8.1-5.8l0.3-3.5l3.3-0.8l3-2.3v-1.5l-0.8-3l0.5-3.5l2.3-1.5l1-3.3l0.3-3.8l1-3l2-2.5l0.3-3.8l2.3-2.3l3-0.8l-0.5-5.6
	l-1.8-3l4.3-3.8l-0.3-3l-1-3.3v-3.8l0.8-2v-7.6l-2-2.5l-1-0.3v-3.5l6.1-12.9l0.3-7.3l2.3-2.3l2.5-1.3l1.5-2.5l2.5-1.3l2-3.5l0.8-2.5
	l0.3-3.5l-1.5-2.3l-3.5-0.5l-1-2.8l-1.8-2l-3.8-1.3l-0.8-1l-0.3-6.3l2.8-6.6l3-0.8l2-1.8l2.8-1.3l3.8-3.8h3.8l1.5-2.3l-1.8-5.6
	l2-1.5l0.9-1.8l-0.2-2.5l3.8-1.6l1.1-1.6l2.7,0.2l1.4-1.3l0.5-2.3l-0.9-4.6l1.3-2l2.3-0.9l1.6-1.1l1.8-4.1l1.4-1.6h2.7l1.8-1.3
	l1.4-1.8l2.1-4.3l0.7-7.3l0.9-2l2.3-1.3l1.3-1.5l12,7.7h8.1l3,1.3l4,0.5l8.1,5.6l8.3,1l3-0.8l-3-2.5l0.8-3l3.3-0.8l2.3-1.5l2.3,1
	l2-1.8l-0.8-1.5l-2-1.8l0.3-3.3l2-0.8l4.3,3.8l4.8,1.5l4.5,3.5l9.1,3.8l7.3,0.5l8.1,4l4.2,0.5l-0.1,1.3l-0.6,1.3l-1.5,0.7l-0.9,1.5
	l-2.3,2l-2.7,3.9l-0.1,5.6l-1.2,0.9l-1.1,2.7l-1.5,0.6l-0.8,1.9l-0.3,0.1l-3.5,0.4l-3,5.4l-1.3,1l-1.7,0.3l-3.3,2.9l-1.5,0.4
	l-0.9,1.1l-1.3,0.8l-3.9,5.3l-1,3.3v5.7l2.4,4.3l-0.8,0.8l-0.5,5.2l-0.3,0.5l-0.4-0.3l-1.4,2.4l-1.4,0.5l-3.2,3.7l-1.5,0.8l-4.3,4.7
	l-0.6,1.4l0.1,11.9l0.6,1.3l0.5,3.3l7.2,7.5v1.9l-1,3.4l-1.4-0.4l-0.4,1.7l0.7,1.3l-1.5,0.5l-1.1,2.5h1.6l-0.8,3l-1.9,0.1l-0.8-1.1
	h-1.5l-1,0.9l-0.6,1.7l-1.1,1.1l-1,3l1.4,3l0.1,5.6l-1,3.4l-0.1,5.3l-0.5,1.7l-0.1,5.6l-0.6,1.3l-0.4,3.4l-1.9,4.3v1.9l-0.6,1.4
	l-0.3,1.6l-1.9,3.9l-0.3,1.8l-3.3,4.8l-0.6,2.1v10.5l0.5,1.4l-1.4,6.4l-3.5,5.4l-1.7,1.1v1.8l-0.6,1.4l-0.1,1.8l0.9,0.6l0.8,2.5
	l-0.9,1.1l-0.3,1.7l-0.6,1.3l-0.9,6.9l-0.9,1l0.1,1.3l0.8,1.2l-1,1.1l-1.5,0.6l-0.5,3.4l-1.3,1.5L667,595l-0.9,1.8l-0.1,3.9l-0.9,3
	l-1.4,1.3l-0.4,1.7l-1.6,2.4l-0.2,1.9l-1.3,3.3l-0.1,3.7l-0.9,1.4l-0.3,2.1l0.5,0.4l0.6,1.7v3.8l1.7,2.5l-0.1,3.7l-0.5,1.5l-1,1.1
	l-1.5,0.6l-1.8,0.1l0.4,0.5l1.7,1l-0.8,1.5v1.9l-0.9,3.3v1.9l-0.6,1.5L655.9,649.2L655.9,649.2z"/>
<path @mouseover="nantouApi" id="nantou" value="南投縣" sodipodi:nodetypes="csssssssssssssscsssssssssssssssssscsssssssssscsssssssssssssssssssssscsscsssscsssssssssssssssscssssssssssssssssssssssssssscssssssssssssssssssssscssssssssssscsssssssssssscssssssscsssssssssssscsssssssssssscssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssssssccsssscsssssssssssssssssssssssssssssssssz" class="st1" d="
	M398.5,532.1l5.1,10.9l-0.5,7.1l-2.8-0.5l-0.8,3l0.3,7.3l1.5,2.5l0.3,3.5L400,572l-0.8,1.3l-0.3,0.3l-2,5.8l0.3,7.3l4.8-3.5l0.8,3
	l1.5,2.8l2.3,1.5l3.5,0.3l3-0.5l0.8-3l3.3,0.8l2.8-0.5l1-2.8l3.3,0.5l2.3,2l0.1,3l6.5-0.7l11.6,4.3h3.8l3.3,0.8l1.3,2.5l0.3,8.6
	l-0.8,3.3l-2.8,2.3v3.8l1.5,2.5l2.3,2l0.5,7.3l2.5,5.8l2,2.3l11.4,1.3l5.6-2.3l11.1,1l2.8,1l11.9,0.8l6.3,2.3h0.5l2.5,1.8l1.3,6.3
	l1,0.5l1.3-1.3l3-0.8l3-2l3-0.8l0.8-3.5l-1-3l-2.3-1.8l1.8-2l0.8-3.3l2-2.3l2.3-1.5l0.8-3l2.3-1.5l3.5,0.3l2.8-1.3h3.8l1.3-0.5
	l2.5,1.5l3,0.8l4.8-4v-7.6l0.8-3l2.3-1.5l-2.3-6.3l2.5-1.3l3.8,1l2.8-1.3l1.5-2.3l3.3-1.5l4.5-0.3l3.8-8.3l1.3-10.4l1.3-2.5v-3.8
	l2-5.6v-9.3l-2.5-2.3l-0.3-3.5l0.8-2.8l-8.1-5.8l0.3-3.5l3.3-0.8l3-2.3v-1.5l-0.8-3l0.5-3.5l2.3-1.5l1-3.3l0.3-3.8l1-3l2-2.5
	l0.3-3.8l2.3-2.3l3-0.8l-0.5-5.6l-1.8-3l4.3-3.8l-0.3-3l-1-3.3v-3.8l0.8-2v-7.6l-2-2.5l-1-0.3v-3.5l6.1-12.9l0.3-7.3l2.3-2.3
	l2.5-1.3l1.5-2.5l2.5-1.3l2-3.5l0.8-2.5l0.3-3.5l-1.5-2.3l-3.5-0.5l-1-2.8l-1.8-2l-3.8-1.3l-0.8-1l-0.3-6.3l2.8-6.6l3-0.8l2-1.8
	l2.8-1.3l3.8-3.8h3.8l1.5-2.3l-1.7-5.6l-1.4-0.8l-4.8-1.1l-1.3-1.3l-4.8-0.5l-1.1,1.6l-5.2-0.4l-2.1-0.7l-1.1-1.6l-3.2-2.3h-0.9
	l-2.3,3.8l-0.5,2.1l-1.3,2.1l-2,0.7l-2.5-0.9l-1.6-1.1l-4.1,1.8h-2.7l-1.8,1.1l-0.9,1.8l-4.3-1.3l-1.3-1.4l-2-0.9l-1.6,1.1l-1.3,1.6
	l-2.5,0.2l-0.7,2l-1.3,2l-1.4,1.3l-10.5,0.2l-1.8,0.9l-0.5,2.1l-1.3,2l-1.8,1.1l-1.3,1.6l-2,1.3l-1.3,2l-3.9,2H520l-1.6,1.1
	l-4.3-0.5l-2.5,0.5l-1.4,1.4l-2,6.3l-2.7,2.7l-1.8,1.1l-5.2,0.2l-2.3-0.5l-1.4-1.3l-2.3,0.4l-6.1,5.2l-2.5,0.5l-2.5-0.4l-2.9-1.4
	l-0.4-0.5l-1.6-1.4l-1.1,4.3l-0.9,1.8l-1.4,1.3l-0.7,1.6l-1.1-0.5V428l-1.6-1.4l-4.6-0.9l-1.1-1.6l-2.3-0.7l-1.6,1.1l-3.8,7.5
	l0.4,6.6l-1.3,1.6l-4.5,1.3l-3.2,3.2l-3.8,9.8l-6.4,7l-4.3,1.4l-2.1,0.2l-1.8-1.6l-2.5-0.5h-5.4l-2.1,0.5l-9-3.3l-3.9,2.3H399
	l-0.3,3.8l0.5,0.3l1.8,2l1.3,2.8l-0.3,3.5l-1.3,2.5l-2,1.8l-1.5,2.3l1,5.6l-0.5,2.3l0.5,2.8l-1.3,9.6l-1.3,2.5l-0.5,3.3l-1.5,2.5
	l1.8,2l-1.3,2.5l-0.3,2.3l7.3,7.8l2.5,1.3h3.3l2.5-1.3l2,0.5v3.3l-1.3,2.5l-2,1.8l-5.8,1.8L398.5,532.1L398.5,532.1z"/>
<path @mouseover="ChiayiApi" id="Chiayi"  value="嘉義市" sodipodi:nodetypes="csssssssssssssssssssssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssssscsssssssssssssssssssssssssssssscsssssssssscsssssssssssssssssssssscsssssssssssssscssssssssssssssscssssssssssssssssssscssssscssssssssssssssssssssssscsssssssssssssscsssssssssscssssssssssssssscssssssscssssssc" class="st1" d="
	M250.8,685.4l-0.2-1.7l-1.6-0.6h-3.8l-0.4-1.5l0.2-5.1l3-6.9l1.4,0.1l3.7-1.5l1.3-5l1-1.7l-0.3-3.5l-0.6-0.9l-1.4,1.3l-1.3-1
	l-0.8-1.5l-0.1-1.9l1-3.2v-1.7l-1.5-0.4l0.1-1.8l2.2-4.2H251l-1.6-0.9l-0.4-2l0.8-1.5v-2l0.9-1.1l0.5-1.8l0.8-1.4v-1.9l-1.4-0.6
	l-5.7,0.4l-1.8-0.6l-0.9-1.5l0.4-9.1l1.6-0.9l3.9,0.1l5.8,2.3h3.8l1.5,2.3h3.8l2.8-1.3l6.3,2.3l3.8,0.5l2.3-1.8l1.8-2.3l0.3-3.5
	l-0.8-3l2-2h3.3v3.3l3.5,1.3l1-2.8l4.8-2.8l0.8-3.5l1.8-2l6.3-2.5l2.8,1.5l1.8-6.1l1.5-2.5l4,0.3l2.5-1.3l1-3l5.8-1.8l1-2.8l2.3-1.8
	l1.8-2.3l2.8,1.3l2.3,1.8l2.8,1l5.8-2.3h7.6l5.3-2.8l5.1,1.3l1.5,5.1l4.3,3.5l1.5,2.3l2.5,1.5l3.5,0.3l2.3,1.8l3,1l13.9,1.5l2.8-1.5
	l1.8-2l5.6,0.3l-0.5,3.8l2,3.3l2-2l3.3-0.8l2,2l3-0.3l2.8-1l3.5,0.3l2.8,1.5l3.5,0.5l1.3-2.5v-3.5l-0.8-3l-1.5-2.3l1.6-2.4l6.4-0.6
	l11.6,4.3h3.8l3.3,0.8l1.3,2.5l0.3,8.6l-0.8,3.3l-2.8,2.3v3.8l1.5,2.5l2.3,2l0.5,7.3l2.5,5.8l2,2.3l11.4,1.3l5.6-2.3l11.1,1l2.8,1
	l8.5,0.2l-1.2,0.3l-2.5,1.3l-6.6,1l-2.3,1.5l-6.3,1.3l-4.3,3.5l-1.5,2.5l-2.8,1.3l-2.3,1.8l-3.3,0.5l-2.3,2.5l-1.8,4.3l-1.8,1.5
	l-1,2.8l-1.8,2l-0.3,3.5l-2.8,1h-3.8l-2,2l-1.5,2.5l-4,4l-7.1,0.5l-2.3,5.8l-5.1,2.5l-1,2.8l-6.6,0.5l-1.3,6.6l-8.1-0.3l-2.3-2
	l-7.8-0.3l-1.3,11.6l1.3,2.8l2,2.5v3.8l-2,1.8l-2.5-1.3l-6.3,1.3l-3-1l-3.5-2.5l-3.8,5.6l-3,0.8l-3.3-0.3l-4.3-3l-6.1-1.8l-1-2.5
	l3.3-4.8l-0.8-2.5l-2-3.3l-0.5-2.5l1.3-2.5l-1-2.8l-0.3-3.5l1.5-2.8l2.3-1.8l0.3-3l-1-2.8l-3.5-0.3l-3.8-1.3l-1-2.3l2.5-1.8
	l-0.3-3.3l-7.8-0.5v-3.3l2.5-1.8l1.5-2.3l-2-1.8l-2.3,1.3l-3-0.8l-2.5-2l-3.3-1l-1.8-2.3l-3.8-1l-0.3,0.5l-2.3,1.5l-3.3,0.3l-2-2
	l-3.3,0.5l-5.3,2.5h-7.6l-6.1,3.5l-0.3,0.3l-1.5,2.5l-6.3-0.3l0.3,3l-7.1,0.5l-0.5,3.3l-1.3,2.5l-1.8,1.5l-2.5-1.5l-2,2l1,2.8
	l-0.5,1.8l-9.6,4.8l-0.8,3l-3.3,4.8l-3,1.3l-4.5-1.3l-1.3-2v2.8l-2.5-0.3l-2.3-2l-1-3l-3.8-0.8L250.8,685.4L250.8,685.4z"/>
<path @mouseover="taitungApi" id="taitung" value="臺東縣" sodipodi:nodetypes="cssscsssssssscsssssssssssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssscssscssssssssssssssssssssssssssscsssssssssssssssssssssssssssssssssssssssssssssssscsssssssssssssssssssscssssssssssssssssssssssssssssssscssssssssssssssssssssssssssssssssssssssssssssssssssssssscsssssssssssssssssssssssssccsssssssssscssssscssssssssssscssscsssssssscssssssssssssssssscssssscssssssscscssssssssssssssssssssssscsssssssssssssssssssssscssssssssssscsssssssssssscsssssscsssssssssscssssssscsssssscsssssssssssssssssssssssssssssscssssssscsssscssssssssssssc" class="st1" d="
	M655.8,649.3l-2.2,6.8v1.9l-1.4,0.9l-1.8,7l-0.1,5.8l-1.8,3.8l0.1,5.5l-1.1,5.6l-1.5,1h-1.9l-1.5,0.4l-1.3,1l-1.1,3.2l-0.8,1.3
	l-1.4,1.3l-0.6,1.4l-0.1,1.7l-1.2,1.1l-0.4,4.1l-1,1.3l-2.4,9.7l0.9,1.1l0.5,1.4l-0.8,1.3l-1.5,1.2l-1.4-0.3l-0.9-1.4l-1.1,0.5l1,1
	l0.1,1.4l-3,2l0.3,7.9l1.9,3.8l0.4,1.8l-0.3,3.7l-1.4,1.4l0.1,5.4l3,3.2l-0.9,2.9l-3.7,0.1l-1.3,1l-2.2,4.2l-1.3,0.6l-3.8,0.1
	l-0.9,1.2l-1.4,0.8v1.9l-0.8,1.3v1.9l-2,2.9l-1.4,4.9l-1,1.4l-0.9,5.7l-1.2,1.7l-0.3,1.6l-1.1,0.8l-1,1.1l-1,2.9l-1,1.6l-1.3,5.1
	l-0.8,0.9l-0.5,1.5v1.9l-3.3,3.4l-0.5,1.4l-1.8,0.1l-1.1,1l-0.9,1.5l-0.7,0.3l-0.3,3.2l-3.4,7.4l-2.2,2l-2.1,4.4l-0.6,3.2l-1.2,1
	l-1.5,0.4l-2.4,2.5l-0.1,3l-3.2-0.8l-1.4,0.5l-3.4,0.5l-5.8,4.8l-0.8,1.2l-0.3,1.6l0.6,1.3l1.8,2l0.4,1.3h-1.9l-0.8,1.3l0.6,1.3
	l1.3,0.7l1,1.1l-0.4,1.8l1.1,2.8l-0.5,1.7l-2.1,1.9l-1.7,0.3l-1.4,1.4l-1.3,8l-2.2,2l-2.8,1.2l-1.2,1l-0.8,1.3l-2.5,2l-0.8,1.1
	l-1.1,0.8l-1.5,0.6l-3.8,4.5l-2.7,1.5l-1.5,0.4l-1,0.9l-1.4,0.6l-1.9,0.3l-1,1l-1.8,0.1l-0.9,1.1l-2.4,1.4l-1,1l-2.7,1.3l-0.4,1.5
	l-1,1.3l-1.8,0.1l-1.1,1L518,898l-1.1,1l-1.7,2.6l-0.9,3.2l-1.1,1.3l-0.3,1.6l-0.9,1.2l-0.1,1.8l-0.8,1.5l0.1,1.8l-0.2,0.6l-0.2,5.2
	l-0.8,1.5l-0.1,1.4l-2,2.8l-3.5,3.2l-0.9,1.3l-1.7,0.9l-0.8,1.3l-0.3,1.7l-0.9,1.3l-0.1,1.8l-0.7,1.6v1.9l-1.3,0.8v2.5l-2.9,6.8v1.9
	l-0.9,0.9v3.8l-2.2,4.2l0.1,2.1l-1.3,1.7l-0.5,3.5l-0.9,1.1l-0.3,3.5l-1,1.3l-0.4,1.8l-1.9,2.5l-0.5,1.4l-0.9,1.1l-3.6,10.1
	l-0.9,1.3l-0.5,5l-2.5,2.5l-2.9,9.1v3.5l-0.6,1.4l0.3,5.4l1.3,1.7v7.8l0.9,3.2l0.1,4.6l-3.5,1.2l-2,1.8l-3.3,1.3l-2.8-4.8l-3-0.8h-4
	l-1.3-2.8l-2.8-1l-2.3-1.5l-4.3,0.3l-0.5-2.3l0.8-3.3l1.8-1l-2.8-1l-1-2.5l-4.8-2.8l1.8-2.3l2.5-1.3l-0.3-7.6l-2.5-1.5l-1.3-2.5
	h-2.8l-3.8-4l-3.5-1.8l4.8-14.6l6.6-1l1.3-2.8l-0.8-3.3l-2.8-2l-2.5-5.3l-4-2.5l-0.3-3l-1-3l4.3-3.3v-3.8l-4-8.1l-0.5-4.3l-1.8-1
	l-1-3l0.5-3.5l2.8-5.1l-1.3-2.8l1.5-2.3l1-2.8l-0.3-3.5l1-2.5l2-2l0.8-3l1.8-2l0.3-1l4-5.6l0.3-3.5l1.8-2.3l0.3-2.5l3.3,0.5l3.5-1.8
	l6.1-1.3l3-6.3l11.1-0.5l2-2.3l0.3-3.5l1.8-2l0.5-9.9l2-2l-1-2.3v-3.8l-1-3.3l-2.5-1.3L471,851l-2.8-2.5l-0.8-1.5l-0.8-3v-3.8l0.5-1
	l0.7-6.8l-2.9-3.9l-5.4-0.4l-2.9-8.6l0.4-5l-1.4-1.4l-1.8-3.9v-5.4l1.1-4.3l10-12.9l0.7-1.8V781l6.4-4.6l-1.4-4.3l-2.5-2.5l1.8-4.3
	l3.6-3.9l-1.1-22.5l3.2-2.1l2.1-5l3.6-1.8l-1.1-3.9v-3.9l1.4-3.9l-0.4-1.8l-1.1-0.7l2.9-3.6l3.6-1.4l6.8-5.7l5-6.4h3.9l7.9-2.1
	l2.9-2.9l8.4-3.6l0.9,2.5l3.8,4.8l-0.3,3.8l3.8,9.1l0.8,0.8l1.3,2.5h4.3l5.3,3.3l3.5,0.3l3.5,4l1.3,2.5l2.8,1.3h1l0.5-1.3l5.3-2.5
	l5.1,3.3l1.8,2.3l1.3,2.8v4.3l3.8,5.3v2.8l2.5,1.5l3,1l1.8,2.3l1,0.8l4.5,0.3l2,1.8l1.8,3.3l0.3,3.5l2,0.3l2.5-1.8l9.8-1.5l1-2.8
	v-11.4l-0.8-3.5l1-2.8l4.3-3.5l3-5.8l0.3-2.8l1.5-2.8v-3.8l2.3-1.8l1.5-6.1l1.3-2.5l2.3-1.5l1.8-2.3l0.5-8.8l12.1-18.4v-0.3
	l-3.3-1.8l-2-2.3l-0.5-4.5l0.3-0.3l7.3-13.1l4.3-3.5l2.8-1h3.8l3,0.8l2.3,1.8L655.8,649.3L655.8,649.3z"/>
<path @mouseover="tainanApi" id="tainan" value="臺南市" sodipodi:nodetypes="cssssscssssssssssssssssssssssscsssssssssssssscsssssssssscssssssssssssssscssssssscsssssscsssssssssssssssssssssssssscssssssssssssssssssscsssscssssssssssssssssssssssssssssssssscsscssssssssssssssssssssssssscsssssssssssssscscssssssssscsssssssssssssssscssssssssssssssssssssssscssssssscsssssssssc" class="st1" d="
	M401.5,715.2l-1,0.8l-2.5-1.3l-6.3,1.3l-3-1l-3.5-2.5l-3.8,5.6l-3,0.8l-3.3-0.3l-4.3-3l-6.1-1.8l-1-2.5l3.3-4.8l-0.8-2.5l-2-3.3
	l-0.5-2.5l1.3-2.5l-1-2.8l-0.3-3.5l1.5-2.8l2.3-1.8l0.3-3l-1-2.8l-3.5-0.3l-3.8-1.3l-1-2.3l2.5-1.8l-0.3-3.3l-7.8-0.5v-3.3l2.5-1.8
	l1.5-2.3l-2-1.8l-2.3,1.3l-3-0.8l-2.5-2l-3.3-1l-1.8-2.3l-3.8-1l-0.3,0.5l-2.3,1.5l-3.3,0.3l-2-2l-3.3,0.5l-5.3,2.5h-7.6l-6.1,3.5
	l-0.3,0.3l-1.5,2.5l-6.3-0.3l0.3,3l-7.1,0.5l-0.5,3.3l-1.3,2.5l-1.8,1.5l-2.5-1.5l-2,2l1,2.8l-0.5,1.8l-9.6,4.8l-0.8,3l-3.3,4.8
	l-3,1.3l-4.5-1.3l-1.3-2v2.8l-2.5-0.3l-2.3-2l-1-3l-3.8-0.8l-2.8-1.8l-0.8-1l-7.2-1.3l-3.9,6.8l0.6,1.3l1,0.1l-0.6,1.9l-1.3,0.9
	l-0.3,1.8l2.8,1.7l1.2,0.3l1.6-0.5l-2.2,3.2l-3.4,1.3l-0.9,1.3l0.3,1.8l0.8,1.5l-2.5,2.4l-0.4,1.7l-0.8,1.4l-2.4-0.6l-0.6,1.3
	l-0.8,3.4l0.1,3.8l-4.9,9.2l-0.5,3.5l-1.5,2.5l1.1-1.4l1.5-0.6l1.5-0.1l0.6,8l1.2,0.9l1.5,0.6l-0.9,5.3l-3.3,1.4h-0.3l-3.5,1.2
	l-3.2,2.9l-3.3,1.5l-0.3,3.5l0.3,0.5l0.3,3.7l0.8,0.9h1.9l-0.1,5.9l0.8,2.4l2.1,2.5l0.3,0.8l1.9-0.7l1.3-0.9l1.1-1.2l1.5-2.8
	l5.6-6.3l3-2l19.9-1.8l1,1l0.8,3l6.8-0.3l0.5,2.8l3,0.5l2.5-1.3l6.3,2.8l1.5,2.5l-2,2.5l-3.3,1.3l-5.3,7.6l3.8,2.5l7.3,9.3l-3.3,8.3
	h-3.8l-2.8,1.3l-0.3,3.5l-2.8,0.5l-4.5,8.3l8.5,3.1l2.5-1.3l1.8,1l3.8,4h3.5l0.5-0.8l2.8,1.3l2,0.3l1.5-2l17.9,4l3.8-0.3l6.3-5.8
	l1.8-2.5l3-1l3.5-0.3l2.5,1.5h3l1.5-6.3l1.5-0.8l1-1.3l0.5-3.3l3.8-8.8l3-0.8l1-3l0.3-3.5l5.6-0.3l0.3-3.5l9.1-6.6l3.5-5.6l10.4-7.1
	l2.3-2.5l3.8-2.3l0.5-3l0.3-0.3l1.3-0.8l0.5-3.5l1.3-2.5l0.3-3.5l5.6-6.8l1.8-0.3l8.1-10.9l0.3-3.8l4-5.1l0.8-3l-2.3-1.8
	L401.5,715.2L401.5,715.2z"/>
<path @mouseover="KaohsiungApi" id="Kaohsiung" value="高雄市" sodipodi:nodetypes="cssssssssscssssssscssssssssssssssssssssssscsssssssssssssssscssssssssscscsscscsssssssssssssssssssssssssssssssssssssssssssssccssssssscssssscsssccssscscsscssscsssssscsssssssssscsssssssssssscsssssssssscsssssssssscsssssssssssscssssssssscssscssssssssscsssssssssssssssssssssssccsssssssssssssssssssssscssssssssssscsssssssssssscsscssssssssssssssssscsssscsscsssssssssssssscssssssssssssssscsssssssssssssssssssc" class="st1" d="
	M401.5,715.3l0.3,0.4l2.3,1.8l-0.8,3l-4,5.1l-0.3,3.8l-8.1,10.9l-1.8,0.3l-5.6,6.8l-0.3,3.5l-1.3,2.5l-0.5,3.5l-1.3,0.8l-0.3,0.3
	l-0.5,3l-16.4,11.9l-3.5,5.6l-9.1,6.6l-0.3,3.5l-5.6,0.3l-0.3,3.5l-1,3l-3,0.8l-3.8,8.8l-0.5,3.3l-1,1.3l-1.5,0.8l-1.5,6.3h-3
	l-2.5-1.5l-3.5,0.3l-3,1l-8.1,8.3l-3.8,0.3l-10.1-3.3l-7.8-0.8l-1.5,2l-2-0.3l-2.8-1.3l-0.5,0.8h-3.5l-3.8-4l-1.8-1l-2.5,1.3
	l-8.4-3.2l-1.7,0.7l-3.2,3l1.2,1.4l0.8,4.2l3,6.3v1.9h0.7l0.3-1.6l0.6-1.3l1.9-0.1l2.1,5.1l-0.3,1.6l-1.9,0.3l-1.4-0.9l-0.8-1.3
	l-0.4,0.9l0.1,1.8l0.8,2.3l0.1,1.8l1.8,3.4v1.4l8.9,21.1l0.2,1.8l1.5,3.4l1.4,1.8l3.1,6.6l2.9-2.9l8.2-2.1l3.2,2.1l2.1-1.4l3.9-0.7
	l1.1-4.3l1.4-1.8l2.1,5l-0.7,4.6l-2.1,3.2l-1.1,4.3l-2.9,1.8l2.1,3.9l4.6,4.3l-1.8,3.6v1.1l4.6,2.5l-1.8,7.5l-1.4,2.9l-3.2,1.1
	l0.7,1.8l2.9,0.4v1.8l-4.6,1.4v3.6l4.6-0.4l4.6,0.7l5-0.4l2.5,1.4l3.2,3.9l1.8,3.6v5l-8.9,8.6l-1.5,3.3l6.8,5.6l1.8,0.8l2.8,2.5
	l5.4,1.6l0.3-0.6l-0.9-14.5l0.9-2.9l0.9-1.1l1.8,0.4l2.5-2.2l2-5.8l0.3-3.5l1.8-6.1V920l-3.5-4.3l0.3-18.2l2-6.1l1.8-2.3l1.8-6.8
	l-0.3-4.5l0.8-1.3l-0.3-15.2l1.3-2.8l0.5-3.3l1.3-2.5l1.5-9.8l2.5-1.3l1.8,0.8l4.5,0.3l1.5,2.3h3.8l2.8-1.3l6.1,1.5l3.5-0.3l2.3-1.8
	l2.5-3.3l0.3-1.3l4-3.3l1.3-0.5l6.6-4.5l3.5-0.3l2.8-2l3-0.8l3,1.3l1.8,2v3.8l2.8,1.3h2.8l1-1l3-0.8l3.3-4.8l3-0.8h3.8l8.6,5.3
	l6.3,7.6l2.8,1.5l2.8-1.5l1.8-2.3l5.1-2.5l1.5-2.3h3.3l1,0.3l2.5,1.3l0.3,1.3l2.3-0.8l4.5,3l0.7-6.8l-2.9-3.9l-5.4-0.4l-2.9-8.6
	l0.4-5l-1.4-1.4l-1.8-3.9v-5.4l1.1-4.3l10-12.9l0.7-1.8V781l6.4-4.6l-1.4-4.3l-2.5-2.5l1.8-4.3l3.6-3.9l-1.1-22.5l3.2-2.1l2.1-5
	l3.6-1.8l-1.1-3.9v-3.9l1.4-3.9l-0.4-1.8l-1.1-0.7l2.9-3.6l3.6-1.4l6.8-5.7l5-6.4h3.9l7.9-2.1l2.9-2.9l8.5-3.6l0.8-3l-0.3-3.5
	l-15.4-10.6l-3-0.8l1-3.5l1.8-2.5l3.3-1l-0.5-2.3l1.5-2.3l3.3-0.5l1.5-2.3v-7.1l-2.3-1.5l-0.6-1.7l-0.9-0.3l-1.3-6.3l-2.5-1.8h-0.5
	l-9.9-2.8l-1,0.3l-2.5,1.3l-6.6,1l-2.3,1.5l-6.3,1.3l-4.3,3.5l-1.5,2.5l-2.8,1.3l-2.3,1.8l-3.3,0.5l-2.3,2.5l-1.8,4.3l-1.8,1.5
	l-1,2.8l-1.8,2l-0.3,3.5l-2.8,1h-3.8l-2,2l-1.5,2.5l-4,4l-7.1,0.5l-2.3,5.8l-5.1,2.5l-1,2.8l-6.6,0.5l-1.3,6.6l-8.1-0.3l-2.3-2
	l-7.8-0.3l-1.3,11.6l1.3,2.8l2,2.5v3.8L401.5,715.3L401.5,715.3z"/>
<path id="Kaohsiung" value="高雄市" sodipodi:nodetypes="cssssssssssscssssssssssssscsssssssssssssssssscsssssscssssssscssssscsssccssscscsscssscssssssc" class="st1" d="
	M313.9,949.7l-1.5-0.8l-3.9-3.3l-0.6-1.4l-2.3-2.5l-1.4-0.8l-3.3-3.5l-0.6-0.1l-3.3,0.1l-1.6-0.4v-0.6l0.5-0.7l2.7-0.5l-2.8-4.5
	l-1-1l-0.7-1.4l-1-1.1l-1.1-0.8l-1.3-1.8l-0.6-1.4l-2.7-2.6l-1.3-3.4l-1.5-0.8l-0.8-1.1l1.1-0.8l0.1-1.9l-0.9-1v-1.9l-0.9-1.4
	l-2.8-2.5l-0.5-1.8l0.5-1.6l0.3-4.2l4-3.9l-2.5-6.1l3.9,3.9l2.1-2.5l-4.5-5.6l-1.7-3.8l2.9-2.9l8.2-2.1l3.2,2.1l2.1-1.4l3.9-0.7
	l1.1-4.3l1.4-1.8l2.1,5l-0.7,4.6l-2.1,3.2l-1.1,4.3l-2.9,1.8l2.1,3.9l4.6,4.3l-1.8,3.6v1.1l4.6,2.5l-1.8,7.5l-1.4,2.9l-3.2,1.1
	l0.7,1.8l2.9,0.4v1.8l-4.6,1.4v3.6l4.6-0.4l4.6,0.7l5-0.4l2.5,1.4l3.2,3.9l1.8,3.6v5l-8.9,8.6L313.9,949.7L313.9,949.7z"/>
<path id="tainan" value="臺南市" sodipodi:nodetypes="cssssscssssssssssscssssssssssssssssssssssssssssscsscsssssssssssssscsssssssssssssssssssssssssc" class="st1" d="
	M227.5,771.9l0.3,1.6l-0.3,1.8l4.7,2.8l0.9,0.3l1.8,1.6l3.2,1.7l3.9,4.2l1.5,0.8l5.3,4.9l0.1,0.5l3.4,3.3l2.4,3.7l1.6-0.4l2.3-2.1
	l1.4-0.8l-1,2.2l-0.9,1.1v1.3l3.3,0.9l-1.7,1.4l-1.9-0.1l-1-1.4l-0.9-0.5l0.8,1.9l1.2,1.5l0.5,1.7l-0.5,9.6l-0.5,1.4l1,2l1.3-0.8
	l2-2l1.5-0.6l4.5-8.3l2.8-0.5l0.3-3.5l2.8-1.3h3.8l3.3-8.3l-7.3-9.3l-3.8-2.5l5.3-7.6l3.3-1.3l2-2.5l-1.5-2.5l-6.3-2.8l-2.5,1.3
	l-3-0.5l-0.5-2.8l-6.8,0.3l-0.8-3l-1-1l-20,1.8l-3,2l-5.6,6.3L227.5,771.9L227.5,771.9z"/>
<path @mouseover="newTaipeiApi" id="newTaipei" value="新北市" class="st1" d="M805.1,130.1l-1.4,0.1l-1.1,1l-1.2-2.2l-1.4-0.5l-0.9-1l-1.5-0.3l-1.8,0.1l-0.8,0.8l-1.7,1.1l-4-0.4l-4.9-4
	l-0.4-1.4v-5.7l-0.6-0.8l1.4-1l-0.3-0.6l-4.2-4.2l-1.3-3l1.5-4.5l1.5-1l0.4-1.5l-0.6-1.3l-1-0.9l-0.6-0.9l0.8-1.3l1.3-0.8v-1.9
	l-1.8-0.1l-1.7,0.4l-1,1l-3.4,1.2h-1.9l-5.9-1.3l-1.5,0.6l-1.4-0.6l-4.4-0.1l-2.9-0.9L755,95l-1.3,1.3h-1.6l-1-1.3l0.4-1.6l0.8-1.3
	l0.6-0.6h-1.9l-1.6,0.6l-1.8,0l0,1.2l-0.9,2.1l-1.4,1.4l-1.8,2.9l-0.9-0.2l-1.8-1.3l-2.5-0.5l-2.9,3l-2.3,0.5l0.5,2.1v4.8l4.6,4.5
	l-0.7,2.1l-1.1,1.8l-2.5,0.2l-4.6,2.3l-5.2-0.4l-5.4-4.6l-7-1.8l-1.6-1.8v-2l-1.4,1.3l-2.3-0.5l-1.6-2.1l-2.3-1.6l-3-6.8l-0.2-2.5
	l-1.4-1.6l-2.3-0.7l-1.1-2v-2.7l4.8-0.5l1.8-1.3l2-0.7l2.5-0.2l4.1-1.8l1.3-1.6l2.3-0.5l1.1-1.6l2-0.7l1.5-1.1l-2.9-2.1l-1.5-0.5
	l-1.6-1.1l-0.5-1.3l0.7-1.5l2.9-1.4l-0.3-0.8l-1.1-1l1-1.1l1.4-0.8l1.3-1.1l-0.4-1.1l-4.5,3.9l-6.3,0.4l-4.9-5.1l-0.3-1.3l1.3-1.3
	l-0.6-1.3h-2l-1.4-0.6l-2-2l0.5-3.8l-0.4-1.8l-0.7-1.3l-1.1-1l-3.7-5.2l-3.2-1l-1.8-2.3l-1.4-0.8h-1.9l-1.4-0.9l-1-1.1l-1.3-0.8
	l-0.4-0.1l-1.3,0.2l-1,1.1l-0.5,1.5h-6.1l-1.9-2l-1.1,0.8v1.9l-1.1,0.8l-5.1,0.8l-0.6-1.6l-0.6,0.6l-0.3,1.8l-1.4,1.1l-3.4,0.9
	l-1.4,1l-1.7,0.5l-3.5,7.4l-0.6,0.1l-3.7-0.5l-1.3,1l-0.1,1.8l-1,1.1l-0.4,1.5l-1.3,2.5l-0.3,1.9l-0.9,1.3l-1.3,0.8l-2.1,2.2
	l-0.3,1.9l-2,3.9l-1.9,0.5l-1.1-0.1l0.3,1.1l3.4,3.2l1.9,0.1l3.5,1.7l1.5,2.6l1.4,1l1,1.3l2.2,4.4l0.3,7.6l-0.9,0.8l-0.3-1.6
	l-0.8-1.7l-0.3-1.6l-2-2.7l-0.1-1.8l-0.7-1.8l-2.3-2.3l-5.8-3.8h-1.9l-1.1,1l-0.6,2.4l-3.7,3.5l-1.6,0.5l-2.8,1.7l-1.5,0.4l-4.2,2.8
	l-5.2,1.6l-1.3,0.9l-12,0.1l-2.4,2.3l-1,1.4l1.8,2.5l1.3,0.4l1.3,1.6l5,0.5l9.3,4.5l-0.5,3.6l2,1.8l5.2,1.3h5.4l1.3,0.9l1.8,2.1
	l0.5,2.3v0.7l-0.9,1.8l0.4,2.3l1.3,1.4l2.3,1.6l-0.9,1.6l-2,1.3l-2,0.7l2.1,1.6l0.2,2.1l-1.6,1.1l-2.1,0.7l-2,3.6l-2.9,2l-11.3-0.4
	l-1.8,0.9l-0.5,2.1l1.1,2l-0.5,5l-1.4,1.4l-0.9,2l1.3,2.3l2.1,0.2l1.6,1.3l-2.1,1.4l-1.3,1.4l-0.9,2l0.9,4.3l4.5,2.7l3.4,5.2
	l-1.3,1.6l0.4,2.1l0.2,0.2l2.5,1.6l-1.6,1.3l-4.6,0.9l-0.2,2.1l2.5,0.4l1.6-1.3l1.6,1.6l1.8,1.1l2.9,0.7l2.7-0.2l2-1.1l5.4-0.4
	l1.3,0.7l0.4,0.9l1.4,1.4l0.7,2l2.9,2.9l1.6,0.9l1.6,1.8l0.2,2.5l0.9,2.5l2.3,0.7v2.7l-1.6,1.1l-1.1,1.6l-3.2,2.7l-1.1,2l0.4,2.3
	l0.9,1.8v1.1l2,5l3.2,3l-0.5,2l2.5,1.1l0.2,1.8l2.5,0.7l1.4,2l2,1.4l0.5,5l1.5,0.6l4.8,0.3l2.3-1.4l4.6-0.7l5.2-3.4l0.5-2.5l5.9-3.2
	l2.7-0.2l2.1-0.7l1.1-1.6l1.6-1.3l2.3-0.4l1.4-4.3v-2.7l-0.7-2.1l-1.4-1.4l-0.4-2.5l2-1.6l0.4-2.3l-0.2-2.5l0.9-2l2.1-0.5l1.8-1.1
	l2.5,0.7l2.3-1.8l0.5-2.1l-1.4-1.3l10.5-1.3l3.6-1.8l1.6,1.8l0.7-2l2.1-0.7l1.1-1.8l1.8-1.6l0.5-1.7l4.8-2.6l2.7-3.2l2-1.1l2.3-0.4
	l7.5,1.1l1.8-0.9l2.5-0.5l-0.2-1.3l0.2-2.1l1.4-1.8l0.2-2.1l-0.5-2.3l2.5-3.2l3-2.5l2.3-0.4l5.4,0.4l5.9-3.9l1.4-4.3l-4.1-5.9
	l0.9-1.8l0.5-2.1l1.8-1.4l5.2,0.4l2.3,0.9h2.9l1.4-1.6l6.8-4.8l5.4-0.4l6.3-2.3l2.5-0.2l3.7,0.7l1.1-0.5l0.8-1.5l1.8-0.1l0.8-1.1
	l2.8-1.3l0.8-1.3l1.9-0.2l0.7-1.4l0.1-1.5L805.1,130.1z M704.3,127.2l-6.8-0.4l-2.1,0.5l-1.6,1.1l-5-0.4l-1.8,1.1l-1.3,2v2.3
	l1.3,4.1l-0.2,2.1l0.4,2.5l4.8,2.3l-0.2,1.8h-2.9l-2.1,0.9l-10-1.1l-3.7-2.5l-1.1-4.3l-2.5-0.2l-2.3-1.6l-1.3-2.1v-2.7l-0.7-2
	l-1.6-1.3l-2.9-1.3l-1.3,0.2l-1.3,1.8l-2,1.1l-2.1,0.2l-1.1-2.1l-0.5-5.2l0.9-2l1.8-1.6l2.7-3.8l-0.2-8.2l-1.4-2.7l-3.6-3.4
	l-5.7-0.7l-1.8-1.3l-0.7-2.3l0.4-2.3l1.8-1.1v-2.7l1.3-1.4l0.4-0.7l1.3-1.3l1.3-2.7l2.3-0.7l0.9-2.3l3-3.6l2-0.9l2.5-0.2l1.6-1.1
	l0.9-2.3l3.8-2.1l0.9-2l2-0.9l2.5-3.9l1.4,1.6l2,3.6l4.6-0.4v2.7l-0.7,2v2.7l2.9,2.9l0.2,5.2l1.1,1.6l2.9,2.5l0.5,1.8l-1.4,1.6
	l-0.5,2.3l7.7,6.6l0.5,4.6l-2.3,4.8l-1.1,1.3l1.4,1.4l0.4,2l-1.3,1.6l0.9,2l4.8,3.6l3.9,1.8l2.3-0.7l1.6,0.7L704.3,127.2z"/>
        </svg>
        <div class="showArea">
                <div class="showAreaText">
                    <h1 id="showCityName">城市:選擇城市</h1>
                    <h2 id="showWeather">天氣:陰天或晴天</h2>
                    <h2> 溫度:
                        <span id="showMinTempatuare" >21度c</span>~
                        <span id="showMaxTempatuare" >25度c</span>
                    </h2>
                </div>
                <div  id="showIcon" class="showAreaImg">
                    <i class="fa-solid fa-sun"></i>
                </div>
        </div>
    </div>
</div>

</template>




<style lang="scss" scoped>
$maincolor:#018948;
$main:#E0ECDE;
.bg{
    width: 100vw;
    position: relative;
    .pageBlock{
        width: 100vw;
        height: 50vh;
        margin: 3vh 0;
        background-color: #E0ECDE;
        // background-color: rgb(170, 189, 143);
    }
    .one{
        display: flex;
        align-items: center;
        .oneLeft{
            width: 10vw;
            height: 10vh;
            border-radius: 3px;
            background-color: $maincolor;
        }
        .oneMid{
            width: 35vw;
            height: 50vh;
            padding: 5% 5%;
            font-weight: bold;
            position: relative;
            button{
                position: absolute;
                top: 60%;
                left: 40%;
                border: 1px solid black;
                background-color: $main;
                width: 150px;
                height: 30px;
                border-radius: 10px;
                &:hover{
                    background-color: black;
                    color: white;
                }
            }
        }
        .oneRight{
            img{
                width: 40vw;
                transition: 1s;
                &:hover{
                    transform: translate(-5px,-5px);
                    width: 45vw;
                }
            }
        }
    }
    .two{
        display: flex;
        align-items: center;
        font-weight: bold;
        .greenBlock{
            width: 70vw;
            height: 45vh;
            // background-color: rgb(0, 157, 97,9);
            background-color: $maincolor;
            display: flex;
            align-items: center;
            img{
                width: 45.5vw;
                margin-left: 24.5vw;
                opacity: 50%;
                transition: 1s;
                &:hover{
                    transform: translate(-10vw);
                }
            }
        }
        .twoText{
            display: block;
            margin: 10vh 5VW;
            position: relative;
            button{
                position: absolute;
                top: 100%;
                left: 10%;
                border: 1px solid black;
                background-color: $main;
                width: 150px;
                height: 30px;
                border-radius: 10px;
                &:hover{
                    background-color: black;
                    color: white;
                }
            }
        }
    }
    .three{
        display: flex;
        font-weight: bold;
        align-items: center;

        .threeText{
            margin: 5vh 5vw;
            margin-left: 15vw;
            position: relative;
            button{
                position: absolute;
                top: 100%;
                left: 10%;
                border: 1px solid black;
                background-color: $main;
                width: 150px;
                height: 30px;
                border-radius: 10px;
                &:hover{
                    background-color: black;
                    color: white;
                }
            }
        }
        img{
            width: 45vw;
            margin-left: 10vw;
            transition: 1s;
            &:hover{
                    transform: translate(-70px);
                }
        }
    }
    .four1{
        display: flex;
        align-items: center;
        font-weight: bold;
        position: relative;
        .four1Photo1{
            width: 20vw;
            height: 40vh;
            img{
                object-fit: cover;
                width: 70%;
                height: 100%;
                transition: 1s;
                &:hover{
                transform: translate(6vw,0);
                }
            }
        }
        .four1Photo2{
            width: 40vw;
            height: 40vh;
            img{
                object-fit: cover;
                width: 70%;
                height: 100%;
                transition: 1s;
                &:hover{
                transform: translate(-6vw,0);
                }
            }
        }
        button{
                position: absolute;
                top: 60%;
                right: 30%;
                border: 1px solid black;
                background-color: $main;
                width: 150px;
                height: 30px;
                border-radius: 10px;
                &:hover{
                    background-color: black;
                    color: white;
                }
            }
    }
}
.bg2{
    widows: 100vw;
    height: 85vh;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    background-color: $main;
    font-weight: bold;
    .b1{
        margin: 5vh 4vw;
        .videoArea{

            video{
            width: 40vw;
            }
        }
        p{
            margin: 2% 2%;
            width: 35vw;
        }
    }
    .b2{
        margin: 5vh 4vw;
        .videoArea{

            video{
            width: 40vw;
            }
        }
        p{
            margin: 2% 2%;
            width: 35vw;
        }
    }
    .b3{
        margin: 5vh 4vw;
        .videoArea{

            video{
            width: 40vw;
            }
        }
        p{
            margin: 2% 2%;
            width: 35vw;
        }
    }
    .b4{
        margin: 5vh 4vw;
        .videoArea{

            video{
            width: 40vw;
            }
        }
        p{
            margin: 2% 2%;
            width: 35vw;

        }
    }
}

// <!-- 顯示預覽圖片區 -->
.onePhotoBlack{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: rgb(0, 0, 0,0.6);
    .onePhotoArea{
        margin: 10vh 5vw;
        img{
            width: 90vw;
        }
    }
}
.twoPhotoBlack{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: rgb(0, 0, 0,0.6);
    .twoPhotoArea{
        margin: 10vh 5vw;
        img{
            width: 90vw;
        }
    }
}
.threePhotoBlack{
    position: absolute;
    height: 180vh;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: rgb(0, 0, 0,0.6);
    .threePhotoArea{
        margin: 10vh 5vw;
        img{
            width: 90vw;
        }
    }
}
.fourPhotoBlack{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: rgb(0, 0, 0,0.6);
    .fourPhotoArea{
        margin: 10vh 5vw;
        img{
            width: 90vw;
        }
    }
}
// <!-- 顯示整個html區域 -->
.bgOneShowAll{
.page{
    width: 90%;
    margin: 0 5%;
    display: flex;
}
.greenheader{
    height: 1vh;
    background-color: green;
}
.grayheader{
    height: 15vh;
    width: 100vw;
    background-color: #F7F7F7;
    .grayheaderContent{
        padding: 25px 60px 0px;
        height: inherit;
        .logoPicture{
            width: 68px;
            height: 68px;
        }
        .dropdownMenu{
            position: relative;
            border: 0;
            margin-top: 30px;
            margin-left: 20px;
            &:hover{
                .dropcontent{
                    display: block;
                }
                .dropbtn{
                    background-color: black;
                    color: white;
                }
            }
            .dropbtn{
                border: 0;
                background-color: #F7F7F7;
                color: black;
                font-size: 14pt;
                transition: 0.5s;
            }
            .dropcontent{
                border: 0;
                display: none;
                background-color: #F7F7F7;
                position: absolute;
                min-width: 300px;
                padding: 20px 20px;
                a{
                    text-decoration: none;
                    color: black;
                    display: block;
                    background-color: #F7F7F7;
                    padding: 5% 5%;
                    &:hover{
                        background-color: black;
                        color: white;
                    }
                }
            }
        }
        .livestorebtn{
            border: 0;
            background-color: #F7F7F7;
            color: black;
            font-size: 16pt;
            transition: 0.5s;
            margin-top: 30px;
            margin-left: 30px;
            &:hover{
                background-color: black;
                color: white;
            }
        }
        .annivesarybtn{
            border: 0;
            background-color: #F7F7F7;
            color: black;
            font-size: 16pt;
            transition: 0.5s;
            margin-top: 30px;
            padding-left: 40px;
            position: relative;
            &:hover{
                background-color: black;
                color: white;
            }
            &:after{
                position: absolute;
                content: '';
                width: 50px;
                height: 50px;
                background-image: url("../../photo/stuckbus/25週年星巴克.png");
                background-size: cover;
                top: -9px;
                left: -7px;
            }
        }
        .recuritbtn{
            border: 0;
            background-color: #F7F7F7;
            right:1;
            padding: 10px;
            position: relative;
            margin-left: 50px;
            &:hover{
                color: rgb(114, 109, 109);
            }
        }
        .mapbtn{
            border: 0;
            background-color: #F7F7F7;
            right: 0;
            padding: 10px;
            &:hover{
                color: rgb(114, 109, 109);
            }
        }
    }


}
.moonfestival{
    height: 90vh;
    margin-top: 20px;
    img{
        width: 90vw;
    }

}

.reward{
    height: 60vh;
    background-image: url("../../photo/stuckbus/reward.JPG");
    background-size: contain;
    background-repeat: no-repeat;
    .moreinformationbtn{
        position: relative;
        border: 1px solid green;
        border-radius: 1em;
        left: 348px;
        top: 272px;
        background-color: #F7F7F7;
        font-size: 16pt;
        color: green;
        font-weight: bold;
        &:hover{
            background-color: green;
            color: white;
        }
    }
    img{
        width: 90vw;
    }
    .signupbtn{
        border: 1px solid green;
        position: relative;
        left: 355px;
        top: 272px;
        background-color: #F7F7F7;
        font-size: 16pt;
        border-radius: 1em;
        color: green;
        font-weight: bold;
        &:hover{
            background-color: green;
            color: white;
        }
    }
    .activetybtn{
        border: 1px solid green;
        position: relative;
        left: 475px;
        top: 245px;
        background-color: #F7F7F7;
        font-size: 16pt;
        border-radius: 1em;
        color: green;
        font-weight: bold;
        &:hover{
            background-color: green;
            color: white;
        }
    }
    .goldbtn{
        border: 1px solid green;
        position: relative;
        left: 545px;
        top: 215px;
        background-color: #F7F7F7;
        font-size: 16pt;
        border-radius: 1em;
        color: green;
        font-weight: bold;
        &:hover{
            background-color: green;
            color: white;
        }
    }
    .actionbtn{
        border: 1px solid green;
        position: relative;
        left: 610px;
        top: 242px;
        background-color: #F7F7F7;
        font-size: 16pt;
        border-radius: 1em;
        color: green;
        font-weight: bold;
        &:hover{
            background-color: green;
            color: white;
        }
    }
    .recylebtn{
        border: 1px solid green;
        position: relative;
        left: 678px;
        top: 210px;
        background-color: #F7F7F7;
        font-size: 16pt;
        border-radius: 1em;
        color: green;
        font-weight: bold;
        &:hover{
            background-color: green;
            color: white;
        }
    }
}
.fourbox{
    height: 190vh;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    .four{
        width: 44vw;
        margin-top: 10px;
    }
}
.socialmedia{
    height: 10vh;
    margin-top: 10vh;
    background-color: #F7F7F7;
    .socialmediacontent{
        height: inherit;
        background-color: #F7F7F7;
    }
    .fa-brands{
        margin-top: 15px;
        margin-right: 10px;
        color: rgb(88, 86, 86);
        &:hover{
            color: rgb(122, 120, 120);
        }
    }
}
.footer{
    background-color: #F7F7F7;
    .footercontent{
        display: flex;
        margin-top: 10px;
        height: 50vh;
    }
    h3{
        margin-top: 40px;
        margin-right: 150px;
    }
    p{
        font-size: 14pt;
        margin-top: 15px;
    }
    a{
        text-decoration: none;
    }
}
}
.bgTwoShowAll{
.boder{
    margin: 0 5%;
}
.header{
    position: absolute;
    margin-top: 15px;
    top: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 70%;
    height: 8vh;
    background-color: rgb(8, 8, 8,0.6);
    border-radius: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 4;
    .headlogo{
        margin-right: 10px;
        width: 80px;
        height: 80px;
        border-radius: 99em;
        background-image: url("../../photo/bear/headlogo.png");
        background-size: cover;
        
    }
    .headLeft{
        width: 33vw;
    }
    .headRight{
        width: 30vw;
    }
    button{
        border: 0;
        color: white;
        background-color: transparent;
        margin: 0 2%;
        font-size: 16pt;
        transition: 0.5s;
        &:hover{
            color: gold;
        }
    }
    i{
        margin: 0 2%;
        font-size: 16pt;
        color: white;
        &:hover{
            color: gold;
        }
    }
}
.videoArea{
    margin-top: 10vh;
}
.video-back{
    min-width: 100%;
}
.introduce{
    width: 100vw;
    height: 70vh;
    background-color: rgb(177, 171, 142);
    display: flex;
    justify-content:space-between;
    align-items: center;

    .textArea{
        width: 30vw;
        position: relative;
        .threeBearLogon{
            width: 100px;
            position: absolute;
            top: 2%;
        }
        h1{
            display: flex;
            justify-content: center;
            font-weight: bold;
            margin: 2% 2%;
            padding-left: 20%;
        }
        p{
            display: flex;
            justify-content: center;
            font-weight: bold;
            margin-top: 50px;
        }
    }
    .moreButtonPlace{
        display: flex;
        justify-content: center;
        margin-top: 50px;
        .moreButton{
            border: 0;
            background-color:rgb(8, 8, 8,0.6) ;
            color: white;
            font-weight: bold;
            padding: 2% 7%;
            font-size: 13pt;
            &:hover{
                box-shadow:  0 0 20px rgba(109, 109, 109, 0.6), 0 0 20px rgba(173, 173, 173, 0.6);
            }
            a{
                text-decoration: none;
                color: white;
            }
        }

    }
    .threeBearPlace{
        width: 300px;
        height: 200px;
        margin-left: 30px;
        margin-top: 300px;
        .threeBear{
            width: 300px;
        }
    }
    .threeBearIntroduce{
        width: 500px;
        position: relative;
        .pictureIntroduce{
            width: 300px;
            margin-top: 180px;
            margin-left: 135px;
        }
        .pictureIntroduce0{
            width: 420px;
            position: absolute;
            left: 80px;
            display: none;
        }
        &:hover{
            .pictureIntroduce0{
                display: block;
            }
            .pictureIntroduce{
                opacity: 0; 
            }
        }
    }
}
}
.bgThreeShowAll{
    .outArea{
        width: 100vw;
        height: 90vh;
        background-color: rgb(206, 202, 181);
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: baseline;
        background-image: url("../../photo/bear/login\ 背景.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
}
.area{
        width: 30vw;
        height: 60%;
        margin-top: 10vh;
        border: 2px solid black;
        border-radius: 10px;
        backdrop-filter: blur(4px);
        h1{
                text-align: center;
                margin: 5% 0;
        }
        .inputBox{
                width: 100%;
                height: 40px;
                position: relative;
                display: flex;
                justify-content: center;
                margin: 5% 0;
                padding: 0 20%;  
                input{
                        width:100% ; 
                        font-size: 14pt;
                        border-radius: 30px;   
                        background-color: transparent; 
                        padding: 0 10%;
                }
                i{
                        position: absolute;
                        font-size: 16pt;
                        top: 50%;
                        right: 22%;
                        transform:translateY(-50%)
                }
        }
        .rember-foget{
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                padding: 0 20%;
                a{
                        text-decoration: none;
                        color: black;
                        font-weight: bold;
                }
        }
        button{
                width: 50%;
                border-radius: 30px;
                margin: 0 25%;
                font-size: 14pt;
                background-color: white;
                box-shadow: 2px 2px 0px  black;
                transition: 0.5s;
                &:hover{
                        color: white;
                        background-color: rgb(92, 92, 92);
                }
        }
        .register{
                width: 100%;
                height: auto;
                text-align: center;
                margin: 3% 0;
                a{
                        text-decoration: none;
                        color: black;
                        font-weight: bold;
                }
        }  
}
}
.bgFourShowAll{
.page111{
    margin: 5% 5%;
}
.header
{   
    display: flex;
    justify-content: space-between;
    align-items: center;

    .block{
        width: 150px;
        height: 150px;
        background-color: pink;
    }
    .photo1{
        width: 80px;
        height: 80px;
        background-image: url("../../photo/cake/Group 10.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

}
.content{
    display: flex;
    .contentText{
        width: 50%;
        padding: 5% 5%;
        h1{
            margin-left: 50px;
        }
    }
    img{
        width: 50%;
    }
}
.onsale{
    h1{
        text-align: center;
    }
    .threeBlock{
    width: 100%;
    margin-top: 70px;
    margin-bottom: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
        .photo3{
            width: 30%;
            height: 65vh;
            background-image: url("../../photo/cake/3.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            position: relative;

            button{
                border: 0;
                width: 150px;
                font-size: 16pt;
                background-color: pink;
                position: absolute;
                bottom: 5%;
                left: 30%;
                color: white;
            }
        }
        .photo4{
            width: 30%;
            height: 65vh;
            background-image: url("../../photo/cake/4.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            position: relative;

            button{
                border: 0;
                width: 150px;
                font-size: 18pt;
                background-color: pink;
                position: absolute;
                bottom: 5%;
                left: 30%;
                color: white;
            }
        }
        .photo5{
            width: 30%;
            height: 65vh;
            background-image: url("../../photo/cake/5.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            position: relative;

            button{
                border: 0;
                width: 150px;
                font-size: 16pt;
                background-color: pink;
                position: absolute;
                bottom: 5%;
                left: 30%;
                color: white;
            }
        }
    }
}

.news{
    text-align: center;
    .bootstrapArea{
        display: flex;
        justify-content: space-between;
        margin-top: 70px;
        margin-bottom: 70px;

    }
    button{
        color: white;
        background-color: pink;
        width: 150px;
        font-size: 16pt;
        border: 0;
    }
}

.content2{
    display: flex;
    justify-content: space-between;
    margin-top: 20vh;
    margin-bottom: 20vh;
    position: relative;

    &:after{
    content: "";
    position: absolute;
    width: 650px;
    height: 650px;
    background-color: pink;
    bottom:-15%;
    left: -6%;
    z-index: -1;
}
    img{ 
        width: 60%;
    }
    .c2Text{
        padding: 5% 5%;
        width: 30%;
        background-color: pink;
    }
}

.footer{
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: pink;
}
}
// <!-- 顯示整個java區域 -->
.bg2Show{
    .backgroundColor{
    width: 100vw;
    height: 100vh;
    background-color: rgb(85, 184, 237);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
        background-color:white ;
        width: 60vw;
        height: 10vh;
        border-radius: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .game{
        background-color: white;
        width: 60vw;
        height: 70vh;
        border-radius: 1em;
        margin-top: 5vh;

        .gameinput{
            display: flex;
            justify-content: center;
            margin-top: 5vh;
            span{
                font-weight: bold;
                font-size: 16pt;
            }
            button{
                border: 0;
                border-radius: 5px;
                padding: 0 4%;
                margin: 0 2%;
                background-color: plum;
            }
            input{
                font-size: 12pt;
            }
        }

        h3{
            display: flex;
            justify-content: center;
            margin-top: 3vh;
        }
    }

}
}
.bg2Show2{
    .outGame{
    background-color: rgb(105, 97, 105);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.game{
    width: 30%;
    height: 60%;
    background-color: white;
    border-radius: 1em;
    text-align: center;
    input{
        width: 200px;
    }
    button{
        margin-top: 30px;
        border: 0;
        background-color: rgb(105, 97, 105);
        font-size: 30px;
        color: white;
        padding: 5px 40px;
        border-radius: 1em;
    }

}
}
.bg2Show3{
    .outweather{
    padding: 0;
    margin: 0;
    background-color: rgb(159, 180, 222);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: baseline;
}
.area{
    width: 40vw;
    height: 70vh;
    margin-top: 15vh;
    background-color: rgb(159, 180, 222);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .checkboxplace{
        width: 50%;
        height: 10vh;


        // button{
        //     width: 96%;
        //     height: 90%;
        //     border-radius: 20px;
        // }
        select{
            width: 96%;
            height: 90%;
            border-radius: 5px;
        }
    }
    .showweather{
        width: 35vw;
        height: 38vh;
        background-color: white;
        display: flex;
        border-radius: 20px;
        margin: 2% 2%;
        .left{
            width: 50%;
            margin-top: 30px;
        }
        .right{
            width: 50%;
            padding: 5% 5%;
            img{
                width: 10vw;
            }
            i{
                font-size: 100pt;
            }
        }
    }
}
}
.bg2Show4{
.outsvg{
    background-color:#222;
    display: flex;
}
svg{
    height: 100vh;  
}
path{
    stroke: white;
    fill: transparent;
    transition: 1s;
    cursor: pointer;
    &:hover{
        fill: gold;
        transform: translate(-5px,-5px);
        box-shadow: 5px 5px  black ;
    }
}
.showArea{
    margin: 30vh 0vw;
    width: 35vw;
    height: 30vh;
    padding: 1% 1%;
    background-color: rgb(114, 114, 114);
    display: flex;
    color: rgb(224, 212, 145);
    border-radius: 15px;
    .showAreaText{
        width: 70%;
    }
    .showAreaImg{
        display: flex;
        justify-content: center;
        align-items: center;
        i{
            font-size: 55pt;
        }
    }

}
i{
    font-size: 100pt;
}

}
</style>
