import Vue from 'vue';
import {
  Button,
  Container,
  Header,
  Main,
  Link,
  Row,
  Col,
  Input,
  Table,
  TableColumn,
  Checkbox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Link);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Checkbox);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
