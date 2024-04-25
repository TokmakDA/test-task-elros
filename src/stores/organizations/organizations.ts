import { defineStore } from 'pinia'
import type { FilterParams, Organization, OrganizationsState } from './types'
import { OrganizationSevice } from './organizationService'

export const organizationsStore = defineStore('organizations', {
  state: (): OrganizationsState => ({
    success: false,
    count: 6,
    next: null,
    previous: null,
    results: [],
    isLoading: false
  }),
  getters: {
    getData: (state) => state,
    getOranizationById:
      (state): Organization | unknown =>
      (id: number | string) =>
        state.results.find((organization) => organization.id === id)
  },
  actions: {
    async fetchList(params: FilterParams): Promise<void> {
      this.$state.isLoading = true
      try {
        const res = await OrganizationSevice.fetchList(params)
        // console.log(res)
        this.$state = res.data
      } catch (error) {
        console.log(error)
      } finally {
        this.$state.isLoading = false
      }
    }
  }
})
