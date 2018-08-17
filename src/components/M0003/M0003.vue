<template>
    <div id="m0003">
        <h1>
            <font-awesome-icon icon="sitemap" /> 功能管理</h1>
        <hr>

        <funcMgt v-if="showFunc" :funcs="funcs" :funcTypes="funcTypes"></funcMgt>
        <loading v-if="showLoading"></loading>
    </div>
</template>

<script>
import loading from "../materials/Loading.vue";
import funcMgt from "./FuncMgt.vue";

export default {
  name: "M0003",
  data() {
    return {
      showFunc: false,
      showLoading: false,
      funcTypes: [
        {
          TYPE_ID: "1",
          TYPE_NAME: "PC"
        },
        {
          TYPE_ID: "2",
          TYPE_NAME: "HT"
        }
      ],
      funcs: {
        cols: [
          {
            label: "功能代號",
            field: "FUNCTION_ID",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          },
          {
            label: "功能名稱",
            field: "FUNCTION_NM",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          },
          {
            label: "功能路徑",
            field: "FUNCTION_PATH",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          },
          {
            label: "使用類型",
            field: "FUNCTION_TYPE",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align",
            formatFn: this.funcTypeFormat
          },
          {
            label: "狀態",
            field: "STATUS",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align",
            formatFn: this.statusFormat
          },
          {
            label: "",
            field: "SAVE",
            filterable: false,
            sortable: false,
            globalSearchDisabled: false,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          },
          {
            label: "",
            field: "DELETE",
            filterable: false,
            sortable: false,
            globalSearchDisabled: false,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          }
        ],
        rows: []
      }
    };
  },
  methods: {
    funcTypeFormat: function(value) {
      return value == "1" ? "PC" : value == "2" ? "HT" : "";
    },
    statusFormat: function(value) {
      return value ? "啟用" : "停用";
    }
  },
  mounted: function() {
    this.showFunc = true;
    this.funcs.rows = [
      {
        FUNCTION_ID: "M0001",
        FUNCTION_NM: "人員管理",
        FUNCTION_PATH: "/m0001",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "M0002",
        FUNCTION_NM: "群組權限管理",
        FUNCTION_PATH: "/m0002",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "M0003",
        FUNCTION_NM: "XXX管理",
        FUNCTION_PATH: "/m0003",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "M0004",
        FUNCTION_NM: "AAA管理",
        FUNCTION_PATH: "/m0004",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "M0005",
        FUNCTION_NM: "BBB管理",
        FUNCTION_PATH: "/m0005",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "M0006",
        FUNCTION_NM: "CCC管理",
        FUNCTION_PATH: "/m0006",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "M0007",
        FUNCTION_NM: "DDD管理",
        FUNCTION_PATH: "/m0007",
        FUNCTION_TYPE: "1",
        STATUS: false,
        editMode: false
      },
      {
        FUNCTION_ID: "S0001",
        FUNCTION_NM: "AAA查詢",
        FUNCTION_PATH: "/s0001",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "S0002",
        FUNCTION_NM: "BBB查詢",
        FUNCTION_PATH: "/s0002",
        FUNCTION_TYPE: "2",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "S0003",
        FUNCTION_NM: "CCC查詢",
        FUNCTION_PATH: "/s0003",
        FUNCTION_TYPE: "1",
        STATUS: true,
        editMode: false
      },
      {
        FUNCTION_ID: "S0004",
        FUNCTION_NM: "DDD查詢",
        FUNCTION_PATH: "/s0004",
        FUNCTION_TYPE: "1",
        STATUS: false,
        editMode: false
      },
      {
        FUNCTION_ID: "S0005",
        FUNCTION_NM: "EEE查詢",
        FUNCTION_PATH: "/s0005",
        FUNCTION_TYPE: "2",
        STATUS: false,
        editMode: false
      }
    ];
  },
  components: {
    loading,
    funcMgt
  }
};
</script>

<style scoped>
.rowSpan {
  margin-top: 40px;
}
</style>
          
      