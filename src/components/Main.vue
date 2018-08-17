<template>
	<div id="main">
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<router-link to="/">
						<a class="navbar-brand">衛星 <font-awesome-icon icon="warehouse" /> 分貨系統</a>
					</router-link>
				</div>
				<ul class="nav navbar-nav">
					<template v-for="func in functions">
						<li class="dropdown" :key="'Main'+func.func_name">
							<a class="dropdown-toggle" data-toggle="dropdown">
								<font-awesome-icon icon="user-alt" v-if="func.func_name === '主檔管理'" />
								<font-awesome-icon icon="search" v-if="func.func_name === '查詢類'" />
								<font-awesome-icon icon="wrench" v-if="func.func_name === '作業類'" /> {{func.func_name}}
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<template v-for="item in func.func_data">
									<li :key="'Main'+item.name">
										<router-link :to="item.url">{{ item.name }}</router-link>
									</li>
								</template>
							</ul>
						</li>
					</template>
				</ul>
				<div class="collapse navbar-collapse" id="myNavbar">
					<ul class="nav navbar-nav navbar-right">
						<li>
							<a href="/logout" type="button" @click.prevent="logout">
								<font-awesome-icon icon="sign-out-alt" /> 登出</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<msgDialog v-if="showMsgDialog" @msgDialogClose="msgDialogClose" :title="msgTitle" :msg="msgContent"></msgDialog>
		<div class="container">
			<div class="funcTitle"></div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import msgDialog from "./materials/MsgDialog.vue";

export default {
  name: "Main",
  data() {
    return {
      functions: [],
      showMsgDialog: false,
      msgTitle: "",
      msgContent: ""
    };
  },
  methods: {
    logout: function() {
      var _this = this;
      this.axios
        .get("/logout")
        .then(function(res) {
          if (res.data.success) {
            _this.$store.state.user.isLogin = false;
            _this.$router.push("/loginpage");
          }
        })
        .catch(function(error) {
          _this.showLoading = false;
          _this.msgTitle = "錯誤訊息";
          _this.msgContent = "系統異常，請聯絡系統管理員";
          _this.showMsgDialog = true;
        });
    },
    msgDialogClose: function() {
      this.showMsgDialog = false;
      this.msgTitle = "";
      this.msgContent = "";
    }
  },
  mounted: function() {
    this.functions = this.$store.state.user.functions;
  },
  components: {
    msgDialog
  }
};
</script>

<style>
.funcTitle {
  margin-top: 80px;
}
</style>
