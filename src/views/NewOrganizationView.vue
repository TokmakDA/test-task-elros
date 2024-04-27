<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="grey-lighten-3 ">
      <v-app-bar-nav-icon icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="text-h6 font-weight-regular aling-center">
        Добавить новую организацию
      </v-app-bar-title>
    </v-app-bar>

    <v-main style="min-height: 300px" class="ma-3">
      <v-card class="mx-auto">
        <v-form
          ref="form"
          v-model="isValid"
          class="pa-4 pt-6"
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="itemData.name"
            :rules="[rules.length(3)]"
            maxLength="100"
            color="deep-purple"
            counter="100"
            label="Полное наименование"
            style="min-height: 96px"
            type="text"
            variant="filled"
          ></v-text-field>
          <v-text-field
            v-model="itemData.short_name"
            color="deep-purple"
            :rules="[rules.length(3)]"
            maxLength="30"
            counter="30"
            label="Сокращенное название"
            type="text"
            variant="filled"
          ></v-text-field>
          <v-textarea
            v-model="itemData.description"
            color="deep-purple"
            label="Описание"
            :rules="[rules.length(3)]"
            maxLength="1000"
            counter="1000"
            rows="1"
            variant="filled"
            auto-grow
          ></v-textarea>
          <v-sheet>
            <v-divider class="py-4"></v-divider>
            <v-sheet class="d-flex ga-4 justify-end">
              <v-btn
                variant="tonal"
                color="blue"
                @click="$router.back"
                :loading="isLoading"
              >
                Назад
              </v-btn>
              <v-btn
                variant="tonal"
                color="green"
                :disabled="!isValid"
                :loading="isLoading"
                type="submit"
              >
                Добавить
              </v-btn>
            </v-sheet>
          </v-sheet>
        </v-form>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { useOrganizationStore } from '@/stores/organization'
import { mapStores } from 'pinia'

export default {
  data() {
    return {
      itemData: {
        name: '',
        short_name: '',
        description: ''
      },
      isValid: false,
      isLoading: false,
      rules: {
        length: (len: number) => (v: string) =>
          (v || '').length >= len ||
          `Invalid character length, required ${len}`,
        required: (v: string) => !!v || 'This field is required'
      }
    }
  },
  methods: {
    async submit() {
      await this.organizationStore.fetchNewItem(this.itemData)
    }
  },
  computed: {
    // получаем доступ к стору
    ...mapStores(useOrganizationStore)
  }
}
</script>

<style scoped></style>
