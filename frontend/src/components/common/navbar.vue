<template>
  <div class="navbar">
    <header class="nav">
        <div class="logo">
            <img src="~assets/logo/logo.png" alt="" class="logoimg">
            <span>    Library Management System</span>
            
        </div>
        <div>
            <span class="exit" @click="loginExit">Sign Out</span>
        </div>
    </header>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
    name:'navbar',
    data(){
        return {
            user:'',
        }
    },
    methods:{
        loginExit(){
            localStorage.token=null;
            this.$router.push('/login');
        }
    }

}
</script>

<style scoped>
.nav{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    line-height: 80px;
    background-color: lightgreen;
    padding: 0 10px;
}
.logo{
    display: flex;
    font-size: 23px;
    height: 100%;
    align-items: center;
}
</style>