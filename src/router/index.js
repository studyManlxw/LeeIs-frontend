import Vue from 'vue'
import router from 'vue-router'
import HomeView from '../view/HomeView'
import AboutView from '@/view/AboutView'
import Box from "@/view/Box.vue";
import Person from "@/view/Person.vue";
import OrderSuccess from "@/view/OrderSuccess.vue";
import OrderList from "@/view/children/OrderList.vue";
import Test from "@/view/Test.vue";

Vue.use(router)
export default new router({
    routes: [
        {
            path:'/',
            redirect:'/home'
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/box',
            name: 'box',
            component: Box,
        },
        {
            path: '/person',
            name: 'person',
            component: Person,
            children:[

            ]
        },
        {
            path:'/success',
            name:'success',
            component: OrderSuccess
        },
        {
            path:'/orderList',
            name:'orderList',
            component:OrderList
        },
        {
            path:'/test',
            name:'test',
            component:Test
        }
    ]
})
