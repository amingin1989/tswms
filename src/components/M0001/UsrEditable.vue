<template>
    <div>
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th v-for="col in usrs.cols" v-if="usrs.cols.length" :key="col">
                        <strong>{{col}}</strong>
                    </th>
                    <th></th>
                    <th>
                        <button type="button" class="btn btn-primary" @click="addData">新增</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(usr, index) in usrs.rows" v-if="usrs.rows.length" :key="index" :class="{editing: usr == editedUser}" v-cloak>
                    <td>
                        {{usr.USER_ID}}
                    </td>
                    <td>
                        {{usr.USER_WORK_ID}}
                    </td>
                    <td>
                        <div class="view">
                            {{usr.USER_NM}}
                        </div>
                        <div class="edit">
                            <input type="text" class="form-control" v-model="usr.USER_NM" />
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            *****
                        </div>
                        <div class="edit">
                            <input type="password" class="form-control" v-model="usr.PASSWORD" />
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            {{usr.WH_NM}}
                        </div>
                        <div class="edit">
                            <select class="form-control" id="wh" v-model="usr.WH_CODE">
                                <template v-for="wh in whs">
                                    <option :value="wh.wh_code" :key="'UsrEditable'+wh.wh_code">{{ wh.wh_name }}</option>
                                </template>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            {{usr.GROUP_NM}}
                        </div>
                        <div class="edit">
                            <select class="form-control" id="editableGroupId" v-model="usr.GROUP_ID">
                                <template v-for="group in groups">
                                    <option :value="group.id" :key="'UsrEditable'+group.id">{{ group.id }} {{ group.name }}</option>
                                </template>
                            </select>
                        </div>
                    </td>
                    <td>
                        {{usr.LOGIN_STATUS}}
                    </td>
                    <td>
                        <div class="view">
                            {{usr.STATUS_SHOW}}
                        </div>
                        <div class="edit">
                            <label><input type="radio" id="status" value="true" v-model="usr.STATUS"> 正常</label>
                            <label><input type="radio" id="status" value="false" v-model="usr.STATUS"> 停用</label>
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            <button type="button" class="btn btn-warning" @click.prevent="editData(usr)" v-if="!usr.LOGIN_STATUS">編輯</button>
                        </div>
                        <div class="edit">
                            <button type="button" class="btn btn-success" @click.prevent="saveData(usr)">儲存</button>
                            <button type="button" class="btn btn-default" @click.prevent="cancelEdit(usr)">取消</button>
                        </div>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" @click.prevent="rmData(usr)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <usrAddForm v-show="showUsrAdd" :groups="groups" :whs="whs" @addFormClose="addFormClose">
        </usrAddForm>
    </div>
</template>

<script>
import usrAddForm from "./UsrAddForm.vue";

export default {
  name: "UsrEditable",
  props: ["usrs", 'groups'],
  data() {
    return {
      showUsrAdd: false,
      editedUser: null,
      whs: [
        { wh_code: "001", wh_name: "A倉(001)" },
        { wh_code: "002", wh_name: "B倉(002)" },
        { wh_code: "003", wh_name: "C倉(003)" }
      ]
    };
  },
  methods: {
    addFormClose: function() {
      this.showUsrAdd = false;
    },
    addData: function() {
      this.showUsrAdd = true;
    },
    editData: function(usr) {
      //取消還原用
      this._beforeEditingCache = Object.assign({}, usr);
      this.editedUser = usr;
    },
    saveData: function() {
      this.axios
        .post(
          "/updateUsr",
          {
            USER_ID: this.editedUser.USER_ID,
            USER_WORK_ID: this.editedUser.USER_WORK_ID,
            USER_NM: this.editedUser.USER_NM,
            PASSWORD: this.editedUser.PASSWORD,
            WH_CODE: this.editedUser.WH_CODE,
            STATUS: this.editedUser.STATUS,
            GROUP_ID: this.editedUser.GROUP_ID
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(function(response) {})
        .catch(function(error) {});

      this.editedUser = null;
    },
    cancelEdit: function(usr) {
      //取消還原用
      Object.assign(usr, this._beforeEditingCache);
      this.editedUser = this._beforeEditingCache = null;
    },
    rmData: function(usr) {}
  },
  components: {
    usrAddForm
  }
};
</script>

<style scoped>
.table {
  margin-top: 40px;
}

.table td,
caption,
th {
  text-align: center;
}

.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #5bc0de40;
}

[v-cloak] {
  display: none;
}
.edit {
  display: none;
}
.editing .edit {
  display: block;
}
.editing .view {
  display: none;
}
</style>