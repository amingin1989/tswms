<template>
    <div id="whMgt">
        <div class="row rowSpan">
        </div>
        <vue-good-table :columns="whs.cols" :rows="whs.rows" :lineNumbers="false" styleClass="vgt-table striped bordered condensed" :select-options="{ 
                enabled: false,
            }" :search-options="{
                enabled: true,
                placeholder: '搜尋功能',
            }" :sort-options="{
                enabled: true,
                initialSortBy: {field: 'WH_NO', type: 'asc'}
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
                <span v-if="props.column.field == 'WH_NO' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.WH_NO" />
                </span>
                <span v-else-if="props.column.field == 'WH_TYPE' && props.row.editMode">
                    <select class="form-control" v-model="props.row.WH_TYPE">
                        <template v-for="whType in whTypes">
                            <option :value="whType.TYPE_ID" :key="'WhMgt'+whType.TYPE_ID">{{ whType.TYPE_NAME }}</option>
                        </template>
                    </select>
                </span>
                <span v-else-if="props.column.field == 'WH_NM' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.WH_NM" />
                </span>
                <span v-else-if="props.column.field == 'WH_ADDRESS' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.WH_ADDRESS" />
                </span>
                <span v-else-if="props.column.field == 'AREA' && props.row.editMode">
                    <input type="text" class="form-control" v-model="props.row.AREA" />
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

        <whAddForm v-show="showWhAdd" :whTypes="whTypes" @addFormClose="addFormClose">
        </whAddForm>
    </div>
</template>
        
<script>
import whAddForm from "./WhAddForm.vue";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "WhMgt",
  props: ["whs", "whTypes"],
  data() {
    return {
      showWhAdd: false,
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
      const originData = this.whs.rows[this.preSelectedRow.originalIndex];
      this.preSelectedRow.WH_NO = originData.WH_NO;
      this.preSelectedRow.WH_NM = originData.WH_NM;
      this.preSelectedRow.WH_ADDRESS = originData.WH_ADDRESS;
      this.preSelectedRow.WH_TYPE = originData.WH_TYPE;
      this.preSelectedRow.AREA = originData.AREA;
    },
    removeData: function(rmData) {
      rmData = this.whs.rows[rmData.originalIndex];
      this.whs.rows.splice(this.whs.rows.indexOf(rmData), 1);
    },
    addFormClose: function() {
      this.showWhAdd = false;
      //重新查一次使用者資料
    },
    addFormShow: function() {
      this.showWhAdd = true;
    },
    updateWh: function() {
      this.axios
        .post(
          "/updateWh",
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
    whAddForm,
    VueGoodTable
  }
};
</script>

<style scoped>
.rowSpan {
  margin-top: 20px;
}
</style>