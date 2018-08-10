<template>
  <div id="login">
    <div class="login-form container">
      <form v-on:submit.prevent="login">
        <h2 class="text-center">衛星倉分貨系統</h2>
        <div class="form-group">
          <input type="text" v-model="userid" class="form-control" placeholder="請輸入帳號" required>
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" placeholder="請輸入密碼" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">登入</button>
        </div>
      </form>
      <p class="text-center">&copy; 2018 Copyright: momo富邦媒體科技股份有限公司</p>
    </div>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "Login",
  data() {
    return {
      userid: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      var data = Qs.stringify({
        userid: this.userid,
        password: this.password
      });

      var store = this.$store;
      var router = this.$router;
      this.axios({
        method: "POST",
        url: "/login",
        data: data,
        config: {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      })
        .then(function(res) {
          var resData = res.data;
          var isLogin = resData.isLogin;
          if (isLogin) {
            store.commit({
              type: "setUserData",
              userData: resData
            });
            router.push("/");
          } else {
            alert("login fail!!!");
            router.push("/loginpage");
          }
        })
        .catch(function(err) {
          alert("login catch!!!");
          console.log("fail...");
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
