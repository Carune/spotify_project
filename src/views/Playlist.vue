<template>
  <v-container>
    <h1>플레이리스트</h1>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <p>플레이리스트 ID: {{ $route.params.id }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PlaylistPage'
}
</script> 