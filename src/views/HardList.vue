<template>
  <div class="home">
		<AccountSetLayout layoutType="HARDLIST" :layoutTitile="$t('layoutTitile')">
			<BasiceLayout :title="$t('hardListLayoutTitile')">
				<div class="hardware-content">
					<el-table
						:data="hardList"
						align="left"
						empty-text="empty hardList"
						style="width: 100%">
						<el-table-column
							prop="mac_address"
							:label="$t('macAddress')">
						</el-table-column>
						<el-table-column
							prop="bind_at"
							:label="$t('date')">
						</el-table-column>
						<el-table-column
							prop="bcode"
							:label="$t('code')">
						</el-table-column>
							<el-table-column
							label="">
							<template slot-scope="scope">
								<div 
									type="danger"
									 @click="checkUnBind(scope.row.id)" 
									 :deviceId="scope.row.id"
									 class="unbind-button bonus-cursor">解绑</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
    	</BasiceLayout>	
			<!-- <UnBindDialog v-if="showUnbindDialog" :id="unbindId"></UnBindDialog> -->
		</AccountSetLayout>  
		<el-dialog
			title="Confirm Unbinding"
			:visible.sync="showUnbindDialog"
			width="480px"
			center>
			<div class="unbind-dialog-wrap">
				<span class="key">Image Verfication Code</span>
				<ImageCode
					imageStyle="unbind-style"
					type="text"
					v-model="inputImageCode"
					class="unbind-input forget-code"></ImageCode>
			</div>
			<div class="unbind-dialog-wrap">
				<span  class="key">Email Verfication Code</span>
				<SendEmailCode
					type="text"
					imageStyle="unbind-style"
					class="unbind-input password-email"
					v-model="inputEmailCode"
					needImageCode=true
					:imageCode="inputImageCode"
					:email="email"
					@emailCodeTip="emailCodeTip"></SendEmailCode>
			</div>
			<span slot="footer" class="dialog-footer">
				<div class="sure-unbind button" @click="showUnbindDialog = false">取 消</div>
				<div class="sure-unbind button" type="primary" @click="unbind">确 定</div>
			</span>
		</el-dialog>
  </div>
</template>

<i18n>
{
  "en": {
		"layoutTitile": "Hardware List",
		"hardListLayoutTitile": "Hardware List",
		"macAddress": "MAC Address",
		"date": " The Binding Date(UTC)",
		"code": "Binding BonusCode",
		"totalTime": "Total Online Time"
  },
  "zn": {
		"layoutTitile": "硬件列表",
		"hardListLayoutTitile": "硬件列表",
		"macAddress": "硬件MAC地址",                                                                    
		"date": "绑定日期(UTC)",
		"code": "已绑定激活码 ",
		"totalTime": "累计在线时长"
  }
}
</i18n>


<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from "vuex";
import BasiceLayout from "@/components/Common/BasicLayout.vue";
import AccountSetLayout from "@/components/AccountSet/AccountSetLayout.vue";
// import UnBindDialog from "@/components/AccountSet/HardList/UnBindDialog.vue";
import ImageCode from "@/components/ImageCode.vue";
import SendEmailCode from "@/components/SendEmailCode.vue";
import moment from "moment";
import { Message } from "element-ui";

export default {
  name: "home",
  components: {
    BasiceLayout,
    AccountSetLayout,
    ImageCode,
    SendEmailCode
  },
  data() {
    return {
      unbindId: "", //解绑Id
      showUnbindDialog: false, // 绑定弹框展示
      inputEmailCode: "", //输入的邮件码
      inputImageCode: "" // 图片验证码
    };
  },
  computed: mapState({
    hardList(state) {
      if (state.hardList.length > 0) {
        let hardList = state.hardList;
        hardList.map(val => {
          val.bind_at = moment().format("YYYY.MM.DD");
        });
        return hardList;
      } else {
        return [];
      }
    },
    // 验证码地址
    // imageCodeSrc: state => state.signUp.imageCodeSrc,
    email: state => state.account.email
  }),
  methods: {
    ...mapActions(["getHardList", "unbindHard"]),
    change() {
      console.log(this.oldPw);
      this.changePw({
        oldPassword: this.oldPw,
        newPassword: this.newPw,
        reNewPassword: this.newSecPw
      });
    },
    checkUnBind(id) {
      this.showUnbindDialog = true;
      this.unbindId = id;
      console.log(id);
    },
    emailCodeTip(tip) {
      console.log(tip);
    },
    // 解绑
    unbind() {
      this.unbindHard({
        deviceId: this.unbindId,
        emailVerifyCode: this.inputEmailCode
      }).then(res => {
        if (res.message === "unregister success") {
          // 刷新硬件列表
          this.getHardList();
          this.showUnbindDialog = false;
          Message({
            type: "success",
            message: res.message
          });
        } else {
          Message({
            type: "error",
            message: res.message || "unbind error"
          });
        }
        console.log(res);
      });
    },
    // email错误提示
    emailCodeTip(error) {
      if (error.message) {
        Message({
          type: "error",
          message: error.message
        });
        console.log(error);
      }
    }
  },

  created() {
    this.getHardList();
  }
};
</script>

<style lang="stylus">
.hardList-content {
	margin-top: 40px;
}

.unbind-button {
	background: #f56c6c;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #fff;
	text-align: center;
	line-height: 30px;
	width: 90px;
	height: 35px;
}

.unbind-dialog-wrap .key {
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #343739;
	text-align: left;
	line-height: 42px;
	display: inline-block;
	width: 250px;
}

.unbind-dialog-wrap {
	display: flex;
	height: 42px;
	margin-bottom: 20px;
}

.unbind-input {
	width: 100%;
}

.unbind-dialog-wrap input.basic-input {
	height: 42px;
}

.button {
	background-image: -webkit-gradient(linear, left top, left bottom, color-stop(2%, #15bcad), to(#10b2cb));
	background-image: linear-gradient(-180deg, #15bcad 2%, #10b2cb 100%);
	font-size: 14px;
	color: #fff;
	text-align: center;
	line-height: 18px;
	border-radius: 0;
	border: 0;
	display: inline-block;
	width: 90px;
	height: 35px;
	line-height: 35px;
	margin-left: 20px;
}
</style>

