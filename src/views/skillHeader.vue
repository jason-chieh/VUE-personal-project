<script >
import { RouterLink,RouterView } from 'vue-router';

import {mapState,mapActions} from 'pinia'
import indexState from '../stores/indexState'
export default {
    data(){
        return{
            
        }
    },
    methods:{
        goback(){
            this.$router.push("/")
        },
        goskill(){
            let page = 0;
            this.$emit("htmlPageChange",page)
        },
        pagechange(){
            let page = 4;
            this.$emit("javaPageChange",page)
        },
        vuePagechange(){
            let page = 5;
            this.$emit("vuePageChange",page)
        },
        ...mapActions(indexState,["getLocation","setLocation"])
    },
    components:{
        RouterView,
        RouterLink
    },
    computed:{
        ...mapState(indexState,["location","locationInfo"])
    },
}
</script>

<template>
    <div class="header">
            <i @click="goback" class="fa-solid fa-house-user"></i>
            <h4 :class="{'indexKeep':this.location==0}"  @click="goskill">HTML、CSS作品</h4>
            <h4 :class="{'indexKeep':this.location==4}" @click="pagechange">JAVA SCRIPT的練習</h4>
            <h4 :class="{'indexKeep':this.location==5}" @click="vuePagechange">vue小型專案製作</h4>
    </div>
</template>

<style lang="scss" scoped>
.header{
    width: 100vw;
    height: 15vh;
    display: flex;
    flex-wrap: wrap;
    background:linear-gradient( 90deg,#2F4F4F , #018948);
    color: white;
    h4{
        font-weight: bold;
        height: 5vh;
        margin: 0 15px;
        margin-top: 5vh;
        // background-color: #727E66;
        &:hover{
            cursor:pointer;
            background-color: white;
            color:green;
        }
    }
    .indexKeep{
        background-color: white;
            color:green;
    }
    i{
        margin-top: 5vh;
        font-size: 25pt;
        &:hover{
            cursor:pointer;
        }
    }
    
}
</style>
