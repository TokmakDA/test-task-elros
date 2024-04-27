import type { Image } from '@/@types/images'
import { imagesService } from '@/api'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useImagesStore = defineStore('images', () => {
  const loadTime = ref(Date.now())
  const isLoading = ref(false)

  const newImage = ref({} as Image)

  async function fetchAddImage(formData: FormData) {
    isLoading.value = true
    try {
      const res = await imagesService.postImage(formData)

      console.log(res)
      newImage.value = res.data
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchDeleteImage(id: string | number) {
    isLoading.value = true
    try {
      await imagesService.fetchDelete(id)
      newImage.value = {} as Image
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const $reset = () => {
    newImage.value = {} as Image
    isLoading.value = false
  }

  return {
    newImage,
    isLoading,
    loadTime,
    fetchAddImage,
    fetchDeleteImage,
    $reset
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImagesStore, import.meta.hot))
}
