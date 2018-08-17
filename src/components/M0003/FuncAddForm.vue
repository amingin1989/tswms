<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>新增功能</h3>
                    </div>

                    <form class="form-horizontal">
                        <div class="modal-body">
                            <ul v-if="errors.length" class="form-group">
                                <li v-for="error in errors" :key="'GroupAddForm' + error">
                                    <small class="form-text text-danger">
                                        {{ error }}
                                    </small>
                                </li>
                            </ul>
                            <div class="form-group">
                                <label class="control-label col-md-4">功能代號</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="funcId" class="form-control" placeholder="請輸入功能代號">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">功能名稱</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="funcNm" class="form-control" placeholder="請輸入功能名稱">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">功能路徑</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="funcPath" class="form-control" placeholder="請輸入功能路徑">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">使用類型</label>
                                <div class="col-md-8">
                                    <multiselect v-model="funcType" :options="funcTypes" :multiple="false" :allow-empty="false" :close-on-select="true" :searchable="false" track-by="TYPE_ID" label="TYPE_NAME" placeholder="請選擇使用類型">
                                    </multiselect>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">狀態</label>
                                <div class="col-md-8">
                                    <label class="radio-inline"><input type="radio" name="status" value="true" v-model="status">啟用</label>
                                    <label class="radio-inline"><input type="radio" name="status" value="false" v-model="status">停用</label>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="cancel">取消</button>
                        <button type="button" class="btn btn-primary" @click="save">儲存</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: "FuncAddForm",
  props: ["funcTypes"],
  data: function() {
    return {
      funcId: "",
      funcType: "",
      funcNm: "",
      funcPath: "",
      status: true,
      errors: []
    };
  },
  methods: {
    cancel: function() {
      this.clear();
      this.$emit("addFormClose"); //呼叫父方法
    },
    save: function() {
      this.valid();
      if (!this.errors.length) {
        this.post();
      }
    },
    valid: function() {
      this.errors = [];

      if (!this.funcId) {
        this.errors.push("功能代號 需填寫");
      }
      if (this.funcId && !this.validId(this.funcId)) {
        this.errors.push("功能代號 必須是英文和數字");
      }
      if (!this.funcNm) {
        this.errors.push("功能名稱 需填寫");
      }
      if (!this.funcPath) {
        this.errors.push("功能路徑 需填寫");
      }
      if (!this.funcType) {
        this.errors.push("使用類型 需選擇");
      }
    },
    post: function() {
        console.log(this.$data);
      this.axios
        .post(
          "/addFunc",
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
    clear: function() {
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