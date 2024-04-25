<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="grey-lighten-3" title="Список Огранизаций">
      <v-btn
        prepend-icon="mdi-plus"
        @click="console.log('CLik')"
        variant="flat"
        color="green"
        class="rounded-lg"
      >
        Добавить
      </v-btn>
    </v-app-bar>

    <v-main style="min-height: 300px">
      <TheTable />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import TheTable from '@/components/TheTable.vue'

// export default {
//   components: {
//
//   }
// }
</script>
