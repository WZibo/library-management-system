<template>
  <div class="findBook">
      <main-top-bar classify="Books List"></main-top-bar>
        <div class="searchBox">
             <input type='text' class="search" v-model="input" placeholder="Enter the book name to search">
             <el-button @click="bookSearch" ref="findBook1">Search</el-button>
        </div>
        <div class="books">
          <book-exhibit :booksInfo="booksInfo" :showDeleteBtn="true" :showState="true" @delete-success='removeBook'></book-exhibit>
        </div>
  </div>
</template>

<script>
import mainTopBar from '../../components/common/mainTopBar.vue';
import BookExhibit from '../../components/content/bookExhibit.vue';
import {Message} from 'element-ui';
export default {
  data(){
    return {
      input:'',
      booksInfo:[],
      searchResult:[],
      allBooks:[],
    }
  },
  components: { mainTopBar, BookExhibit },
  methods:{
    // Get all books
    getAllBooks(){
      this.$axios.get('/admin/allbooksinfo')
      .then(res=>{
        this.allBooks=res.data.data;
        this.booksInfo=this.allBooks;
      })
      .catch(err=>console.log(err))
    },
    // delete data
    removeBook(index){
      this.booksInfo.splice(index,1);
    },
    // search book
    bookSearch(){
         this.$axios.get('/booksearchNoMerge',{params:{bookname:this.input}}).then(res=>{
          this.searchResult=res.data.data;
          this.booksInfo=this.searchResult;
     });
    },
  },
  activated(){
    this.getAllBooks();
  }

}
</script>

<style scoped>
.searchBox{
  display: flex;
}
.search{
  flex: 1;
}
</style>