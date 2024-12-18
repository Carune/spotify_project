import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import SearchPage from '@/views/Search.vue'
import PlaylistPage from '@/views/Playlist.vue'
import ProfilePage from '@/views/Profile.vue'
import SpotifyCallback from '@/views/SpotifyCallback.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: PlaylistPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/callback',
    name: 'SpotifyCallback',
    component: SpotifyCallback
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 