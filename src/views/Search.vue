<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="노래, 아티스트 또는 앨범 검색"
      prepend-inner-icon="mdi-magnify"
      @input="debounceSearch"
    ></v-text-field>

    <v-row v-if="searchResults.length">
      <v-col v-for="track in searchResults" :key="track.id" cols="12">
        <v-card @click="playTrack(track)">
          <v-list-item three-line>
            <v-list-item-avatar>
              <v-img :src="track.album.imageUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ track.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ track.artist }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  name: 'SearchPage',
  data: () => ({
    searchQuery: ''
  }),
  computed: {
    ...mapState(['searchResults'])
  },
  methods: {
    debounceSearch: debounce(function() {
      if (this.searchQuery) {
        this.$store.dispatch('searchTracks', this.searchQuery)
      }
    }, 300),
    playTrack(track) {
      this.$store.commit('SET_CURRENT_TRACK', track)
      this.$store.commit('SET_PLAYING', true)
    }
  }
}
</script> 