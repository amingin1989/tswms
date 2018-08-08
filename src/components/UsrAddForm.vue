<template>
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <div class="modal-header">
                <h2>新增使用者</h2>
            </div>

            <form class="form-horizontal">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="editUsrId" class="control-label col-md-3">使用者代號</label>
                        <div class="col-md-9">
                            <input type="text" id="editUsrId" v-model="usrId" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="editUsrWorkId" class="control-label col-md-3">使用者員編</label>
                        <div class="col-md-9">
                            <input type="text" id="editUsrWorkId" v-model="usrWorkId" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="editUsrNm" class="control-label col-md-3">使用者名稱</label>
                        <div class="col-md-9">
                            <input type="text" id="editUsrNm" v-model="usrNm" class="form-control">
                        </div>
                    </div>
                
                    <div class="form-group">
                        <label for="editPwd" class="control-label col-md-3">密碼</label>
                        <div class="col-md-9">
                            <input type="password" id="editPwd" v-model="pwd" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="editWh" class="control-label col-md-3">歸屬倉庫</label>
                        <div class="col-md-9">
                            <select class="form-control" id="wh" v-model="wh">
                                <template v-for="wh in whs">
                                    <option :value="wh.wh_code">{{ wh.wh_code }} {{ wh.wh_name }}</option>
                                </template>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="editGroupId" class="control-label col-md-3">群組代號</label>
                        <div class="col-md-9">
                            <select class="form-control" id="groupId" v-model="groupId">
                                <template v-for="group in groups">
                                    <option :value="group.id">{{ group.id }} {{ group.name }}</option>
                                </template>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="editStatus" class="control-label col-md-3">狀態</label>
                        <div class="col-md-9">
                            <label class="radio-inline"><input type="radio" name="status" value="true" v-model="status">正常</label>
                            <label class="radio-inline"><input type="radio" name="status" value="false" v-model="status">停用</label>
                        </div>
                    </div>
                </div>
            </form>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="saveEdit">
                    Save
                </button>
                <button type="button" class="btn btn-default" @click="addFormClose">
                    Cancel
                </button>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: "UsrAddForm",
    props : ['groups', 'whs'],
    data: function() {
        return { 
            usrId: '',
            usrWorkId: '',
            usrNm: '',
            pwd: '',
            wh: '',
            groupId: '',
            status: true
        };
    },
    methods: {
        addFormClose: function() {//呼叫父方法
            this.$emit('addFormClose');
        },
        saveEdit: function() {
            this.$emit('addFormClose');//呼叫父方法
        }
    }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h2 {
  margin-top: 0;
}

.modal-body {
  margin: 10px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.form-horizontal .control-label{
    padding-top: 7px;
}
</style>