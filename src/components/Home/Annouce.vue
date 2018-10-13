<template>
	<div class="Annouce">
		<div class="annouce">
			<div class="title">
				<div>{{ $t('local_annouce_title') }}</div> 
				<a href="https://bonuscloud.gitbook.io/help" target="_blank"><div class="more bonus-cursor">{{ $t('annouce_more')}} >></div></a>
			</div>
			<div class="annouce-content">
				<el-table
					max-height="150"
					:data="tableData"
					style="width: 100%">
					<el-table-column
					class-name="data"
					prop="date"
					height="40px"
					width="90px">
					</el-table-column>
					<el-table-column
						class-name="detail-more"
						height="40px">
						<template slot-scope="scope">
							<a  target="_blank" :href="scope.row.link" >
								<span >{{scope.row.content}}</span>
							</a>
						</template>
					</el-table-column>
				</el-table>
			</div> 
		</div> 
  </div>
</template>

<i18n>
{
  "en": {
		"annouce_more": "more"
  },
  "zn": {
		"annouce_more": "查看更多"
  }
}
</i18n>

<script>
export default {
	name: "Annouce",
	computed: {
    // 计算属性的 getter
    tableData: function () {
			// `this` 指向 vm 实例
			let tableData = Object.values(this.$t('local_annouce'));
      return tableData;
    }
  }
};
</script>

// 公告展示内容
<i18n>
{
  "en": {
		"local_annouce_title": "Annoucement",
    "local_annouce": [{
        "date": "2018.10.10",
				"content": "BonusCloud White Paper",
				"link": "https://bonuscloud.gitbook.io/help/bonuscloud-whitepaper-v-1.1-2018"
      }, {
        "date": "2018.10.10",
				"content": "BonusCloud Lite Node Tutorial",
				"link": "http://www.right.com.cn/forum/forum-183-1.html"
      }, {
        "date": "2018.10.10",
				"content": "Device Support List Of Lite Node",
				"link": "https://bonuscloud.gitbook.io/help/device-support-list-of-lite-node"				
      }]
  },
  "zn": {
		"local_annouce_title": "公告",

    "local_annouce": [{
        "date": "2018.10.10",
				"content": "BonusCloud 白皮书",
				"link": "https://bonuscloud.gitbook.io/help/bonuscloud-bai-pi-shu-v1.0"
      }, {
        "date": "2018.10.10",
				"content": "BonusCloud Lite节点接入教程",
				"link": "http://www.right.com.cn/forum/forum-183-1.html"
      }, {
        "date": "2018.10.10",
				"content": "Lite 节点设备支持列表",
				"link": "https://bonuscloud.gitbook.io/help/lite-jie-dian-she-bei-zhi-chi-lie-biao"				
      }]
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.annouce .el-table__header-wrapper {
	display: none;
}

.annouce .el-table th {
	padding: 5px 0;
	font-sice: 12px;
}

.el-table .el-table__body td {
	font-sice: 12px;
}

.annouce td {
	padding: 5px 0;
}

.detail-more .cell {
	text-align: left;
}

.annouce-content .data {
	font-size: 14px;
	color: #96999B;
	line-height: 23px;
}

.annouce-content .cell {
	font-size: 12px;
}

.annouce-content .data .cell {
	text-align: left;
	font-size: 12px;
}

a {
	color: #96999b;
}
</style>
