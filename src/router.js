import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Album from './components/Album.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/album/:id',
      name: 'album',
      props: true,
      component: Album
    }
  ],
  scrollBehavior (to, from) {
    return { x: 0, y: 0 }
  }
})
