<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="grey-lighten-3">
      <v-app-bar-nav-icon icon @click="$router.push({ path: '/' })">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-app-bar-title class="text-h6 font-weight-regular">
        Место проведения детально
      </v-app-bar-title>
      <v-spacer></v-spacer>
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
            v-model="fullName"
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
            v-model="shortName"
            color="deep-purple"
            :rules="[rules.length(3)]"
            maxLength="30"
            counter="30"
            label="Сокращенное название"
            type="text"
            variant="filled"
          ></v-text-field>
          <v-textarea
            v-model="description"
            color="deep-purple"
            label="Описание"
            :rules="[rules.length(20)]"
            maxLength="1000"
            counter="1000"
            rows="1"
            variant="filled"
            auto-grow
          ></v-textarea>
          <v-sheet>
            <v-sheet v-if="!readOnlyForms">
              <v-file-input
                :rules="rules.photo"
                accept="image/png, image/jpeg, image/bmp"
                label="Изображение"
                placeholder="Загрузить файл изображения"
                prepend-icon="mdi-camera"
                v-model="photo"
              ></v-file-input>
              <v-text-field
                label="Название Изображения"
                :rules="[rules.length(3)]"
                maxLength="50"
                counter="50"
              ></v-text-field>
            </v-sheet>
            <v-sheet>
              <v-img
                :width="500"
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img
            ></v-sheet>
          </v-sheet>

          <v-sheet v-if="!readOnlyForms">
            <v-divider class="py-4"></v-divider>
            <v-sheet class="d-flex ga-4 justify-end">
              <v-btn variant="tonal" color="blue" @click="form.reset()">
                Сброс
              </v-btn>
              <v-btn
                variant="tonal"
                color="green"
                :disabled="!isValid"
                :loading="isLoading"
                type="submit"
              >
                Submit
              </v-btn>
            </v-sheet>
          </v-sheet>
        </v-form>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
export default {
  data: () => ({
    readOnlyForms: true,
    agreement: false,
    description:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
    email: undefined,
    isValid: false,
    isLoading: false,
    fullName: undefined,
    shortName: undefined,
    photo: undefined,
    rules: {
      email: (v) => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: (len) => (v) =>
        (v || '').length >= len || `Invalid character length, required ${len}`,
      required: (v) => !!v || 'This field is required',
      photo: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            'Avatar size should be less than 2 MB!'
          )
        }
      ]
    }
  }),
  methods: {
    async submit() {
      console.log(this.photo)

      let formData = new FormData()
      formData.append('file', this.photo)
      console.log(formData)
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
}
</script>

<style scoped></style>
