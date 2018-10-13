
/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

// let baseUrl = 'http://localhost:8000'; 
let baseUrl = 'http://203.76.212.73:7001'; 
let routerMode = 'hash';
let imgBaseUrl = '';
let apiUrl = '';

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://localhost:8000';
    imgBaseUrl = '/img/';
}else if(process.env.NODE_ENV == 'production'){
	apiUrl = 'http://203.76.212.73:7001'; 
	baseUrl = '';
    imgBaseUrl = '';
} 

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
