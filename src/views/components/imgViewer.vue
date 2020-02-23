<template>
  <v-card>
    <v-img
      :src="url"
      max-height="500"
      contain
      class="grey darken-4"
    >
    </v-img>
  </v-card>
</template>

<script>
export default {
  props:['url']
}
</script>