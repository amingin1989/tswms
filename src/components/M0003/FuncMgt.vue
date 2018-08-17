<template>
    <div id="funcMgt">
        <div class="row rowSpan">
        </div>
        <vue-good-table :columns="funcs.cols" :rows="funcs.rows" :lineNumbers="false" styleClass="vgt-table striped bordered condensed" :select-options="{ 
                enabled: false,
            }" :search-options="{
                enabled: true,
                placeholder: '搜尋功能',
            }" :sort-options="{
                enabled: true,
                initialSortBy: {field: 'FUNCTION_ID', type: 'asc'}
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
                    <font-awesome-icon icon="plus" style="width:30px; height:30px; margin-right:10px;" />
                </a>
            </div>
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'FUNCTION_ID' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.FUNCTION_ID" />
                </span>
                <span v-else-if="props.column.field == 'FUNCTION_NM' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.FUNCTION_NM" />
                </span>
                <span v-else-if="props.column.field == 'FUNCTION_PATH' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.FUNCTION_PATH" />
                </span>
                <span v-else-if="props.column.field == 'FUNCTION_TYPE' && props.row.editMode">
                    <select class="form-control" v-model="props.row.FUNCTION_TYPE">
                        <template v-for="funcType in funcTypes">
                            <option :value="funcType.TYPE_ID" :key="'FuncMgt'+funcType.TYPE_ID">{{ funcType.TYPE_NAME }}</option>
                        </template>
                    </select>
                </span>
                <span v-else-if="props.column.field == 'STATUS' && props.row.editMode">
                    <select class="form-control" v-model="props.row.STATUS">
                        <option :value="props.row.STATUS">啟用</option>
                        <option :value="props.row.STATUS">停用</option>
                    </select>
                </span>
                <span v-else-if="props.column.field == 'SAVE'">
                    <a type="button" v-if="!props.row.editMode">
                        <font-awesome-icon icon="edit" />
                    </a>
                    <a type="button" v-if="props.row.editMode">
                        <font-awesome-icon icon="save" />
                    </a>
                </span>
                <span v-else-if="props.column.field == 'DELETE'">
                    <a type="button">
                        <font-awesome-icon icon="trash-alt" />
                    </a>
                </span>
                <span v-else>
                    {{props.formattedRow[props.column.field]}}
                </span>
            </template>
        </vue-good-table>

        <funcAddForm v-show="showFuncAdd" :funcTypes="funcTypes" @addFormClose="addFormClose">
        </funcAddForm>
    </div>
</template>
        
<script>
import funcAddForm from "./FuncAddForm.vue";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "FuncMgt",
  props: ["funcs", "funcTypes"],
  data() {
    return {
      showFuncAdd: false,
      preSelectedRow: null
    };
  },
  methods: {
    onCellClick: function(params) {
      if (params.column.field == "DELETE") {
        //送出刪除
        this.removeData(params.row);
      } else if (params.column.field == "SAVE") {
        if (params.row.editMode) {
          //儲存
          console.log("SAVE");
          this.preSelectedRow.editMode = false;
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
    },
    recoverData: function() {
      const originData = this.funcs.rows[this.preSelectedRow.originalIndex];
      this.preSelectedRow.FUNCTION_ID = originData.FUNCTION_ID;
      this.preSelectedRow.FUNCTION_NM = originData.FUNCTION_NM;
      this.preSelectedRow.FUNCTION_PATH = originData.FUNCTION_PATH;
      this.preSelectedRow.FUNCTION_TYPE = originData.FUNCTION_TYPE;
      this.preSelectedRow.STATUS = originData.STATUS;
    },
    removeData: function(rmData) {
      rmData = this.funcs.rows[rmData.originalIndex];
      this.funcs.rows.splice(this.funcs.rows.indexOf(rmData), 1);
    },
    addFormClose: function() {
      this.showFuncAdd = false;
      //重新查一次使用者資料
    },
    addFormShow: function() {
      this.showFuncAdd = true;
    },
    updateFunc: function() {
      this.axios
        .post(
          "/updateFunc",
          {},
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
    funcAddForm,
    VueGoodTable
  }
};
</script>

<style scoped>
.rowSpan {
  margin-top: 20px;
}
</style>