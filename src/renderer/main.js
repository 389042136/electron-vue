import Vue from 'vue';
import App from './App';
import { ipcRenderer } from 'electron';
import 'element-ui/lib/theme-chalk/index.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
window.oncontextmenu = () => false;

// 读取配置信息
Vue.prototype.$config = ipcRenderer.sendSync('getConfig');

Vue.config.productionTip = false;
new Vue({
	components: { App },
	template: '<App/>'
}).$mount('#app')
