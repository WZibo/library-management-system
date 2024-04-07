<template>
  <div class="homeOption">
    <div class="classify">
        <div v-for="item  in className" :key="item.url" @click="classifyChange(item.url)" :class="{selected:$route.path=='/home'+item.url}">
            <span class="option"> {{item.option}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'homeOption',
    data(){
        return {
            className:[{
                option:'My borrowing',
                url:'/mylend',
            },{
                option:'Book search',
                url:'/booksearch',
            },
            {
                option:'Student information',
                url:'/myinfo',
            },
            ]
        }
    },
    methods:{
        // Click to jump route
        classifyChange(url){
            this.$router.replace('/home'+url);
        }
    }
}
</script>

<style scoped>
.classify{
    line-height: 40px;
    padding-top:30px;
}
.classify>div{
    padding-left: 30px;
    margin-bottom:20px;
}

.selected{
    color: #46A3FF;  
}

</style>