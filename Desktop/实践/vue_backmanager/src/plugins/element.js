import Vue from 'vue'
//中间有个横杠的组件  去掉后需要首字母大写
import {
    Button, Form, FormItem, Input, Message, Container, Header, Aside, Main,
    Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn,
    Switch, Tooltip, Pagination
} from 'element-ui'

//全局注册
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Card)

Vue.use(Row)
Vue.use(Col)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Switch)
Vue.use(Tooltip)

Vue.use(Pagination)

//需要挂载到组件原型上面 这样才可以在全剧中使用
Vue.prototype.$message = Message;

