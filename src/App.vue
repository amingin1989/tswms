<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
				  <a class="navbar-brand" href="/">衛星倉分貨系統</a>
			  </div>
				<ul class="nav navbar-nav">
						<template v-for="func in functions">
							<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown">{{func.func_name}}<span
								class="caret"></span></a>
								<ul class="dropdown-menu">
								<template v-for="item in func.func_data">
									<li><router-link :to="item.url">{{ item.name }}</router-link></li>
								</template>
								</ul></li>
						</template>
				</ul>
        <div class="collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="/logout">登出</a></li>
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
  name: "App",
  data() {
    return {
			//functions: {}
      functions: [{"func_data":[{"name":"人員管理","url":"/m0001"},{"name":"adminPage2","url":"/hello"}],"func_name":"主檔管理"},{"func_data":[{"name":"srPage1","url":"user"},{"name":"srPage2","url":"user"}],"func_name":"查詢類"},{"func_data":{},"func_name":"操作類"}]
    };
	}/*,
  created: function() {
    this.axios.get("/ming/functions").then(function(response) {
      app.functions = response.data;
    });
  }*/
};
</script>

<style>
</style>
