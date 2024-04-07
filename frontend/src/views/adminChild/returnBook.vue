<template>
<div class="returnBook">
    <main-top-bar classify="Book Return"></main-top-bar>
    <div class="search">
        <el-input v-model="input" placeholder="Enter BookID"></el-input>
        <el-button @click="returnClick">Return</el-button>
    </div>
    <div class="title">
       Book Information
    </div>
    <div class="bookBox">
        <book-exhibit :booksInfo="bookData"  :showReturn="true"></book-exhibit>
    </div>      
</div>
</template>


<script>
import { Message } from 'element-ui';
import MainTopBar from '../../components/common/mainTopBar.vue';
import bookExhibit from '../../components/content/bookExhibit.vue';
export default {
    data(){
        return {
            input:'',
            bookData:[],
            returnRes:true,

        }
    },
    components:{
        bookExhibit,
        MainTopBar,
    },
    methods:{
        // return book function
        returnResult(){
            this.$axios.get('/books/bookreturn',{params:{bookid:this.input}})
            .then(res=>{
                if(res&&(res.data .msg=='Complete Return')){                  
                  const books=res.data.data;
                    res.data.msg=='Complete Return' ? books.returnRes=true : books.returnRes=false;
                    this.bookData.unshift(books)
                }
            })
        },
        // Click the return book button
        returnClick(){
            this.returnResult();
            this.input='';            
        },
    },
}
</script>

<style scoped>
.returnBook{
    width: 100%;
}
.search{
    width: 100%;
    display: flex;
}
.title{
    padding-left:10px;
    line-height: 40px;
    background-color: lightgreen;
}
</style>
