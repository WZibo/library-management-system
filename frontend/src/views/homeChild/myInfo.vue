<template>
  <div class="myinfo">
    <main-top-bar classify="Student information"></main-top-bar>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>{{ $store.state.studentinfo.studentname }}</h2>
      </div>
      <div class="info">
      <table cellspacing="40">
        <tr>
          <td>Major:</td>
          <td>{{ $store.state.studentinfo.class }}</td>
        </tr>

        <tr>
          <td>Student ID:</td>
          <td>{{ $store.state.studentinfo.account }}</td>
        </tr>
        <tr>
          <td>Borrow History:</td>
          <td>{{ $store.state.studentinfo.allLendNum }}</td>
        </tr>
        <tr>
          <td>Need Return:</td>
          <td>{{ $store.state.studentinfo.needreturn }}</td>
        </tr>
      </table>
    </div>
    </el-card>
  </div>
</template>

<script>
import mainTopBar from "../../components/common/mainTopBar.vue";
export default {
  name: "myinfo",
  components: { mainTopBar },
};
</script>
