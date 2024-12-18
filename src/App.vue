<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item to="/" link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>홈</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/search" link>
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-title>검색</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/profile" link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>프로필</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app class="pa-0">
      <player-bar v-if="currentTrack"></player-bar>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import PlayerBar from '@/components/PlayerBar.vue'

export default {
  name: 'App',
  components: {
    PlayerBar
  },
  computed: {
    ...mapState(['currentTrack'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
