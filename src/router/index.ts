import { createRouter, createWebHistory } from 'vue-router'
import WorldMap from "@/components/WorldMap.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WorldMap
    },
  ]
})

export default router
