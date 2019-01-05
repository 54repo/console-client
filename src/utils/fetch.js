import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
// import qs from 'qs';

// cookie操作
function getCookie(name) {
	name += '=';
	for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
		if (!ca[i].indexOf(name))
			return ca[i].replace(name, '');
}

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {

	try {
		// 设置语言
		let language = getCookie('BASIC_LANUAGE') || 'en';
		data.language = language;

		let response = '';
		if (type == 'GET') {
			response = await axios.get(url, {
				params: data,
				headers: {
					from: 'BXC_WEB',
				},
				validateStatus: status => {
					return status < 500; // 仅当状态代码大于或等于500时拒绝             
				}
			});
		} else {
			response = await axios.post(url, data, {
				'Content-Type': 'application/json;charset=UTF-8',
				validateStatus: status => {
					return status < 500; // 仅当状态代码大于或等于500时拒绝             
				}
			});
		}

		if (response.status === 200 || response.status === 201) {
			return response.data;
		} else if (response.status === 401) {
			// Message('登录失效,将重新登陆');
			router.push({ name: 'login' });
		}

		return response.data;
	} catch (error) {
		console.log(error);
		return {};
	}
}