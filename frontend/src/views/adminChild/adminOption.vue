<template>
  <div class="adminOption">

    <div @click="$router.replace(address[0])" :class="{'is-active':$route.path==address[0]}">Borrow</div>

    <div @click="$router.replace(address[1])" :class="{'is-active':$route.path==address[1]}">Return</div>

    <div @click="$router.replace(address[2])" :class="{'is-active':$route.path==address[2]}">Add New Book</div>

    <div @click="$router.replace(address[3])" :class="{'is-active':$route.path==address[4]}">Manage Books</div>

    <div @click="$router.replace(address[4])" :class="{'is-active':$route.path==address[5]}">Add Student</div>

    <div @click="$router.replace(address[5])" :class="{'is-active':$route.path==address[6]}">Manage Students</div>
  </div>
</template>


<script>
export default {
    name:'adminOption',
    data(){
        return {
            className:[{
                option:'Borrow',
                url:'/mylend',
            },{
                option:'Return',
                url:'/booksearch',
            },
            {
                option:'Manage Books',
                url:'/myinfo',
            },
              {
                option:'Borrowing management',
                url:'/myinfo',
            },
             {
                option:'Manage Students',
                url:'/myinfo',
            },
            {
                option:'Student information inquiry',
                url:'/myinfo',
            },
            ],
            address:[
                '/admin/lendbook',
                '/admin/returnbook',
                '/admin/addbook',
                '/admin/bookmanage',
                '/admin/addstudent',
                '/admin/allstudent',]
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
.adminOption div {
  margin-top: 50px; 
  margin-left: 40px;
  font-weight: bold; 
  font-size: 18px;
}
</style>
