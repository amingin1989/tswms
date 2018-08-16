<template>
  <div id="m0001">
    <h1>人員管理</h1>
    <hr>
    <!-- <div class="row">
        <div class="col-md-3">
            使用者代號/員編：
        </div>
        <div class="col-md-4">
            群組代號：
        </div>
        <div class="col-md-5">
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <input type="text" v-model="usrId" class="form-control" placeholder="請輸入使用者代號/員編">
        </div>
        <div class="col-md-4">
            <multiselect v-model="group" :options="groups" :multiple="false" :allow-empty="false" :close-on-select="true" :searchable="false" track-by="GROUP_ID" label="GROUP_NAME" placeholder="請選擇群組">
            </multiselect>
        </div>
        <div class="col-md-5">
          <button type="button" class="btn btn-info" style="margin-left: 20px;" @click="search()">查詢</button>
        </div>
    </div> -->


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
      group: '',
      groups: [
        { GROUP_ID: "999", GROUP_NAME: "資訊管理人員", GROUP_TYPE: "9" },
        { GROUP_ID: "899", GROUP_NAME: "總公司管理人員", GROUP_TYPE: "8" },
        { GROUP_ID: "799", GROUP_NAME: "倉庫管理人員", GROUP_TYPE: "7" }
        ],
      showUsr: true,
      showLoading: false,
      showMsgDialog: false,
      msgTitle:'',
      msgContent: '',
      
      /*usrs: {
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
      {"USER_ID":"018", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"00002", "GROUP_NM":"00002 使用者", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"}]}*/

      usrs: {
        cols : [{
          label: '使用者代號',
          field: 'USER_ID',
          filterable: true,
          tdClass: 'text-center'
        },{
          label: '使用者員編',
          field: 'USER_WORK_ID',
          filterable: true,
          tdClass: 'text-center'
        },{
          label: '使用者姓名',
          field: 'USER_NM',
          filterable: true,
          tdClass: 'text-center'
        },{
          label: '密碼',
          field: 'PASSWORD',
          filterable: true,
          sortable: false,
          globalSearchDisabled: true
        },{
          label: '歸屬倉庫',
          field: 'WH_CODE',
          filterable: true,
          tdClass: 'text-center'
        },{
          label: '群組代號',
          field: 'GROUP_ID',
          filterable: true,
          tdClass: 'text-center'
        } ,{
          label: '登入狀態',
          field: 'LOGIN_STATUS',
          filterable: true,
          sortable: false,
          tdClass: 'text-center'
        } ,{
          label: '狀態',
          field: 'STATUS',
          filterable: true,
          sortable: false,
          globalSearchDisabled: true,
          tdClass: 'text-center'
        } 
        ],
        rows : [{"USER_ID":"M001", "USER_WORK_ID":"M001", "USER_NM":"AAA", "PASSWORD":"*****", "WH_CODE": "001", "WH_NM":"A倉", "GROUP_ID":"999", "GROUP_NM":"999 資訊管理人員", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"M002", "USER_WORK_ID":"M002", "USER_NM":"BBB", "PASSWORD":"*****", "WH_CODE": "002", "WH_NM":"Ｂ倉", "GROUP_ID":"999", "GROUP_NM":"999 資訊管理人員", "LOGIN_STATUS":true, "STATUS":"false", "STATUS_SHOW":"停用"},
      {"USER_ID":"003", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"899", "GROUP_NM":"899 總公司管理人員", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"004", "USER_WORK_ID":"", "USER_NM":"DDD", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"799", "GROUP_NM":"799 倉庫管理人員", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"005", "USER_WORK_ID":"", "USER_NM":"EEE", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"799", "GROUP_NM":"799 倉庫管理人員", "LOGIN_STATUS":false, "STATUS":"false", "STATUS_SHOW":"停用"},
      {"USER_ID":"006", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"799", "GROUP_NM":"799 倉庫管理人員", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"007", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"008", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"009", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"299", "GROUP_NM":"299 AAA", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"010", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"299", "GROUP_NM":"299 AAA", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"011", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"012", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"013", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"014", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"015", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"016", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":false, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"017", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"},
      {"USER_ID":"018", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"*****", "WH_CODE": "003", "WH_NM":"C倉", "GROUP_ID":"199", "GROUP_NM":"199 XXX", "LOGIN_STATUS":true, "STATUS":"true", "STATUS_SHOW":"正常"}]
      }
    };
	},
  methods: {
    search: function() {
          this.showLoading = true;
          setTimeout(() => { //loading訊息顯示5秒
            this.showLoading = false;
          }, 2000);
          this.showUsr = true;

          var data = Qs.stringify({
            userId:this.usrId,
            groupId:this.group.GROUP_ID
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
    //從store裡面抓
    //this.groups = this.$store.state.user.groups;
    /*this.showLoading = true;
    var _this = this;
    var data = {
      role: _this.$store.state.user.role
    };
    this.axios.post('/getGroups', data)
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
    });*/
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
</style>