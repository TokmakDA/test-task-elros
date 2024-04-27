import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { OrganizationSevice } from '@/api/organizationService'
import type { Organization } from '@/@types/organization'

export const useOrganizationStore = defineStore('organization', () => {
  const router = useRouter()

  const item = ref({
    id: 0,
    name: '',
    short_name: '',
    description: '',
    is_active: false,
    image: null
  } as Organization)
  const hasChanged = ref(false)
  const loadTime = ref(Date.now())
  const isLoading = ref(false)

  const setTimeLoad = () => {
    loadTime.value = Date.now()
  }

  async function fetchItem(id: number | string) {
    isLoading.value = true
    try {
      const res = await OrganizationSevice.getOrganization(id)
      console.log(res)
      item.value = res.data
      setTimeLoad()
    } catch (error) {
      console.error(error)
      router.push({ name: 'home' })
    } finally {
      isLoading.value = false
    }
  }

  function setItem(data: Organization) {
    item.value = data
    loadTime.value = Date.now()
  }

  async function fetchUpdateItem(id: number | string, data: {}): Promise<void> {
    console.log(data)
    isLoading.value = true
    try {
      const res = await OrganizationSevice.patchOrganization(id, data)
      item.value = res.data
      setTimeLoad()
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchNewItem(inputs: {
    name: string
    short_name: string
    description: string
  }) {
    isLoading.value = true
    try {
      const { data } = await OrganizationSevice.postOpganization({
        ...inputs,
        is_active: true
      })
      item.value = data
      setTimeLoad()
      router.replace({ name: 'organization', params: { id: data.id } })
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    item,
    isLoading,
    setItem,
    fetchItem,
    fetchUpdateItem,
    fetchNewItem,
    hasChanged,
    loadTime
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot))
}
