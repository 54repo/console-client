import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
import qs from 'qs';

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {

	try {
		let response = '';
		if (type == 'GET') {
			response = await axios.get(url, {
				params: data,
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

		console.log(response);
		if (response.status === 200 || response.status === 201) {
			return response.data;
		} else if (response.status === 401) {
			Message('登陆失效,将重新登陆');
			router.push({ name: 'login' });
		}
		// else if (response.status) {
		// 	return response.data;
		// } else {
		// 	Message(response.data.message || 'network error');
		// }
		
		return response.data;
	} catch (error) {
		console.log(error);
		return {};
	}
}