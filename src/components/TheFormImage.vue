<template>
  <v-sheet>
    <v-sheet>
      <v-form @submit.prevent="submit" v-model="isValid" ref="formImage">
        <v-sheet v-if="!newImage.id">
          <v-file-input
            :rules="[rules.photo, rules.required]"
            accept="image/png, image/jpeg, image/bmp"
            label="Изображение"
            placeholder="Загрузить файл изображения"
            prepend-icon="mdi-camera"
            v-model="formInputs.image"
          ></v-file-input>
          <v-text-field
            ref="inputTitle"
            label="Название Изображения"
            :rules="[rules.length(3)]"
            v-model="formInputs.title"
            maxLength="50"
            counter="50"
          ></v-text-field>
        </v-sheet>
        <v-sheet class="d-flex justify-space-between">
          <v-btn
            color="red-lighten-5"
            append-icon="mdi-close"
            :loading="isLoading"
            @click="cleanFormAndImage"
          >
            Очистить
          </v-btn>
          <v-btn
            append-icon="mdi-upload"
            type="submit"
            :disabled="disabledВownload"
            :loading="isLoading"
            >{{ newImage.id ? 'Загружено' : 'Загрузить' }}</v-btn
          >
        </v-sheet>
      </v-form>
    </v-sheet>
    <v-sheet
      :max-width="900"
      width="fill-content"
      class="ma-auto"
      v-if="newImage"
    >
      <v-img
        aspect-ratio="16/9"
        :max-width="900"
        width="fill-content"
        :alt="newImage.title || 'нет названия'"
        cover
        :src="newImage.image"
        :lazy-src="newImage.thumbnail"
      ></v-img>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useImagesStore } from '@/stores'
import { mapStores } from 'pinia'
export default defineComponent({
  setup() {
    return {}
  },
  props: [],
  emits: ['submit-form-image'],
  data() {
    return {
      isValid: false,
      formInputs: {
        image: undefined,
        title: undefined
      } as Record<string, any>,
      rules: {
        length: (len: number) => (v: string) =>
          (v || '').length >= len ||
          `Invalid character length, required ${len}`,
        required: (v: boolean) => !!v || 'This field is required',
        photo: (value: any) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            'Avatar size should be less than 2 MB!'
          )
        }
      }
    }
  },

  methods: {
    ressetForm() {
      this.formInputs = {
        image: undefined,
        title: ''
      }
      if (!this.newImage) {
        ;(this.$refs.inputTitle as HTMLFormElement).reset()
        ;(this.$refs.inputTitle as HTMLFormElement).resetValidation()
      }
    },

    async cleanFormAndImage() {
      const { id } = this.newImage
      this.ressetForm()
      if (id) {
        await this.imagesStore.fetchDeleteImage(id)
      }
    },

    async submit() {
      let formData = new FormData()

      Object.keys(this.formInputs).map((key) => {
        formData.append(key, this.formInputs[key])
      })

      await this.imagesStore.fetchAddImage(formData)
      // this.newImage = this.imagesStore.newImage
      console.log(this.newImage)
      this.ressetForm
      this.$emit('submit-form-image', this.newImage)
    }
  },
  computed: {
    // получаем доступ к стору
    ...mapStores(useImagesStore),
    isLoading() {
      return this.imagesStore.isLoading
    },
    newImage() {
      return this.imagesStore.newImage
    },

    disabledВownload() {
      return this.newImage.id ? true : !this.isValid
    }
  }
})
</script>

<style scoped></style>
