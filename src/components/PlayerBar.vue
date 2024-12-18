<template>
  <v-sheet class="player-bar" elevation="4">
    <v-row no-gutters align="center">
      <!-- 현재 재생 중인 트랙 정보 -->
      <v-col cols="3">
        <v-list-item v-if="currentTrack">
          <v-list-item-avatar>
            <v-img :src="currentTrack.album?.imageUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-truncate">{{ currentTrack.name }}</v-list-item-title>
            <v-list-item-subtitle class="text-truncate">{{ currentTrack.artist }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <!-- 재생 컨트롤 -->
      <v-col cols="6" class="text-center">
        <v-btn icon @click="previous">
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn icon large class="mx-4" @click="togglePlay">
          <v-icon size="32">{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
        </v-btn>
        <v-btn icon @click="next">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
        
        <!-- 진행 바 -->
        <v-slider
          v-model="progress"
          class="mt-4"
          hide-details
          @change="seek"
        ></v-slider>
      </v-col>

      <!-- 볼륨 컨트롤 -->
      <v-col cols="3" class="text-right pr-4">
        <v-btn icon @click="toggleMute">
          <v-icon>{{ volume === 0 ? 'mdi-volume-off' : 'mdi-volume-high' }}</v-icon>
        </v-btn>
        <v-slider
          v-model="volume"
          class="d-inline-block volume-slider"
          hide-details
          max="100"
          width="100"
        ></v-slider>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayerBar',
  data: () => ({
    progress: 0,
    volume: 50,
    previousVolume: 50
  }),
  computed: {
    ...mapState(['currentTrack', 'isPlaying'])
  },
  methods: {
    togglePlay() {
      this.$store.commit('SET_PLAYING', !this.isPlaying)
    },
    previous() {
      // 이전 트랙 재생 로직
      console.log('Previous track')
    },
    next() {
      // 다음 트랙 재생 로직
      console.log('Next track')
    },
    seek(value) {
      // 재생 위치 이동 로직
      this.progress = value
    },
    toggleMute() {
      if (this.volume > 0) {
        this.previousVolume = this.volume
        this.volume = 0
      } else {
        this.volume = this.previousVolume
      }
    }
  }
}
</script>

<style scoped>
.player-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  padding: 10px;
  background-color: #282828;
  color: white;
}

.volume-slider {
  max-width: 100px;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 