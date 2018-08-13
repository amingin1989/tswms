<template>
	<div id="main">
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<router-link to="/">
						<a class="navbar-brand">衛星倉分貨系統</a>
					</router-link>
				</div>
				<ul class="nav navbar-nav">
					<template v-for="func in functions">
						<li class="dropdown" :key="'Main'+func">
							<a class="dropdown-toggle" data-toggle="dropdown">{{func.func_name}}
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<template v-for="item in func.func_data">
									<li :key="'Main'+item">
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
							<a href="/logout" type="button" @click.prevent="logout">登出</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      functions: []
    };
  },
  methods: {
    logout: function() {
      var store = this.$store;
      var router = this.$router;
      this.axios
        .get("/logout")
        .then(function(res) {
          store.state.user.isLogin = false;
          router.push("/loginpage");
        })
        .catch(error => console.log(error));
    }
  },
  mounted: function() {
    this.functions = this.$store.state.user.functions;
  }
};
</script>

<style scoped>
</style>
