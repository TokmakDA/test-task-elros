import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrganizationView from '../views/OrganizationView.vue'
import NewOrganizationView from '@/views/NewOrganizationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/organizations',
      props: true
    },
    {
      path: '/organization/:id',
      name: 'organization',
      component: OrganizationView,
      props: (route) => ({ query: route.query, id: route.params })
    },
    {
      path: '/organization/new',
      name: 'new',
      component: NewOrganizationView
    },
    {
      path: '/:notFound(.*)',
      redirect: '/'
    }
  ]
})

export default router
