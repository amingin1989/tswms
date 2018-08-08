<template>
  <div>
    <h1 id="M0001_Title">人員管理</h1>
    <hr>
    <p v-if="errors.length">
      <template v-for="error in errors">
        <div class="alert alert-danger">
          {{ error }}
        </div>
      </template>
    </p>

    <form class="form-inline">
      <div class="form-group">
        <label for="usrId">使用者代號/員編：</label>
        <input type="text" id="usrId" ref="userId" v-model="usrId" value="" class="form-control" placeholder="請輸入使用者代號/員編">
      </div>

      <div class="form-group">
        <label for="roleId">群組代號：</label>
        <select class="form-control" id="roleId" v-model="roleId">
          <template v-for="role in roles">
            <option v-bind:value="role.id">{{ role.id }} {{ role.name }}</option>
          </template>
        </select>
      </div>
      <button type="button" class="btn btn-info" @click="search()">查詢</button>
      <button type="button" class="btn btn-primary" @click="">新增</button>
    </form>

    <usrEditable :datasource="usrs" v-if="showUsr"></usrEditable>
    <loading v-if="showLoading"></loading>
    
  </div>
</template>

<script>
import loading from './Loading.vue'
import usrEditable from './UsrEditable.vue'

export default {
  name: "M0001",
  data() {
    return {
      //roles: {}
      usrId: '',
      roleId: '',
      roles: [{"id":"00001","name":"管理員"},{"id":"00002","name":"使用者"}],
      errors: [],
      showUsr: false,
      showLoading: false,
      
      usrs: {
        cols : ["使用者代號", "使用者員編", "使用者姓名", "密碼", "歸屬倉庫", "群組代號", "登入狀態", "狀態"],
        rows : [{"USER_ID":"", "USER_WORK_ID":"M001", "USER_NM":"AAA", "PASSWORD":"", "WH_CODE": "001", "WH_NM":"A倉", "GROUP_ID":"00001", "GROUP_NM":"00001 管理員", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"002", "USER_WORK_ID":"", "USER_NM":"BBB", "PASSWORD":"", "WH_CODE": "002", "WH_NM":"Ｂ倉", "GROUP_ID":"00001", "GROUP_NM":"00001 管理員", "LOGIN_STATUS":"", "STATUS":"false", "STATUS_SHOW":"停用"},
      {"USER_ID":"003", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"004", "USER_WORK_ID":"", "USER_NM":"DDD", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"005", "USER_WORK_ID":"", "USER_NM":"EEE", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"006", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"007", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"008", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"009", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"010", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"011", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"012", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"013", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"014", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"015", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"016", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"017", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"018", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":"", "STATUS":"true", "STATUS_SHOW":"正常"}]}
    };
	},
  methods: {
    search: function() {
      if(usrId.value && roleId.value){
          this.showLoading = true;
          setTimeout(() => { //loading訊息顯示5秒
            this.showLoading = false;
          }, 2000);
          this.showUsr = true;
          this.axios.post('/findUsr', 
            {
              userId:usrId.value,
              roleId:roleId.value
            },
            { headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }}).then(function(response) {
              
            }).catch(function(error) {

            });
      }else{
          this.errors = [];
          if (!usrId.value) {
              this.errors.push('需輸入使用者代號/員編');
          }
          if (!roleId.value) {
              this.errors.push('需要選擇群組代號');
          }
          setTimeout(() => { //錯誤訊息顯示5秒
            this.errors = [];
            this.$refs.userId.focus();
        }, 5000);
      }
    }
  },
  components: {
    loading,
    usrEditable
  }
};
</script>

<style scoped>
.fade-enter-active {
  animation: go 1s;
}

.fade-leave-active {
  animation: back 1s;
}

#M0001_Title {
  margin-top: 80px;
}

</style>