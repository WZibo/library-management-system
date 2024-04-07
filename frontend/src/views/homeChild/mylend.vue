<template>
  <div class="mylend">
    <main-top-bar></main-top-bar>
      <div class="booksItem" v-for="(item, index) in lendBox" :key="index">
        <div class="bookPic"><img :src="item.picname" alt="" /></div>
        <div class="bookInfo">
          <div id="bookName">BookName：{{ item.bookname }}</div>
          <div id="author">Author:{{ item.author }}</div>
          <div id="bookNum">BookID：{{ item.bookid }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import mainTopBar from "../../components/common/mainTopBar.vue";
export default {
  components: { mainTopBar },
  name: "mylend",
  data() {
    return {
      lendBox: [],
    };
  },
  created() {
    this.getMyLend();
  },
  methods: {
    getMyLend() {
      this.$axios.get("/student/studentlend").then((res) => {
        this.lendBox = res.data.data;
      });
    },
  },
  
};
</script>

<style scoped>
.booksItem {
  display: flex;
  padding: 0 10px;
  height: 100px;
  background-color: lightblue;
}

.bookPic {
  margin: 0 20px;
}
.bookPic img {
  height: 80%;
}
#bookName {
  font-size: 18px;
  font-weight: 700;
}

</style>
