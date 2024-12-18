<template>
  <v-container>
    <h1>프로필</h1>
    <v-card class="mx-auto mt-5" max-width="600">
      <v-card-text>
        <div v-if="userProfile">
          <v-avatar size="150" class="mb-5">
            <v-img :src="userProfile.imageUrl" alt="Profile"></v-img>
          </v-avatar>
          <h2>{{ userProfile.name }}</h2>
          <p>{{ userProfile.email }}</p>
        </div>
        <div v-else>
          <p>프로필을 불러오는 중...</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfilePage',
  computed: {
    ...mapState(['userProfile'])
  },
  created() {
    // 프로필 데이터 로드
  }
}
</script> 