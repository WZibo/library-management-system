<template>
<div class="mainBox">
   <keep-alive>
       <router-view></router-view>
   </keep-alive>
</div>
</template>


<style scoped>
.mainBox{
    height: calc(100vh - 80px);
}
</style>