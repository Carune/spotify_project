<template>
  <v-container>
    <!-- Spotify 로그인이 안 된 경우 -->
    <div v-if="!spotifyToken">
      <h1>Spotify에 로그인하세요</h1>
      <spotify-login></spotify-login>
    </div>

    <!-- 로그인 된 경우 -->
    <div v-else>
      <h1>추천 음악</h1>
      <spotify-player class="mb-6"></spotify-player>
      
      <v-row>
        <v-col v-for="playlist in playlists" :key="playlist.id" cols="12" sm="6" md="4">
          <v-card @click="openPlaylist(playlist.id)">
            <v-img :src="playlist.imageUrl" height="200"></v-img>
            <v-card-title>{{ playlist.name }}</v-card-title>
            <v-card-subtitle>{{ playlist.description }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SpotifyPlayer from '@/components/SpotifyPlayer.vue'
import SpotifyLogin from '@/components/SpotifyLogin.vue'

export default {
  name: 'HomePage',
  components: {
    SpotifyPlayer,
    SpotifyLogin
  },
  computed: {
    ...mapState(['playlists', 'spotifyToken'])
  },
  methods: {
    openPlaylist(id) {
      this.$router.push(`/playlist/${id}`)
    }
  },
  created() {
    if (this.spotifyToken) {
      this.$store.dispatch('fetchUserPlaylists')
    }
  }
}
</script> 