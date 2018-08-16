<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>新增使用者</h3>
          </div>

          <form class="form-horizontal">
            <div class="modal-body">
              <ul v-if="errors.length" class="form-group">
                <li v-for="error in errors" :key="'UsrAddForm' + error">
                  <small class="form-text text-danger">
                    {{error}}
                  </small>
                </li>
              </ul>
              <div class="form-group">
                <label class="control-label col-md-3">使用者代號</label>
                <div class="col-md-9">
                  <input type="text" v-model="usrId" class="form-control" placeholder="請輸入使用者代號">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-3">使用者員編</label>
                <div class="col-md-9">
                  <input type="text" v-model="usrWorkId" class="form-control" placeholder="請輸入使用者員編">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-3">使用者名稱</label>
                <div class="col-md-9">
                  <input type="text" v-model="usrNm" class="form-control" placeholder="請輸入使用者名稱">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-3">密碼</label>
                <div class="col-md-9">
                  <input type="password" v-model="pwd" class="form-control" placeholder="請輸入密碼">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-3">歸屬倉庫</label>
                <div class="col-md-9">
                  <multiselect v-model="wh" :options="whs" :multiple="false" :allow-empty="false" :close-on-select="true" :searchable="false" track-by="wh_code" label="wh_name" placeholder="請選擇歸屬倉庫">
                  </multiselect>
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-3">群組</label>
                <div class="col-md-9">
                  <multiselect v-model="group" :options="groups" :multiple="false" :allow-empty="false" :close-on-select="true" :searchable="false" track-by="GROUP_ID" label="GROUP_NAME" placeholder="請選擇群組">
                  </multiselect>
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-3">狀態</label>
                <div class="col-md-9">
                  <label class="radio-inline"><input type="radio" name="status" value="true" v-model="status">正常</label>
                  <label class="radio-inline"><input type="radio" name="status" value="false" v-model="status">停用</label>
                </div>
              </div>
            </div>
          </form>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveForm">儲存</button>
            <button type="button" class="btn btn-default" @click="cancel">取消</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "UsrAddForm",
  props: ["groups", "whs"],
  data: function() {
    return {
      usrId: "",
      usrWorkId: "",
      usrNm: "",
      pwd: "",
      wh: {},
      group: {},
      status: true,
      errors: []
    };
  },
  methods: {
    cancel: function() {
      this.clearForm();
      this.$emit("addFormClose"); //呼叫父方法
    },
    saveForm: function() {
      this.validForm();
      if (!this.errors.length) {
        this.postForm();
      }
    },
    validForm: function() {
      this.errors = [];

      if (!this.usrId && !this.usrWorkId) {
        this.errors.push("使用者代號 / 使用者員編 需填寫");
      }
      if (this.usrId && !this.validId(this.usrId)) {
        this.errors.push("使用者代號 必須是英文和數字");
      }
      if (this.usrWorkId && !this.validId(this.usrWorkId)) {
        this.errors.push("使用者員編 必須是英文和數字");
      }
      if (!this.usrNm) {
        this.errors.push("使用者名稱 需填寫");
      }
      if (!this.pwd) {
        this.errors.push("密碼 需填寫");
      }
    },
    postForm: function() {
      //wh & group要取ID
      this.axios
        .post(
          "/addUsr",
          {},
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(function(response) {})
        .catch(function(error) {});
    },
    clearForm: function() {
      Object.assign(this.$data, this.$options.data());
    },
    validId: function(id) {
      var format = /^[\d|a-zA-Z]+$/;
      return format.test(id);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/FormDialog.css";
</style>