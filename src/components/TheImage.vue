<template>
  <v-sheet :max-width="700" width="fill-content" class="ma-auto pa-4">
    <v-img
      aspect-ratio="16/9"
      :max-width="700"
      width="fill-content"
      :alt="image.title || 'нет названия'"
      cover
      :src="image.image"
      :lazy-src="image.thumbnail"
    ></v-img>
  </v-sheet>
</template>

<script lang="ts">
export default {
  props: ['image'],
  mounted() {
    console.log(this.image)
  }
}
</script>

<style lang="scss" scoped></style>
