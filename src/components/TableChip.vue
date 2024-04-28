<template>
  <v-chip :color="color">{{ isActive ? 'Да' : 'Нет' }} </v-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },

  props: ['isActive'],

  computed: {
    color() {
      return this.isActive ? 'green' : 'red'
    }
  }
})
</script>

<style scoped></style>
