<template>
  <div class="login">
    <v-btn color="green" @click="login">
      Login with Spotify
    </v-btn>
  </div>
</template>

<script>
import { loginUrl } from '@/services/spotify'

export default {
  name: 'SpotifyLogin',
  methods: {
    login() {
      window.location.href = loginUrl
    }
  }
}
</script> 