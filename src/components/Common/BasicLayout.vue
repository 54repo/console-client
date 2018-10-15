<template>
	<div class="basic-layout">
		<div class="basic-layout-wrap">
			<div class="title layout-title">
				<div>{{title}}</div>
				<div  class="layout-more" v-if="more"><a :href="more" class="more" target="_blank">{{ $t('faq_more_text') }} >></a></div>
			</div>
			<div class="layout-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "BasicLayout",
  props: {
    title: "",
    more: ""
  }
};
</script>

<i18n>
{
	"zn": {
		"faq_more_text": "查看更多"
	} ,
	"en": {
		"faq_more_text": "more"
	}
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.basic-layout-wrap {
	background: #fff;
	border: 1px solid #e3e3e7;
	position: relative;
}

.layout-title
	position: relative

.layout-more
	position: absolute
	right: 23px;
	top: 0

.basic-layout-wrap .title {
	padding: 0 30px;
	font-size: 14px;
	color: #343739;
	line-height: 40px;
	border-bottom: 1px solid #e7eaec;
	font-size: 14px;
	color: #343739;
	line-height: 40px;
	border-bottom: 1px solid #e7eaec;
}

.layout-content {
	margin: 20px 23px;
}

.more
	font-size: 14px
</style>
