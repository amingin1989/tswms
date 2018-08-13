<template>
  <div id="login" class="modal-dialog modal-login">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">衛星倉分貨系統</h4>
      </div>

      <div class="modal-body">
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <font-awesome-icon icon="user" />
              </span>
              <input type="text" class="form-control" v-model="userid" placeholder="請輸入帳號" required>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <font-awesome-icon icon="key" />
              </span>
              <input type="password" class="form-control" v-model="password" placeholder="請輸入密碼" required>
            </div>
          </div>

          <p v-if="errors.length">
            <template v-for="error in errors">
              <div class="alert alert-danger" :key="'Login' + error">
                {{ error }}
              </div>
            </template>
          </p>

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">登入</button>
          </div>
        </form>
      </div>

      <div class="modal-footer">&copy; 2018 Copyright: momo富邦媒體科技</div>
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
      password: "",
      errors: []
    };
  },
  methods: {
    login: function() {
      var data = Qs.stringify({
        userid: this.userid,
        password: this.password
      });

      var _this = this;
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
            _this.$store.commit({
              type: "setUserData",
              userData: resData
            });
            _this.$router.push("/");
          } else {
            _this.showErrMsg("登入失敗，請確認帳號密碼是否有誤");
          }
        })
        .catch(function(err) {
          _this.showErrMsg("系統異常，請聯絡系統管理員");
        });
    },
    showErrMsg: function(msg) {
      var _this = this;
      this.errors = [];
      this.errors.push(msg);
      setTimeout(() => {
        //錯誤訊息顯示5秒
        _this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style>
.modal-login {
  width: 350px;
}
.modal-login .modal-content {
  padding: 20px;
  border-radius: 5px;
  border: none;
}
.modal-login .modal-header {
  border-bottom: none;
  position: relative;
  justify-content: center;
}
.modal-login .close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.modal-login h4 {
  color: #636363;
  text-align: center;
  font-size: 26px;
  margin-top: 0;
}
.modal-login .modal-content {
  color: #999;
  border-radius: 1px;
  margin-bottom: 15px;
  background: #fff;
  border: 1px solid #f3f3f3;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 25px;
}
.modal-login .form-group {
  margin-bottom: 20px;
}
.modal-login label {
  font-weight: normal;
  font-size: 13px;
}
.modal-login .form-control {
  min-height: 38px;
  padding-left: 5px;
  box-shadow: none !important;
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.modal-login .form-control:focus {
  border-color: #ccc;
}
.modal-login .input-group-addon {
  max-width: 42px;
  text-align: center;
  background: none;
  border-width: 0 0 1px 0;
  padding-left: 5px;
  border-radius: 0;
}
.modal-login .btn {
  font-size: 16px;
  font-weight: bold;
  background: #19aa8d;
  border-radius: 3px;
  border: none;
  min-width: 140px;
  outline: none !important;
}
.modal-login .btn:hover,
.modal-login .btn:focus {
  background: #179b81;
}
.modal-login .modal-footer {
  color: #999;
  border-color: #dee4e7;
  text-align: center;
  margin: 0 -25px -25px;
  font-size: 13px;
  justify-content: center;
}
</style>
