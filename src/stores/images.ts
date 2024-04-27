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
      // сбросить

      newImage.value = {} as Image
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    newImage,
    isLoading,
    loadTime,
    fetchAddImage,
    fetchDeleteImage
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImagesStore, import.meta.hot))
}
