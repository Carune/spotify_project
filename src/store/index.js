import { createStore } from 'vuex'
import api from '@/api'

export default createStore({
  state: {
    currentTrack: null,
    isPlaying: false,
    playlists: [],
    searchResults: [],
    userProfile: null,
    spotifyToken: null
  },
  
  mutations: {
    SET_CURRENT_TRACK(state, track) {
      state.currentTrack = track
    },
    SET_PLAYING(state, status) {
      state.isPlaying = status
    },
    SET_PLAYLISTS(state, playlists) {
      state.playlists = playlists
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results
    },
    SET_USER_PROFILE(state, profile) {
      state.userProfile = profile
    },
    SET_SPOTIFY_TOKEN(state, token) {
      state.spotifyToken = token
    }
  },
  
  actions: {
    async searchTracks({ commit }, query) {
      try {
        const response = await api.get(`/search?q=${query}`)
        commit('SET_SEARCH_RESULTS', response.data)
      } catch (error) {
        console.error('검색 중 오류 발생:', error)
      }
    },
    
    async fetchUserPlaylists({ commit }) {
      try {
        const response = await api.get('/playlists')
        commit('SET_PLAYLISTS', response.data)
      } catch (error) {
        console.error('플레이리스트 로딩 중 오류 발생:', error)
      }
    },
    
    async initializeSpotify({ commit }) {
      try {
        const token = 'BQAg00fpOUEvfHcDQkv7ZbyPGrf4GbOoEHKzvt4GcesyWQpLuy1w6H7rqiNj5wcBFn-vsJUx8jFda6TkPiD-p75YfLKykSj_e7xVl_3u6iAEejS-ot4Lg4V4drX9RBk9k0dP5mKBWoG8uk5wIhULebd_9QGgOy_hhKF9e2UOMWiZQ-ErJSoLAEME67VqjG3jxUVcylRfozJoBGE7IEtaNSVdIs4PbBQvUko-'
        commit('SET_SPOTIFY_TOKEN', token)
      } catch (error) {
        console.error('Spotify 초기화 중 오류 발생:', error)
      }
    }
  }
}) 