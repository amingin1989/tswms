<template>
    <div id="usrEditable">
        <div class="row rowSpan">
        </div>
        <vue-good-table :columns="usrs.cols" :rows="usrs.rows" :lineNumbers="false" styleClass="vgt-table striped bordered condensed" :select-options="{ 
                enabled: false,
            }" :search-options="{
                enabled: true,
                placeholder: '搜尋人員資料',
            }" :sort-options="{
                enabled: true,
                initialSortBy: {field: 'USER_ID', type: 'asc'}
            }" :pagination-options="{
                enabled: true,
                mode: 'pages',
                perPage: 10,
                nextLabel: '下一頁',
                prevLabel: '上一頁',
                rowsPerPageLabel: '每頁筆數',
                ofLabel: '頁, 總頁數：',
                pageLabel: '第',
                allLabel: '顯示所有資料',
            }" @on-cell-click="onCellClick">
            <div slot="table-actions">
                <a type="button" @click="addFormShow">
                    <font-awesome-icon icon="user-plus" style="width:30px; height:30px; margin-right:10px;" />
                </a>
            </div>
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'USER_ID' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.USER_ID" />
                </span>
                <span v-else-if="props.column.field == 'USER_WORK_ID' && props.row.USER_WORK_ID && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.USER_WORK_ID" />
                </span>
                <span v-else-if="props.column.field == 'USER_NM' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.USER_NM" />
                </span>
                <span v-else-if="props.column.field == 'PASSWORD' && props.row.editMode">
                    <input type="password" class="form-control" v-model="props.row.PASSWORD" />
                </span>
                <span v-else-if="props.column.field == 'WH_CODE' && props.row.editMode">
                    <select class="form-control" v-model="props.row.WH_CODE">
                        <template v-for="wh in whs">
                            <option :value="wh.WH_CODE" :key="'UsrEditable'+wh.WH_CODE">{{ wh.WH_NM }}</option>
                        </template>
                    </select>
                </span>
                <span v-else-if="props.column.field == 'GROUP_ID' && props.row.editMode">
                    <select class="form-control" v-model="props.row.GROUP_ID">
                        <template v-for="group in groups">
                            <option :value="group.GROUP_ID" :key="'UsrEditable'+group.GROUP_ID">{{ group.GROUP_ID }} {{ group.GROUP_NAME }}</option>
                        </template>
                    </select>
                </span>
                <span v-else-if="props.column.field == 'STATUS' && props.row.editMode">
                    <select class="form-control" v-model="props.row.STATUS">
                        <option :value="props.row.STATUS">啟用</option>
                        <option :value="props.row.STATUS">停用</option>
                    </select>
                </span>
                <span v-else-if="props.column.field == 'SAVE' && !props.row.LOGIN_STATUS">
                    <a type="button" v-if="!props.row.editMode">
                        <font-awesome-icon icon="edit" />
                    </a>
                    <a type="button" v-if="props.row.editMode">
                        <font-awesome-icon icon="save" />
                    </a>
                </span>
                <span v-else-if="props.column.field == 'DELETE' && !props.row.LOGIN_STATUS">
                    <a type="button">
                        <font-awesome-icon icon="trash-alt" />
                    </a>
                </span>
                <span v-else>
                    {{props.formattedRow[props.column.field]}}
                </span>
            </template>
        </vue-good-table>
        <usrAddForm v-show="showUsrAdd" :groups="groups" :whs="whs" @addFormClose="addFormClose">
        </usrAddForm>
    </div>
</template>

<script>
import usrAddForm from "./UsrAddForm.vue";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "UsrEditable",
  props: ["usrs", "groups", "whs"],
  data() {
    return {
      showUsrAdd: false,
      preSelectedRow: null
    };
  },
  methods: {
    onCellClick: function(params) {
      if (!params.row.LOGIN_STATUS) {
        //未登入才能做修改
        if (params.column.field == "DELETE") {
          //送出刪除
          this.removeData(params.row);
        } else if (params.column.field == "SAVE") {
          if (params.row.editMode) {
            //儲存
            console.log("SAVE");
            this.preSelectedRow.editMode = false;
            this.updateUsr(params.row);
          } else {
            //修改
            console.log("EDIT");
            if (this.preSelectedRow) {
              this.recoverData();
              this.preSelectedRow.editMode = false;
            }
            this.preSelectedRow = params.row;
            params.row.editMode = !params.row.editMode;
          }
        }
      }
    },
    recoverData: function() {
      console.log("recoverData idx: " + this.preSelectedRow.originalIndex);
      const originData = this.usrs.rows[this.preSelectedRow.originalIndex];
      this.preSelectedRow.USER_ID = originData.USER_ID;
      this.preSelectedRow.USER_WORK_ID = originData.USER_WORK_ID;
      this.preSelectedRow.USER_NM = originData.USER_NM;
      this.preSelectedRow.WH_CODE = originData.WH_CODE;
      this.preSelectedRow.GROUP_ID = originData.GROUP_ID;
      this.preSelectedRow.STATUS = originData.STATUS;
    },
    removeData: function(rmData) {
      rmData = this.usrs.rows[rmData.originalIndex];
      this.usrs.rows.splice(this.usrs.rows.indexOf(rmData), 1);
    },
    addFormClose: function() {
      this.showUsrAdd = false;
      //重新查一次使用者資料
    },
    addFormShow: function() {
      this.showUsrAdd = true;
    },
    updateUsr: function(usr) {
      this.axios
        .post(
          "/updateUsr",
          {
            USER_ID: usr.USER_ID,
            USER_WORK_ID: usr.USER_WORK_ID,
            USER_NM: usr.USER_NM,
            PASSWORD: usr.PASSWORD,
            WH_CODE: usr.WH_CODE,
            STATUS: usr.STATUS,
            GROUP_ID: usr.GROUP_ID
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(function(response) {})
        .catch(function(error) {});
    }
  },
  components: {
    usrAddForm,
    VueGoodTable
  }
};
</script>

<style scoped>
.rowSpan {
  margin-top: 20px;
}
</style>