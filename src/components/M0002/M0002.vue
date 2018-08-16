<template>
    <div id="m0002">
        <h1>群組權限管理</h1>
        <hr>
        <!-- <form class="form-inline">
            <<div class="form-group">
                <label for="groupId">群組代號：</label>
                <input type="text" id="M00002GroupId" v-model="groupId" value="" class="form-control" placeholder="請輸入群組代號">
            </div> -->
        <!-- 
            <div class="form-group">
                <label for="groupNm">
                    <h4>群組對象：</h4>
                </label>
                <multiselect v-model="groupFor" :options="groups" :multiple="false" :allow-empty="false" :close-on-select="true" track-by="GROUP_ID" label="GROUP_NAME" placeholder="請選擇群組">
                </multiselect>
            </div>
            <button type="button" class="btn btn-primary" style="margin-left: 20px;" @click="addGroup">新增</button>
        </form> -->

        <div class="row rowSpan">
            <label class="col-md-4 control-label">
                <h4>群組對象：</h4>
            </label>
        </div>
        <div class="row">
            <div class="col-md-4">
                <multiselect v-model="groupFor" :options="groups" :multiple="false" :allow-empty="false" :close-on-select="true" track-by="GROUP_ID" label="GROUP_NAME" placeholder="請選擇群組">
                </multiselect>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-primary" @click="showAddGroup">新增</button>
            </div>
        </div>

        <div class="row rowSpan">
            <label class="col-md-4 control-label">
                <h4>{{ showGroupName }} 群組功能 :</h4>
            </label>
        </div>
        <div class="row">
            <div class="col-md-12">
                <multiselect v-model="selectedFunc" :options="functions" :multiple="true" :allow-empty="true" :close-on-select="false" group-values="funcData" group-label="catgName" :group-select="true" :hide-selected="true" track-by="FUNCTION_ID" :custom-label="optionLabel" placeholder="請選擇 / 輸入欲查詢功能">
                </multiselect>
            </div>
        </div>
        <div class="row rowSpan">
            <div class="col-md-4"></div>
            <div class="col-md-4" style="text-align:center;">
                <button type="button" class="btn btn-success" style="margin-left: 20px;" @click="save()">儲存</button>
            </div>
            <div class="col-md-4"></div>
        </div>
        <loading v-if="showLoading"></loading>
        <groupAddForm v-if="showGroupAddForm" :groups="groups" @addFormClose="addFormClose"></groupAddForm>
    </div>
</template>

<script>
import loading from "../materials/Loading.vue";
import groupAddForm from "./GroupAddForm.vue";

export default {
  name: "M0002",
  data() {
    return {
      showLoading: false,
      showGroupAddForm: false,
      groupId: "",
      groupFor: "",
      groups: [
        { GROUP_ID: "999", GROUP_NAME: "資訊管理人員", GROUP_TYPE: "9" },
        { GROUP_ID: "899", GROUP_NAME: "總公司管理人員", GROUP_TYPE: "8" },
        { GROUP_ID: "799", GROUP_NAME: "倉庫管理人員", GROUP_TYPE: "7" }
      ],
      showGroupName: "",
      functions: [],
      selectedFunc: []
    };
  },
  methods: {
    optionLabel: function(func) {
      if (func) {
        return `${func.FUNCTION_NAME}`;
      }
    },
    save: function() {
      alert("save");
    },
    showAddGroup: function() {
      this.showGroupAddForm = true;
    },
    addFormClose: function() {
      this.showGroupAddForm = false;
    }
  },
  watch: {
    groupFor: function(group) {
      this.showGroupName = group.GROUP_NAME;

      //顯示該群組目前已選擇的功能
      this.selectedFunc = [];

      //顯示該群組能使用的所有功能
      this.functions = [
        {
          catgName: "管理類",
          funcData: [
            {
              FUNCTION_ID: "M0001",
              FUNCTION_NAME: "人員管理"
            },
            {
              FUNCTION_ID: "M0002",
              FUNCTION_NAME: "群組權限管理"
            },
            {
              FUNCTION_ID: "M0003",
              FUNCTION_NAME: "XXX管理"
            },
            {
              FUNCTION_ID: "M0004",
              FUNCTION_NAME: "AAA管理"
            },
            {
              FUNCTION_ID: "M0005",
              FUNCTION_NAME: "BBB管理"
            },
            {
              FUNCTION_ID: "M0006",
              FUNCTION_NAME: "CCC管理"
            },
            {
              FUNCTION_ID: "M0007",
              FUNCTION_NAME: "DDD管理"
            }
          ]
        },
        {
          catgName: "查詢類",
          funcData: [
            {
              FUNCTION_ID: "S0001",
              FUNCTION_NAME: "AAA查詢"
            },
            {
              FUNCTION_ID: "S0002",
              FUNCTION_NAME: "BBB查詢"
            },
            {
              FUNCTION_ID: "S0003",
              FUNCTION_NAME: "CCC查詢"
            },
            {
              FUNCTION_ID: "S0004",
              FUNCTION_NAME: "DDD查詢"
            },
            {
              FUNCTION_ID: "S0005",
              FUNCTION_NAME: "EEE查詢"
            }
          ]
        }
      ];
    }
  },
  mounted: function() {
    this.groupId = "";
    this.selectedFunc = [];
    this.functions = [];
  },
  components: {
    loading,
    groupAddForm
  }
};
</script>

<style scoped>
.rowSpan {
  margin-top: 40px;
}
</style>