<template>
<div class="addBook">
    <div class="formBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="BookName" prop="bookname">
             <el-input v-model="ruleForm.bookname"></el-input>
           </el-form-item>
           <el-form-item label="Author" prop="author">
             <el-input v-model="ruleForm.author"></el-input>
           </el-form-item>
          <el-form-item label="BookID" prop="bookid">
            <el-input v-model="ruleForm.bookid" placeholder="The book ID should be xx-xx"></el-input>
          </el-form-item>
             <input type="file" accept="image/*" ref="file">
           <el-form-item>
             <el-button @click="submitForm('ruleForm')">Add</el-button>

           </el-form-item>
         </el-form>
    </div>

</div>
  
</template>

<script>
import { Message } from 'element-ui';
// import qs from 'qs'
export default {
    data() {
      return {
        ruleForm: {
          bookname: '',
          author:'',
          bookid:'',
          booknumber:''
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sendBookData();           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // Submit book data
      sendBookData(){
        let formData1=new FormData();
        formData1.append('data',JSON.stringify(this.ruleForm));
        formData1.append('picname',this.$refs.file.files[0]);
        this.$axios.post('/admin/addbooks',formData1,{headers:{'Content-Type':'multipart/form-data'}})
        .catch(err=>console.log(err))
      }

    }
}
</script>

<style scoped>
.formBox{
    margin-top: 80px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
}

</style>