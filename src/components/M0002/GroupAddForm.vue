<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>新增群組</h3>
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
                                <label class="control-label col-md-4">群組代號</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="groupId" class="form-control" placeholder="請輸入群組代號">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">群組名稱</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="groupNm" class="form-control" placeholder="請輸入群組名稱">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">群組使用人員</label>
                                <div class="col-md-8">
                                    <multiselect v-model="groupType" :options="groups" :multiple="false" :allow-empty="false" :close-on-select="true" track-by="GROUP_TYPE" label="GROUP_NAME" placeholder="請選擇群組">
                                    </multiselect>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">狀態</label>
                                <div class="col-md-8">
                                    <label class="radio-inline"><input type="radio" name="status" value="true" v-model="status">正常</label>
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
  name: "GroupAddForm",
  props: ["groups"],
  data: function() {
    return {
      groupNm: "",
      groupId: "",
      groupType: "",
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

      if (!this.groupId) {
        this.errors.push("群組代號 需填寫");
      }
      if (this.groupId && !this.validId(this.groupId)) {
        this.errors.push("群組代號 必須是英文和數字");
      }
      if (!this.groupNm) {
        this.errors.push("群組名稱 需填寫");
      }
      if (!this.groupType) {
        this.errors.push("群組使用人員 需選擇");
      }
    },
    post: function() {
      this.axios
        .post(
          "/addGroup",
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