import { defineStore } from 'pinia'
import type {
  FilterParams,
  Organization,
  OrganizationsState
} from '../@types/organization'
import { OrganizationSevice } from '../api/organizationService'

export const useOrganizationListStore = defineStore('organizationList', {
  state: (): OrganizationsState => ({
    success: false,
    count: 0,
    next: null,
    previous: null,
    results: [],
    isLoading: false,
    counterLoad: 0
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
      this.$state.counterLoad++
      // console.group('fetchList')
      // console.log('fetchList => counterLoad', this.$state.counterLoad)
      this.$state.isLoading = true
      try {
        const res = await OrganizationSevice.getList(params)
        // console.log(res)
        this.$state = res.data
      } catch (error) {
        console.log(error)
      } finally {
        this.$state.isLoading = false
        // console.groupEnd()
      }
    }
  }
})
