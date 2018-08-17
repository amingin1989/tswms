<template>
  <div id="m0004">
    <h1>
      <font-awesome-icon icon="warehouse" /> 倉庫資料維護</h1>
    <hr>

    <whMgt v-if="showWh" :whs="whs" :whTypes="whTypes"></whMgt>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
import loading from "../materials/Loading.vue";
import whMgt from "./WhMgt.vue";

export default {
  name: "M0004",
  data() {
    return {
      showWh: false,
      showLoading: false,
      whs: {
        cols: [
          {
            label: "倉庫代號",
            field: "WH_NO",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          },
          {
            label: "倉庫類型",
            field: "WH_TYPE",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align",
            formatFn: this.whTypeFormat
          },
          {
            label: "倉庫名稱",
            field: "WH_NM",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          },
          {
            label: "倉庫地址",
            field: "WH_ADDRESS",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
          },
          {
            label: "區域",
            field: "AREA",
            filterable: true,
            thClass: "vgt-center-align",
            tdClass: "vgt-center-align"
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
      },
      whTypes: [
        {
          TYPE_ID: "1",
          TYPE_NAME: "轉運倉"
        },
        {
          TYPE_ID: "2",
          TYPE_NAME: "衛星倉"
        }
      ]
    };
  },
  methods: {
    whTypeFormat: function(value) {
      const typeArray = this.whTypes.filter(function(whType) {
        return whType.TYPE_ID == value;
      });
      return typeArray.length ? typeArray[0].TYPE_NAME : "";
    }
  },
  mounted: function() {
    this.showWh = true;
    this.whs.rows = [
      {
        WH_NO: "DC1",
        WH_NM: "中壢倉",
        WH_TYPE: "1",
        WH_ADDRESS: "桃園市XXXXXXXX",
        AREA: "",
        editMode: false
      },
      {
        WH_NO: "NS1",
        WH_NM: "北衛一",
        WH_TYPE: "2",
        WH_ADDRESS: "台北市OOOOO",
        AREA: "1",
        editMode: false
      },
      {
        WH_NO: "NS2",
        WH_NM: "北衛二",
        WH_TYPE: "2",
        WH_ADDRESS: "新北市OOOOOO",
        AREA: "2",
        editMode: false
      },
      {
        WH_NO: "DC2",
        WH_NM: "大園倉",
        WH_TYPE: "1",
        WH_ADDRESS: "桃園市XXXXX",
        AREA: "",
        editMode: false
      }
    ];
  },
  components: {
    loading,
    whMgt
  }
};
</script>

<style scoped>
</style>