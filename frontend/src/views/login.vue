<template>
  <div class="login">
    <h2>Library Management System</h2>
    <div class="loginMethod">
      <span @click="studentLogin" :class="{loginMethodselect:loginMethods!='Student'}">Student account login</span>
      |
      <span @click="adminLogin" :class="{loginMethodselect:loginMethods!='Admin'}">Administrator login</span>
    </div>
    <main class="loginbox">
      <h4 class="title">{{loginMethods}} login</h4>
      <table>
        <tr>
          <td>ID:</td>
          <td>
            <input
              type="text"
              class="account"
              name="account"
              v-model="account"
            />
          </td>
        </tr>
        <tr>
          <td>Password:</td>
          <td>
            <input
              type="password"
              class="psw"
              name="password"
              v-model="password"
            />
          </td>
        </tr>
      </table>
      <div class="subbox">
        <input
          type="submit"
          class="submit"
          value="Login"
          ref="submit"
          @click="submit(account,password)"
        />
      </div>
    </main>
  </div>
</template>



<script>
export default {
  name: "login",
  data() {
    return {
      loginMethods: "Student",
      account: "",
      password: ""
    };
  },

  methods: {
    // Select student login
    studentLogin() {
      this.loginMethods = "Student";
    },
    // Select admin login
    adminLogin() {
      this.loginMethods = "Admin";
    },

    submit(account, password) {
      if (this.loginMethods === "Student") {
        this.$axios
          .post("/login/studentlogin", {
            account,
            password
          })
          .then(res => {
            if (res.data.msg == "Login Success") {
              window.localStorage.token = res.data.token;
              this.$router.replace("/home");
            }
          })
          .catch(err => console.log(err));
      }
      if (this.loginMethods === "Admin") {
        this.$axios
          .post("/login/adminlogin", {
            account,
            password
          })
          .then(res => {
              console.log(res);
            if (res.data.msg == "Login Success") {
              window.localStorage.token = res.data.token;
              this.$router.replace("/admin");
            }
          })
      }
    }
  }
};
</script>


<style scoped>
h2 {
  margin-top: 5vh;
  text-align: center;
}
.loginbox {
  min-width: 200px;
  max-width: 300px;
  margin: auto;
}
.title {
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}
.subbox {
  margin-top: 20px;
  text-align: center;
}
.submit {
  background-color: lightblue;
}
</style>