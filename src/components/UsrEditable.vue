<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th v-for="col in datasource.cols" v-if="datasource.cols.length" :key="col">{{col}}</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in datasource.rows" v-if="datasource.rows.length" :key="index" :class="{editing: row == editedUser}" v-cloak>
                    <td>
                        {{row.USER_ID}}
                    </td>
                    <td>
                        {{row.USER_WORK_ID}}
                    </td>
                    <td>
                        <div class="view">
                            {{row.USER_NM}}
                        </div>
                        <div class="edit">
                            <input type="text" v-model="row.USER_NM"/>
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            *****
                        </div>
                        <div class="edit">
                            <input type="password" v-model="row.PASSWORD"/>
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            {{row.WH_NM}}
                        </div>
                        <div class="edit">
                            <select class="form-control" id="wh" v-model="row.WH_CODE">
                                <template v-for="wh in whs">
                                    <option :value="wh.wh_code">{{ wh.wh_name }}</option>
                                </template>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            {{row.GROUP_NM}}
                        </div>
                        <div class="edit">
                            <select class="form-control" id="groupId" v-model="row.GROUP_ID">
                                <template v-for="group in groups">
                                    <option :value="group.id">{{ group.id }} {{ group.name }}</option>
                                </template>
                            </select>
                        </div>
                    </td>
                    <td>
                        {{row.LOGIN_STATUS}}
                    </td>
                    <td>
                        <div class="view">
                            {{row.STATUS_SHOW}}
                        </div>
                        <div class="edit">
                            <label class="radio-inline"><input type="radio" name="status" :value="true" v-model="status">正常</label>
                            <label class="radio-inline"><input type="radio" name="status" :value="false" v-model="status">停用</label>
                        </div>
                    </td>
                    <td>
                        <div class="view">
                            <button type="button" class="btn btn-warning" @click.prevent="editData(row)">編輯</button>
                        </div>
                        <div class="edit">
                            <button type="button" class="btn btn-success" @click.prevent="saveData(row)">儲存</button>
                            <button type="button" class="btn btn-default" @click.prevent="cancelEdit(row)">取消</button>         
                        </div>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" @click.prevent="" :disabled="!rmBtnEnabled">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <usrEditForm v-show="showUsrEdit" 
                    :edit-data="editData" 
                    @editFormClose="editFormClose" 
                    @saveEdit="saveEdit">
        </usrEditForm> -->
    </div>
</template>

<script>
//import usrEditForm from './UsrEditForm.vue'

export default {
    name: "UsrEditable",
    props : ['datasource'],
    data() {
        return {
            showUsrEdit: false,
            //editData: {},
            editedUser: null,
            rmBtnEnabled: true,
            groups: [{"id":"00001","name":"管理員"},{"id":"00002","name":"使用者"}],
            whs: [{"wh_code":"001", "wh_name":"A倉"},{"wh_code":"002", "wh_name":"B倉"},{"wh_code":"003", "wh_name":"C倉"}]
        };
    },
    methods: {
        /*editFormShow: function(row) {
            //this.editData = row;
            //console.log('editFormShow >>' + this.editData.USER_NM);
            this.showUsrEdit = true;
        },
        saveEdit: function(index, data) {
            console.log('123 saveEdit...');
            this.showUsrEdit = false;
        },
        editFormClose: function() {
            console.log('Test editFormClose...');
            this.showUsrEdit = false;
        },*/
        editData: function(user){
            //取消還原用
            this._beforeEditingCache = Object.assign({}, user);
            this.rmBtnEnabled = false;
            this.editedUser = user;
            console.log(user.STATUS);
        },
        saveData: function(){
            this.rmBtnEnabled = true;
            this.axios.post('/updateUsr', 
            {
              USER_NM: this.editedUser.USER_NM,
              PASSWORD: this.editedUser.PASSWORD,
              WH_CODE: this.editedUser.WH_CODE,
              STATUS: this.editedUser.STATUS,
              GROUP_ID: this.editedUser.GROUP_ID
            },
            { headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }}).then(function(response) {
              
            }).catch(function(error) {

            });

            this.editedUser = null;
        },
        cancelEdit: function(user){
            this.rmBtnEnabled = true;
            //取消還原用
            Object.assign(user, this._beforeEditingCache);
            this.editedUser = this._beforeEditingCache = null;
        }
    },
    components: {
        //usrEditForm
    }
};
</script>

<style>

.table {
  margin-top: 40px;
}

.table td,th{
  text-align: center;
}

.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color:#5bc0de40;
}

[v-cloak] {
    display: none;
}
.edit {
    display: none;
}
.editing .edit {
    display: block
}
.editing .view {
    display: none;
}
</style>