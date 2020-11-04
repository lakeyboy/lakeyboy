import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//需要挂载到组件原型上面 这样才可以在全剧中使用
Vue.prototype.$message = Message;

