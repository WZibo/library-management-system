<template>
  <div class="bookSearch">
        <main-top-bar classify='Book search'></main-top-bar>
        <div class="searchBox">
                <input type='text' class="search" v-model="input" placeholder="Enter Book Name to Search">
                <el-button @click="bookSearch(input)" ref="searchBtn">Search</el-button>
        </div>
        <div class="bookBox">
             <div class="booksItem" v-for="(item,index) in searchResult" :key="item.id" :class='{bdline:index%2===1}'>
                <div class="bookPic"><img :src="item.picname" alt=""></div>
                 <div class="bookInfo">
                     <div id="bookName">BookName：{{item.bookname}}</div>
                     <div id="author">Author:{{item.author}}</div>
                     <div id="bookNum">BookID：{{item.booknumber}}</div>
                 </div>
            </div>           
        </div>
  </div>
</template>


<script>
import mainTopBar from '../../components/common/mainTopBar.vue';
import { Message } from 'element-ui';
export default {
    name:'bookSerarch',
    data(){
         return {
             input:'',
             searchResult:[],
        }
    },
    components:{
        mainTopBar,
    },
    methods:{
        // search book
        bookSearch(bookname){          
            this.$axios.get('/booksearch',{params:{bookname,}}).then(res=>{
                this.searchResult=res.data.data;
                console.log(res.data);

            });
        },
    },
    mounted(){
        this.bookSearch('')
    }

}
</script>

<style scoped>

.searchBox{
    display: flex;
    height: 50px; 
}
.search{
    padding-left: 20px;
    flex: 1;
}
.booksItem{
    display: flex;
    height: 100px;
}

.bookPic{
    margin: 0 20px;
}
.bookPic img{
    height: 80%;
}
#bookName{
    font-size: 18px;
    font-weight: 700;
}
#author,
#bookNum{
    color: rgb(92, 92, 86);
}
</style>