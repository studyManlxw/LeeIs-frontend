import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from './router/index'
import less from 'less'
import 'vant/lib/index.less';
import { Dialog } from 'vant';
import 'amfe-flexible';
import './assets/icon/iconfont.css'
import './assets/font/font.css'
import './assets/global/global.css'
import Audio from './utils/audio'

const bus = new Vue()
Vue.prototype.$bus = bus
Vue.use(Audio);
Vue.config.productionTip = false
Vue.use(less)
Vue.use(Vant)
Vue.use(Dialog)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
