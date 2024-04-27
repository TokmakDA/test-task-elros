<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="grey-lighten-3 ">
      <v-app-bar-nav-icon icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="text-h6 font-weight-regular aling-center">
        Место проведения детально
      </v-app-bar-title>
      <v-btn
        @click="readOnlyForms = !readOnlyForms"
        variant="flat"
        :color="!readOnlyForms ? 'gray' : 'blue'"
        class="rounded-lg"
        icon
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="min-height: 300px" class="ma-3">
      <v-card class="mx-auto">
        <v-form
          ref="form"
          v-model="isValid"
          class="pa-4 pt-6"
          :readonly="readOnlyForms"
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

          <the-image :image="itemData.image" v-if="itemData.image"></the-image>
          <v-sheet v-if="!readOnlyForms">
            <v-input
              v-if="addInputImage"
              v-model="photoInput"
              success
              :rules="[rules.required]"
              append-icon="mdi-close"
              @click:append="cancelAddingPhoto"
            >
              {{
                itemData.image?.id
                  ? 'Заменить изображение'
                  : 'Добавление изображения'
              }}
            </v-input>
            <v-sheet>
              <v-btn
                v-if="!addInputImage"
                color="green"
                variant="tonal"
                type="button"
                @click="addInputImage = !addInputImage"
              >
                {{
                  itemData.image?.id
                    ? 'Заменить изображение'
                    : 'Добавление изображения'
                }}</v-btn
              >
            </v-sheet>

            <!--  Форма добавления я  -->
            <the-form-image
              v-if="addInputImage"
              ref="childComponent"
              @submit-form-image="addPhoto"
            ></the-form-image>
          </v-sheet>

          <v-sheet v-if="!readOnlyForms">
            <v-divider class="py-4"></v-divider>
            <v-sheet class="d-flex ga-4 justify-end">
              <v-btn
                variant="tonal"
                color="blue"
                @click="$router.go(-1)"
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
                Сохранить
              </v-btn>
            </v-sheet>
          </v-sheet>
        </v-form>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import type { Image } from '@/@types/images'
import { useOrganizationStore } from '@/stores/organization'
import { mapStores } from 'pinia'
import TheFormImage from '@/components/TheFormImage.vue'
import TheImage from '@/components/TheImage.vue'
import type { OrganizationRequest } from '@/@types/organization'
import { useImagesStore } from '@/stores'

export default {
  props: ['id', 'query'],

  data() {
    return {
      photoInput: null as Image | null,
      addInputImage: false,

      readOnlyForms: true,
      isValid: false,
      isLoading: false,
      photo: undefined,
      photoName: undefined,
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
      try {
        const { name, short_name, description, id } = this.itemData
        const dataItemForm = {
          name,
          short_name,
          description
        } as OrganizationRequest

        if (this.photoInput) {
          dataItemForm.image = this.photoInput.id
        }
        if (id) {
          await this.organizationStore.fetchUpdateItem(id, dataItemForm)
          this.imagesStore.$reset()
          this.cancelAddingPhoto()
        }

        this.readOnlyForms = true
      } catch (err) {
        console.log(err)
      }
    },

    redirectToPreviousPage() {
      this.$router.back()
    },

    checkReadOnlyForms() {
      const { edit } = this.query
      if (edit === 'true') {
        this.readOnlyForms = false
      } else {
        this.readOnlyForms = true
      }
    },

    async getInitialDate() {
      console.group('getInitialDate')
      const { id } = this.id
      const timeNow = Date.now()
      const item = this.organizationStore.item
      const loadTime = this.organizationStore.loadTime
      console.log('time.cache', timeNow - loadTime)
      // лимит кеша данныех, чтобы не делать лишние загрузки с сервера
      const cacheLimitTime = timeNow - loadTime > 60000
      console.log('cacheLimitTime', cacheLimitTime)
      console.log('item', item)

      if (id) {
        // сравниваем ID неявно. т.к. разные типы
        if (id != item.id || cacheLimitTime)
          await this.organizationStore.fetchItem(id)
      } else {
        this.redirectToPreviousPage()
      }
    },

    // TODO Вынести в миксины
    cancelAddingPhoto() {
      const childComponent = this.$refs.childComponent as {
        cleanFormAndImage: () => void
      }
      childComponent.cleanFormAndImage()

      this.photoInput = null
      this.addInputImage = false
    },
    addPhoto(item: Image) {
      this.photoInput = item
    }
  },

  components: { TheFormImage, TheImage },

  computed: {
    // получаем доступ к стору
    ...mapStores(useOrganizationStore, useImagesStore),

    itemData() {
      return this.organizationStore.item
    }
  },

  async mounted() {
    // Проверяем режим редактирования
    this.checkReadOnlyForms()

    await this.getInitialDate()
    console.log(this.itemData)
  }
}
</script>

<style scoped></style>
