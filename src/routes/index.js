import { createRouter , createWebHistory} from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const Register = () => import('@/pages/Register.vue')  
const Chat = () => import('@/pages/Chat.vue') 
const Login = () => import('@/pages/Login.vue')

const routes = [
    {
        path:"/",
        name:"Home",
        component: Home
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/chat",
        name: "Chat",
        component: Chat
    },
    
]

const router = createRouter({
    history: createWebHistory(), routes
})

export default router;