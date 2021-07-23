import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

import * as filters from './plugins/filters.js'
Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])//插入过滤器名和对应方法
})

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
