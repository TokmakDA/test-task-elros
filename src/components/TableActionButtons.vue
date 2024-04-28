<template>
  <v-icon
    class="me-2"
    size="small"
    @click.stop="$emit(`editItem`, item)"
    color="blue"
    name="Изменить"
  >
    mdi-pencil
  </v-icon>
  <v-icon
    size="small"
    @click.stop="$emit(`deleteItem`, item)"
    color="red"
    name="Удалить"
  >
    mdi-delete
  </v-icon>
</template>

<script setup lang="ts">
defineProps(['item'])
defineEmits(['editItem', 'deleteItem'])
</script>

<style lang="scss" scoped></style>
