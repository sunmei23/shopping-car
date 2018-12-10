// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import './common/less/index.less'
import star from './components/star/star'
import shoppingCart from './components/shoppingcart/shoppingcart'
import calFood from './components/calfood/calfood'
import 'animate.css'
import Moment from 'moment'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false;
Vue.prototype.axios = Axios;
Vue.prototype.moment = Moment;
Vue.component('star', star);
Vue.component('shoppingCart', shoppingCart);
Vue.component('calFood', calFood);
Vue.filter('timeFilter', function (time) {
   return Moment(time).format("YYYY-MM-DD HH:mm");
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
