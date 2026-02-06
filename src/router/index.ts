import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

type NavList = RouteRecordRaw & {
    icon: string
}

export const navList:NavList[] = [
    {path:'/',component:Home,name:"主页",icon:"bi bi-house-door-fill"},
    {path:'/project',component: () => import('@/views/Project.vue'),name:"项目",icon:"bi bi-code-square"},
    {path:'/article',component: () => import('@/views/Article.vue'),name:"文章",icon:"bi bi-file-earmark-text"},
    {path:'/tool',component: () => import('@/views/Tool.vue'),name:"工具",icon:"bi bi-magic"},
    {path:'/git',component: () => import('@/views/Git.vue'),name:"Git",icon:"bi bi-git"}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: navList
})

export default router