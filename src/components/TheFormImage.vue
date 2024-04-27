<template>
  <v-sheet>
    <v-sheet>
      <v-form @submit.prevent="submit">
        <v-file-input
          :rules="rules.photo"
          accept="image/png, image/jpeg, image/bmp"
          label="Изображение"
          placeholder="Загрузить файл изображения"
          prepend-icon="mdi-camera"
          v-model="formInputs.file"
        ></v-file-input>
        <v-text-field
          label="Название Изображения"
          :rules="[rules.length(3)]"
          v-model="formInputs.title"
          maxLength="50"
          counter="50"
        ></v-text-field>
      </v-form>
    </v-sheet>
    <!-- <v-sheet
      :max-width="900"
      width="fill-content"
      class="ma-auto"
      v-if="itemData.image"
    >
      <v-img
        aspect-ratio="16/9"
        :max-width="900"
        width="fill-content"
        :alt="itemData.image.title || 'нет названия'"
        cover
        :src="itemData.image.image"
        :lazy-src="itemData.image.thumbnail"
      ></v-img>
    </v-sheet> -->
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { SubmitEventPromise } from 'vuetify'

export default defineComponent({
  setup() {
    return {}
  },
  props: [],
  emits: [],
  data() {
    return {
      loading: false,
      formInputs: {
        file: undefined,
        title: ''
      },
      rules: {
        length: (len: number) => (v: string) =>
          (v || '').length >= len ||
          `Invalid character length, required ${len}`,
        required: (v: boolean) => !!v || 'This field is required',
        photo: [
          (value: any) => {
            return (
              !value ||
              !value.length ||
              value[0].size < 2000000 ||
              'Avatar size should be less than 2 MB!'
            )
          }
        ]
      }
    }
  },
  methods: {
    async submit(event: SubmitEventPromise) {
      this.loading = true

      const results = await event

      this.loading = false

      alert(JSON.stringify(results, null, 2))

      // console.log(this.photo)

      // let formData = new FormData()
      // formData.append('file', this.photo)
      // formData.append('title', this.photoName)
      // console.log(formData)
      // axios
      //   .post('/single-file', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      //   .then(function () {
      //     console.log('SUCCESS!!')
      //   })
      //   .catch(function () {
      //     console.log('FAILURE!!')
      //   })
    }
  }
})
</script>

<style scoped></style>
