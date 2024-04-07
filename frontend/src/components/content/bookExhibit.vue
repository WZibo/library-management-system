<template>
  <div class="bookExhibit">
          <div class="lendBox">
          <div class="booksItem" v-for="(item,index) in booksInfo" :key="index">
            <div class="bookPic"><img :src="item.picname" alt=""></div>
             <div class="bookInfo">
                 <div id="bookName">BookName：{{item.bookname}}</div>
                 <div id="author">Author:{{item.author}}</div>
                 <div id="bookNum">BookID：{{item.bookid}}</div>
             </div>
             <div class="bookReturnStatus" v-if="showReturn">
                <div :class="{overTime:!item.returnRes}">{{item.returnRes |status }}</div>
             </div>  
             <div class="state" v-if="showState">
                  <div :class="{overTime:item.status}">{{item.status |lendStatus }}</div>
             </div>
             <div class="delete" v-if="showDeleteBtn">
                 <el-button @click="open(item.id,index,item.status,item.picname)">Delete</el-button>
             </div>
                                
             <div class="other">
                 <slot></slot>
             </div>
      </div>
     </div>
  </div>
</template>


<script>
import { Message } from 'element-ui';
export default {
    name:'bookExhibit',
    props:{
        booksInfo:{
            type:Array,
            default(){
                return [];
            }

        },
        
        showReturn:{
            type:Boolean,
            default(){
                return false;
            } 
        },
        showDeleteBtn:{
            type:Boolean,
            default(){
                return false;
            }
        },
        showState:{
            type:Boolean,
            default(){
                return false;
            }
        }        


    },
    filters:{
        // return status handler function        
        status(a){
          return  a ? 'Complete Return':'';
        },
        lendStatus(a){
            return a==0 ? 'Available':'Unavailable'
        }
    },
    methods:{
    deleteBook(id, index, picname) {
        this.getDelete(id, index, picname);
    },
    getDelete(id, index, picname) {
        let fileName = picname.split('/');
        this.$axios.get('/admin/deletebook', {
                params: { bookid: id, pic: fileName[fileName.length - 1] }
            })
            .then(res => {
                this.$emit('delete-success', index);
            })
            .catch(err => console.log(err));
    },
    open(id, index, status, picname) {
        this.deleteBook(id, index, picname);
        }
    }
}
</script>


<style scoped>

.booksItem{
    display: flex;
    height: 100px;
}
.bookPic{
    display: flex;
    align-items: center;
    margin: 0 20px;
}
.bookPic img{
    height: 80%;
}
.bookInfo{
    flex: 1;
}

.overTime{
    color: red;
}
.delete{
    line-height: 100px;
}
.state{
    margin-right: 50px;
    line-height: 100px;
    color:green;
}


#bookName{
    font-size: 18px;
    font-weight: 700;
}
#author,
#bookNum{
    font-size: 16px;
    color: rgb(92, 92, 86);
}

</style>