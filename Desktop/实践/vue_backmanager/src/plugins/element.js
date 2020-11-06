import Vue from 'vue'
//中间有个横杠的组件  去掉后需要首字母大写
import {
    Button, Form, FormItem, Input, Message, container, header, aside, main,
    menu, submenu, MenuItem, breadcrumb, BreadcrumbItem, card, Row, Col
} from 'element-ui'

//全局注册
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(container)
Vue.use(header)
Vue.use(aside)
Vue.use(main)

Vue.use(menu)
Vue.use(submenu)
Vue.use(MenuItem)

Vue.use(breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(card)

Vue.use(Row)
Vue.use(Col)


//需要挂载到组件原型上面 这样才可以在全剧中使用
Vue.prototype.$message = Message;

