// The Vue build version to load with the `import` command
import Vue from 'vue'
import axios from 'axios'
import app from './app.vue'
import router from './config/routers.js'
import store from '@/store'
import progressbar from "vue-progressbar";
import elementui from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import './asset/css/bulma.min.css'
import './asset/font/icomoon/css/icomoon.css'

Vue.config.productionTip = false
Vue.use(elementui)
Vue.use(progressbar, {
  color: '#eeeeee',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})

new Vue({
  el: '#app',
  router,
  store,
  components: { app },
  template: '<app/>'
})


String.prototype.format = function () {
  if (arguments.length == 0) {
    return this;
  }
  // 使用正则表达式，循环替换占位符数据
  for (var result = this, i = 0; i < arguments.length; i++) {
    result = result.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return result;
  }
}
