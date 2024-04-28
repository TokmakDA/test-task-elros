import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Organization } from '../@types/organization'
import { OrganizationSevice } from '../api/organizationService'

export const useOrganizationStore = defineStore({
  id: 'organization',
  state: () => ({
    item: {
      id: 0,
      name: '',
      short_name: '',
      description: '',
      is_active: false,
      image: null
    } as Organization,
    currentIten: {},
    newItemData: {},
    isLoading: false
  }),

  getters: {
    getItem: (state) => state.item
  },

  actions: {
    async fetchItem(id: number | string) {
      this.$state.isLoading = true

      try {
        const res = await OrganizationSevice.getOrganization(id)
        console.log(res)
        this.$state.item = res.data
      } catch (error) {
        console.log(error)
      } finally {
        this.$state.isLoading = false
      }
    },

    setItem(item: Organization) {
      console.log('setItem', item)
      this.item = item
    },

    async fetchUpdateItem(id: number | string, data: {}): Promise<void> {
      console.log(data)
      this.$state.isLoading = true
      try {
        const res = await OrganizationSevice.patchOrganization(id, data)
        console.log('setItemNewData => res', res)
        this.$state.item = res.data
        console.log('setItemNewData => this.$state', this.$state)
      } catch (error) {
        console.log(error)
      } finally {
        this.$state.isLoading = false
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot))
}
