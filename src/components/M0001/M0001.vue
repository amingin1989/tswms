<template>
  <div>
    <h1 id="M0001_Title">人員管理</h1>
    <hr>
    <form class="form-inline">
      <div class="form-group">
        <label for="usrId">使用者代號/員編：</label>
        <input type="text" id="M00001UsrId" v-model="usrId" value="" class="form-control" placeholder="請輸入使用者代號/員編">
      </div>

      <div class="form-group">
        <label for="groupId" style="margin-left: 20px;">群組代號：</label>
        <select class="form-control" id="M00001GroupId" v-model="groupId">
          <template v-for="group in groups">
            <option :value="group.id" :key="'M00001' + group.id">{{ group.id }} {{ group.name }}</option>
          </template>
        </select>
      </div>
      <button type="button" class="btn btn-info" style="margin-left: 20px;" @click="search()">查詢</button>
    </form>

    <usrEditable v-if="showUsr" :usrs="usrs" :groups="groups"></usrEditable>
    <loading v-if="showLoading"></loading>
    <msgDialog v-if="showMsgDialog" @msgDialogClose="msgDialogClose" :title="msgTitle" :msg="msgContent"></msgDialog>
  </div>
</template>

<script>
import loading from '../materials/Loading.vue'
import msgDialog from '../materials/MsgDialog.vue'
import usrEditable from './UsrEditable.vue'
import Qs from "qs";

export default {
  name: "M0001",
  data() {
    return {
      usrId: '',
      groupId: '',
      groups: [{"id":"00001","name":"管理員"},{"id":"00002","name":"使用者"}],
      showUsr: false,
      showLoading: false,
      showMsgDialog: false,
      msgTitle:'',
      msgContent: '',
      
      usrs: {
        cols : ["使用者代號", "使用者員編", "使用者姓名", "密碼", "歸屬倉庫", "群組代號", "登入狀態", "狀態"],
        rows : [{"USER_ID":"M001", "USER_WORK_ID":"M001", "USER_NM":"AAA", "PASSWORD":"", "WH_CODE": "001", "WH_NM":"A倉", "GROUP_ID":"00001", "GROUP_NM":"00001 管理員", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"M002", "USER_WORK_ID":"M002", "USER_NM":"BBB", "PASSWORD":"", "WH_CODE": "002", "WH_NM":"Ｂ倉", "GROUP_ID":"00001", "GROUP_NM":"00001 管理員", "LOGIN_STATUS":true, "STATUS":"false", "STATUS_SHOW":"停用"},
      {"USER_ID":"003", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"004", "USER_WORK_ID":"", "USER_NM":"DDD", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"005", "USER_WORK_ID":"", "USER_NM":"EEE", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"false", "STATUS_SHOW":"停用"},
      {"USER_ID":"006", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"007", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"008", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"009", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"010", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"011", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"012", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"013", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"014", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"015", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"016", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"017", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"018", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"}]}
    };
	},
  methods: {
    search: function() {
          this.showLoading = true;
          /*setTimeout(() => { //loading訊息顯示5秒
            this.showLoading = false;
          }, 2000);
          this.showUsr = true;*/

          var data = Qs.stringify({
            userId:this.usrId,
              groupId:this.groupId
          });
          var _this = this;
          this.axios.post('/findUsr', 
            data,
            { headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }}).then(function(res) {
              _this.showLoading = false;
              var resData = res.data;

              if(resData.usrs){
                _this.showUsr = true; 
                _this.usrs = resData.usrs;
              }else{
                _this.showUsr = false;
                _this.msgTitle = '訊息';
                _this.msgContent = '查無資料';
                _this.showMsgDialog = true;
              }

            }).catch(function(error) {
              _this.showLoading = false;
              _this.msgTitle = '錯誤訊息';
              _this.msgContent = '系統異常，請聯絡系統管理員';
              _this.showMsgDialog = true;
            });
    },
    msgDialogClose: function(){
      this.showMsgDialog = false;
      this.msgTitle = '';
      this.msgContent = '';
    },
    rmUsr: function(){

    }
  },
  mounted: function(){
    this.showLoading = true;
    var _this = this;
    this.axios.get('/getGroups')
    .then(function (res) {
        _this.showLoading = false;
        var resData = res.data;
        if(resData.groups){
          _this.groups = resData.groups;
        }
    })
      .catch(function (error) {
      _this.showLoading = false;
      _this.msgTitle = '錯誤訊息';
      _this.msgContent = '系統異常，請聯絡系統管理員';
      _this.showMsgDialog = true;
    });
  },
  components: {
    loading,
    usrEditable,
    msgDialog
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