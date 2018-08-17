<template>
  <div id="m0001">
    <h1><font-awesome-icon icon="users-cog" /> 人員管理</h1>
    <hr>
    <usrEditable v-if="showUsr" :usrs="usrs" :groups="groups" :whs="whs"></usrEditable>
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
      whs: [
        { WH_CODE: "001", WH_NM: "A倉(001)" },
        { WH_CODE: "002", WH_NM: "B倉(002)" },
        { WH_CODE: "003", WH_NM: "C倉(003)" }
      ],
      showUsr: true,
      showLoading: false,
      showMsgDialog: false,
      msgTitle:'',
      msgContent: '',
      
      usrs: {
        cols : [{
          label: '使用者代號',
          field: 'USER_ID',
          filterable: true,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          width: '100px',
        },{
          label: '使用者員編',
          field: 'USER_WORK_ID',
          filterable: true,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          width: '100px'
        },{
          label: '使用者姓名',
          field: 'USER_NM',
          filterable: true,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          width: '150px'
        },{
          label: '密碼',
          field: 'PASSWORD',
          filterable: true,
          sortable: false,
          globalSearchDisabled: true,
          formatFn: this.pwdFormat,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          width: '100px'
        },{
          label: '歸屬倉庫',
          field: 'WH_CODE',
          filterable: true,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          formatFn: this.whCodeFormat
        },{
          label: '群組代號',
          field: 'GROUP_ID',
          filterable: true,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          formatFn: this.groupIdFormat
        } ,{
          label: '登入狀態',
          field: 'LOGIN_STATUS',
          filterable: true,
          sortable: false,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          formatFn: this.loginStatusFormat,
          width: '80px'
        } ,{
          label: '狀態',
          field: 'STATUS',
          filterable: true,
          sortable: false,
          globalSearchDisabled: true,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
          formatFn: this.statusFormat,
          width: '100px'
        } ,{
          label: '',
          field: 'SAVE',
          filterable: false,
          sortable: false,
          globalSearchDisabled: false,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align'
        } ,{
          label: '',
          field: 'DELETE',
          filterable: false,
          sortable: false,
          globalSearchDisabled: false,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align'
        }
        ],
        rows : [{"USER_ID":"M001", "USER_WORK_ID":"M001", "USER_NM":"AAA", "PASSWORD":"", "WH_CODE": "001", "GROUP_ID":"999", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"M002", "USER_WORK_ID":"M002", "USER_NM":"BBB", "PASSWORD":"", "WH_CODE": "002", "GROUP_ID":"999", "LOGIN_STATUS":true, "STATUS":false, "editMode":false},
      {"USER_ID":"003", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"899", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"004", "USER_WORK_ID":"", "USER_NM":"DDD", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"799", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"005", "USER_WORK_ID":"", "USER_NM":"EEE", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"799", "LOGIN_STATUS":false, "STATUS":false, "editMode":false},
      {"USER_ID":"006", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"799", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"007", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":false, "STATUS":true, "editMode":false},
      {"USER_ID":"008", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"009", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"299", "LOGIN_STATUS":false, "STATUS":true, "editMode":false},
      {"USER_ID":"010", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"299", "LOGIN_STATUS":false, "STATUS":true, "editMode":false},
      {"USER_ID":"011", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"012", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":false, "STATUS":true, "editMode":false},
      {"USER_ID":"013", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":false, "STATUS":true, "editMode":false},
      {"USER_ID":"014", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":false, "STATUS":true, "editMode":false},
      {"USER_ID":"015", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"016", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":false, "STATUS":true, "editMode":false},
      {"USER_ID":"017", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":true, "STATUS":true, "editMode":false},
      {"USER_ID":"018", "USER_WORK_ID":"", "USER_NM":"CCC", "PASSWORD":"", "WH_CODE": "003", "GROUP_ID":"199", "LOGIN_STATUS":true, "STATUS":true, "editMode":false}]
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

    },
    loginStatusFormat: function(value){
      return value ? '登入' : '未登入';
    },
    statusFormat: function(value){
      return value ? '啟用' : '停用';
    },
    pwdFormat: function(value){
      return '*****';
    },
    whCodeFormat: function(value){
      const whArray = this.whs.filter(function(wh) {
        return wh.WH_CODE == value;
      });
      return (whArray.length) ? whArray[0].WH_NM : '';
    },
    groupIdFormat: function(groupId){
      const groupArray = this.groups.filter(function(group) {
        return group.GROUP_ID == groupId;
      });
      return (groupArray.length) ? groupArray[0].GROUP_ID + ' ' + groupArray[0].GROUP_NAME : '';
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