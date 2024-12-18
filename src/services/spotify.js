const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const CLIENT_ID = '당신의_CLIENT_ID'
const REDIRECT_URI = 'http://localhost:8080/callback'
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state'
].join(' ')

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&show_dialog=true`

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
      return initial
    }, {})
} 