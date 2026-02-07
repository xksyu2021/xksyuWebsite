import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

type NavList = RouteRecordRaw & {
    icon: string,show: boolean
}

export const navList:NavList[] = [
    {show:true, path:'/',component:Home,name:"主页",icon:"bi bi-house-door-fill"},
    {show:true,path:'/project',component: () => import('@/views/Project.vue'),name:"项目",icon:"bi bi-code-square"},
    {show:true,path:'/post',component: () => import('@/views/Article.vue'),name:"文章",icon:"bi bi-file-earmark-text"},
    {show:true,path:'/tool',component: () => import('@/views/Tool.vue'),name:"工具",icon:"bi bi-magic"},
    {show:true,path:'/git',component: () => import('@/views/Git.vue'),name:"Git",icon:"bi bi-git"},
    {show:false,path:'/post/:id',component: () => import('@/assets/components/Article/DetailPage.vue'),name:"",icon:""}
]

const router = createRouter({
    history: createWebHistory(),
    routes: navList
})

export default router