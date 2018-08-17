<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>新增倉庫</h3>
                    </div>

                    <form class="form-horizontal">
                        <div class="modal-body">
                            <ul v-if="errors.length" class="form-group">
                                <li v-for="error in errors" :key="'WhAddForm' + error">
                                    <small class="form-text text-danger">
                                        {{ error }}
                                    </small>
                                </li>
                            </ul>
                            <div class="form-group">
                                <label class="control-label col-md-4">倉庫代號</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="whNo" class="form-control" placeholder="請輸入倉庫代號">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">倉庫名稱</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="whNm" class="form-control" placeholder="請輸入倉庫名稱">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">倉庫地址</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="whAddress" class="form-control" placeholder="請輸入倉庫地址">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">區域</label>
                                <div class="col-md-8">
                                    <input type="text" v-model="area" class="form-control" placeholder="請輸入區域">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">倉庫類型</label>
                                <div class="col-md-8">
                                    <multiselect v-model="whType" :options="whTypes" :multiple="false" :allow-empty="false" :close-on-select="true" :searchable="false" track-by="TYPE_ID" label="TYPE_NAME" placeholder="請選擇倉庫類型">
                                    </multiselect>
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
  name: "WhAddForm",
  props: ["whTypes"],
  data: function() {
    return {
      whNo: "",
      whType: "",
      whNm: "",
      whAddress: "",
      area: "",
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

      if (!this.whNo) {
        this.errors.push("倉庫代號 需填寫");
      }
      if (!this.whNm) {
        this.errors.push("倉庫名稱 需填寫");
      }
      if (!this.whAddress) {
        this.errors.push("倉庫地址 需填寫");
      }
      if (!this.area) {
        this.errors.push("區域 需填寫");
      }
      if (!this.whType) {
        this.errors.push("倉庫類型 需選擇");
      }
    },
    post: function() {
        console.log(this.$data);
      this.axios
        .post(
          "/addWh",
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
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/FormDialog.css";
</style>