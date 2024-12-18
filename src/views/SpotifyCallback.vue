<template>
  <div>Authenticating...</div>
</template>

<script>
import { getTokenFromUrl } from '@/services/spotify'

export default {
  name: 'SpotifyCallback',
  created() {
    const token = getTokenFromUrl().access_token
    if (token) {
      this.$store.commit('SET_SPOTIFY_TOKEN', token)
      this.$router.push('/')
    }
  }
}
</script> 