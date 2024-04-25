<template>
  <v-dialog max-width="500px">
    <v-card class="rounded-lg">
      <v-card-title class="text-h5 text-center">{{ title }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="colorClose"
          variant="flat"
          class="rounded-lg"
          @click="$emit('close')"
          >Нет</v-btn
        >
        <v-btn
          :color="confirmColor"
          variant="flat"
          class="rounded-lg"
          @click="$emit('confirm')"
          >Да</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String,
    typeDialog: {
      type: String,
      default: 'danger',
      validator(value: string) {
        return ['', 'primary', 'danger'].includes(value)
      }
    }
  },
  emits: ['close', 'confirm'],

  computed: {
    colorClose() {
      let color = ''
      switch (this.typeDialog) {
        case 'primary':
          color = 'red'
          break
        case 'danger':
          color = 'blue'
          break
        default:
          color = 'grey-lighten-3'
          break
      }
      return color
    },
    confirmColor() {
      let color = ''
      switch (this.typeDialog) {
        case 'primary':
          color = 'blue'
          break
        case 'danger':
          color = 'red'
          break
        default:
          color = 'grey-lighten-3'
          break
      }
      return color
    }
  }
})
</script>

<style scoped></style>
