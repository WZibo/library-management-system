<template>
<div class="lendBook">
    <main-top-bar classify="Book borrowing"></main-top-bar>
    <div class="search">
        <div class="studentEnter">
            <el-input v-model="account" placeholder="Enter Student ID" @blur="getStudentInfo" @focus="clearStudentInfo"></el-input>
        </div>
        <div class="booksEnter">
            <el-input v-model="bookid" placeholder="Enter BookID" ref="bookid"></el-input>
            <el-button @click="submitLend">Submit</el-button>
        </div>
    </div>
    <div class="studnetInfo">
        <div class="topbar"> Student Information</div>
        <div class="infoContent">
           <div id="name">Name：{{studentInfo.studentname}}</div>
           <div id="account">Student ID:{{studentInfo.account}}</div>
           <div id="class">Major：{{studentInfo.class}}</div>
           <div class="noReturn">Total borrowing amount：{{studentInfo.lendbook | lendBooks(studentInfo.account)}}</div>
        </div>
    </div>
    <div class="title">Book Information</div>
    <div class="lendBooks">
        <book-exhibit :booksInfo="booksInfo">
            <div class="sucess">Complete Borrowing</div>
        </book-exhibit>
    </div>
</div>
  
</template>

<script>
import mainTopBar from '../../components/common/mainTopBar.vue';
import bookExhibit from '../../components/content/bookExhibit.vue'
export default {
    name:'lendBook',
    components:{
        mainTopBar,
        bookExhibit
    },
    data(){
        return {
            account:'',
            bookid:'',
            studentInfo:{},
            booksInfo:[],
        }
    },
    methods:{
        getStudentInfo(){
            this.$axios.get('/admin/getstudentinfo',{params:{account:this.account}})
            .then(res=>{
                this.studentInfo=res.data.data;
                console.log(this.studentInfo)
            })
            .catch(err=>console.log(err))
        },
        submitLend(){
            if(this.studentInfo.account==undefined) return alert('No Student Information');
            let bookFormat=/^\S{1,8}-\d{1,5}/;
            if(!bookFormat.test(this.bookid)) return alert('Wrong Book ID');
            this.$axios.get('/admin/lendbooks',{params:{userid:this.studentInfo.id,bookid:this.bookid}})
            .then(res=>{
                this.booksInfo.unshift(res.data.data);
            })
            .catch(err=>console.log(err))
            this.bookid='';
            this.$refs.bookid.focus();

        },
        clearStudentInfo(){
            this.account='';
            this.studentInfo={};
            this.booksInfo=[]
        },
    },
    filters:{
        // Determine the borrowing quantity
        lendBooks(booksid,account){
            if(booksid==null&&account==null){
                return '';
            }else if(booksid===null&&account!==null){
                return 0;
            }else{
                let a=booksid.split(',');
                return a.length
            }
        }
    }
}
</script>

<style scoped>
.studnetInfo{
    margin-top: 20px;
}
.topbar{
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
}
.title{
     margin-top:10px;
     line-height: 30px;
     padding-left: 10px;
     font-size: 20px;
     background-color: lightgreen;
}
</style>