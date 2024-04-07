<template>
  <div class="allStudent">
    <div class="tableBox">
      <el-table
        :data="tableData.filter(data => !search || data.studentname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%" max-height='880px'>
        <el-table-column label="Student ID" prop="account">
        </el-table-column>
        <el-table-column label="Name" prop="studentname">
        </el-table-column>
        <el-table-column label="Major" prop="class">
        </el-table-column>
        <el-table-column label="Total Borrowing" prop="lended">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" placeholder="Enter name to search" />
          </template>
          <template slot-scope="scope">
            <el-button @click="editStudentInfo(scope.$index, scope.row)">Edit</el-button>
            <el-button @click="open(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Edit student information" :visible.sync="editDialogVisible" @close="editformClosed">
        <!-- Form -->
        <el-form ref="editformRef" :model="editform">
          <el-form-item label="Student ID">
            <el-input v-model="editform.account"></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="editform.studentname"></el-input>
          </el-form-item>
          <el-form-item label="Major">
            <el-input v-model="editform.class"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="editUserInfo">Submit</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  data() {
    return {
      tableData: [],
      search: '',
      // Form data that requires changing user data
      editform: {
        id: '',
        studentname: '',
        class: '',
        account: ""
      },
      oldInfo:{},
      selectIndex:0,
      editDialogVisible: false,
    }
  },
  methods: {
    deepClone(data){
      if(typeof data!=='object') return data;
      let res;
      if(Array.isArray(data)){
        res=[];
        for(let i=0;i<data.length;i++){
          res.push(this.deepClone(data[i]))
        }
      }else{
        res={};
        for(let k in data){
          res[k]=this.deepClone(data[k])
        }
      }
      return res;
    },
    open(index, row) {
      
        this.deleteStudents(index, row);
      
    },
    getStudents() {
      this.$axios.get('/student/getallstudent')
        .then(res => {
          const students = res.data.data.map(item => {
            if (item.lendbook) {
              let booksid = item.lendbook.split(',');
              item.lended = booksid.length;
            } else {
              item.lended = 0
            }
            return item
          });
          this.tableData = students;
        })
        .catch(err => console.log(err))
    },
    deleteStudents(index, row) {
      this.$axios.get('/admin/deletestudent', { params: { userid: row.id } })
        .then(res => {
          this.tableData.splice(index, 1)
        })
        .catch(err => console.log(err))
    },
    editStudentInfo(index) {
      this.selectIndex=index;
      this.editDialogVisible = true;
      this.editform = this.tableData[index];
      this.oldInfo=this.deepClone(this.tableData[index]);
    },
    editUserInfo() {
      const data = {
        id: this.editform.id,
        studentname: this.editform.studentname,
        class: this.editform.class,
        account: this.editform.account
      };
      this.$axios
        .post('/student/changeStudentInfo', data)
        .then((res) => {
          if (!res.data) return;
          this.getStudents();
        })
        .catch((err) =>{
           this.tableData.splice(this.selectIndex,1,this.oldInfo);
        }) 
        .finally(() => {
          this.editDialogVisible = false;
        })
    }
  },
  activated() {
    this.getStudents();
  }
}
</script>
