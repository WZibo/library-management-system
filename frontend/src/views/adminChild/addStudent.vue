<template>
<div class="addStudent">
    <div class="formBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="Name" prop="studentname">
             <el-input v-model="ruleForm.studentname"></el-input>
           </el-form-item> 
           <el-form-item label="Major" prop="class">
             <el-input v-model="ruleForm.class"></el-input>
           </el-form-item>
           <el-form-item label="Student ID" prop="account">
             <el-input v-model.number="ruleForm.account" ></el-input>
           </el-form-item>
           <el-form-item label="Password" prop="password">
             <el-input v-model="ruleForm.password"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button @click="submitForm('ruleForm')">Create</el-button>
           </el-form-item>
         </el-form>
    </div>
</div>
</template>

<script>
import { Message } from 'element-ui';
export default {
    data() {
      return {
        ruleForm: {
          studentname: '',
          class:'',
          account:'',
          password:''
        },
        
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/addstudent',{data:this.ruleForm})
            .then(res=>{
              this.resetForm('ruleForm');
            })
            .catch(err=>console.log(err))
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.formBox{
    margin-top: 80px;
    width: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

</style>