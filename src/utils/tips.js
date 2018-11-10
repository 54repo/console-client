/**
 * 统一处理错误码
 */
'use strict';
const ERROR = 'error';

const CONFIG = {
	over_withdrawal_amount: {
		type: ERROR,
		en: " The single minimum withdrawal amount is 5000 BxC, and the maximum withdrawal amount is 10000BxC, which can only be withdrawn once every 24 hours.",
		zn: "单次最小提现数量为 5000 BxC，最大提现数量为10000BxC，每24小时只能提现一次。"
	},
	RELOAD_THE_PAGE: {
		type: ERROR,
		zn: '刷新一下',
		en: 'reload the page'
	},
	amount_error: {
		type: ERROR,
		zn: '提现数量错误',
		en: 'amount error'
	},
	password_error: {
		type: ERROR,
		zn: '密码错误',
		en: 'password error'
	},
	limit_email_code: {
		type: ERROR,
		zn: '缺少邮箱验证码',
		en: 'limit email code'
	},
};

import { Message } from 'element-ui'


let messageTips = (type, locals) => {
	let tips = CONFIG[type] || CONFIG.RELOAD_THE_PAGE
	tips.message = tips[locals] || tips.en;

	Message(tips);
};

export {
	messageTips
};


