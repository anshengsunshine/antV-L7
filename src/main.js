import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import L7 from '@antv/l7'
Vue.prototype.$axios = axios

Vue.prototype.$l7 = L7
new Vue({
    render: h => h(App),
}).$mount('#app')