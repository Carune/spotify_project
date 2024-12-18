<template>
  <div class="spotify-player">
    <h1>Spotify Web Playback</h1>
    
    <!-- 현재 재생 중인 트랙 정보 -->
    <div v-if="currentTrack" class="track-info">
      <img :src="currentTrack.album.images[0].url" width="100" height="100">
      <h3>{{ currentTrack.name }}</h3>
      <p>{{ currentTrack.artists[0].name }}</p>
    </div>

    <!-- 재생 컨트롤 -->
    <div class="controls">
      <v-btn @click="previousTrack" :disabled="!isPlayerReady">
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-btn @click="togglePlay" :disabled="!isPlayerReady">
        <v-icon>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
      </v-btn>
      <v-btn @click="nextTrack" :disabled="!isPlayerReady">
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpotifyPlayer',
  data() {
    return {
      player: null,
      isPlayerReady: false,
      isPlaying: false,
      deviceId: null,
      currentTrack: null
    }
  },
  mounted() {
    this.initializeSpotifyPlayer()
  },
  methods: {
    initializeSpotifyPlayer() {
      // Spotify SDK 스크립트 로드
      const script = document.createElement('script')
      script.src = 'https://sdk.scdn.co/spotify-player.js'
      script.async = true
      document.body.appendChild(script)

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQAg00fpOUEvfHcDQkv7ZbyPGrf4GbOoEHKzvt4GcesyWQpLuy1w6H7rqiNj5wcBFn-vsJUx8jFda6TkPiD-p75YfLKykSj_e7xVl_3u6iAEejS-ot4Lg4V4drX9RBk9k0dP5mKBWoG8uk5wIhULebd_9QGgOy_hhKF9e2UOMWiZQ-ErJSoLAEME67VqjG3jxUVcylRfozJoBGE7IEtaNSVdIs4PbBQvUko-' // 실제 토큰으로 교체 필요
        this.player = new window.Spotify.Player({
          name: 'Vue Spotify Player',
          getOAuthToken: cb => { cb(token) },
          volume: 0.5
        })

        // 이벤트 리스너 등록
        this.player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id)
          this.deviceId = device_id
          this.isPlayerReady = true
        })

        this.player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id)
          this.isPlayerReady = false
        })

        this.player.addListener('player_state_changed', state => {
          this.isPlaying = !state.paused
          this.currentTrack = state.track_window.current_track
        })

        // 에러 핸들링
        this.player.addListener('initialization_error', ({ message }) => {
          console.error('Failed to initialize', message)
        })

        this.player.addListener('authentication_error', ({ message }) => {
          console.error('Failed to authenticate', message)
        })

        this.player.addListener('account_error', ({ message }) => {
          console.error('Failed to validate Spotify account', message)
        })

        // 플레이어 연결
        this.player.connect()
      }
    },
    togglePlay() {
      if (this.player) {
        this.player.togglePlay()
      }
    },
    async playTrack(trackUri) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({
            uris: [trackUri]
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
      } catch (error) {
        console.error('Failed to play track:', error);
      }
    },
    async playExampleTrack() {
      // Spotify 트랙 URI 예시
      const trackUri = 'spotify:track:11dFghVXANMlKmJXsNCbNl';
      await this.playTrack(trackUri);
    },
    async previousTrack() {
      if (this.player) {
        await this.player.previousTrack();
      }
    },
    async nextTrack() {
      if (this.player) {
        await this.player.nextTrack();
      }
    }
  },
  beforeUnmount() {
    // 컴포넌트 제거 시 플레이어 연결 해제
    if (this.player) {
      this.player.disconnect()
    }
  }
}
</script>

<style scoped>
.spotify-player {
  padding: 20px;
  text-align: center;
}

.track-info {
  margin-bottom: 20px;
}

.track-info img {
  border-radius: 50%;
  margin-bottom: 10px;
}

.track-info h3 {
  margin: 0;
}

.track-info p {
  margin: 0;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.controls v-btn {
  margin: 0 10px;
}
</style> 