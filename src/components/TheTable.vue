<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
    v-model:sort-by="sortBy"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :items-per-page-options="itemsPerPageOptions"
    hover
    showCurrentPage
    @update:options="loadItems"
  >
    <template v-slot:loading>
      <v-skeleton-loader
        :type="`table-row@${itemsPerPage > 10 ? 10 : itemsPerPage}`"
      ></v-skeleton-loader>
    </template>

    <template v-slot:top>
      <!-- Кастомный компонент -->
      <the-dialog
        v-model="dialogDelete"
        title="Подтвердить удаление?"
        @close="closeDelete"
        @confirm="deleteItemConfirm"
        typeDialog="danger"
      ></the-dialog>
    </template>

    <template v-slot:item="{ item }">
      <tr @click.stop="() => openItem(item, false)">
        <td class="v-data-table__td v-data-table-column--align-start">
          {{ item.id }}
        </td>
        <td class="v-data-table__td v-data-table-column--align-start">
          {{ item.name }}
        </td>
        <td class="v-data-table__td v-data-table-column--align-start">
          <table-chip :isActive="item.is_active"></table-chip>
        </td>
        <td class="v-data-table__td v-data-table-column--align-end">
          <table-action-buttons
            @edit-item="openItem"
            @delete-item="deleteItem"
            :item="item"
          ></table-action-buttons>
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-card>
        <v-card-title>
          <span class="text-h5">Нет данных</span>
        </v-card-title>
        <v-btn
          color="orange"
          prepend-icon="mdi-cached"
          @click="loadItems"
          variant="flat"
        >
          Сбросить
        </v-btn>
      </v-card>
    </template>
  </v-data-table-server>
</template>

<script lang="ts">
import type { VDataTableServer } from 'vuetify/components'
import TheDialog from './TheDialog.vue'
import TableActionButtons from './TableActionButtons.vue'
import TableChip from './TableChip.vue'

import { useOrganizationListStore } from '@/stores'
import { useOrganizationStore } from '@/stores/organization'
import type { Organization, FilterParams } from '@/@types/organization'
import { OrganizationSevice } from '@/api/organizationService'
import { mapStores } from 'pinia'

export default {
  data() {
    return {
      firtsLoad: true,
      count: 0,
      page: 1,
      itemsPerPage: 5,
      sortBy: [] as { key: string; order?: boolean | 'asc' | 'desc' }[],
      loading: true,
      totalItems: 0,
      deleteItemId: 0 as string | number,
      itemsPerPageOptions: [
        { value: 1, title: '1' },
        { value: 5, title: '5' },
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: -1, title: 'Все' }
      ],
      headers: [
        {
          title: 'ID',
          align: 'start',
          key: 'id'
        },
        { title: 'Наименование', key: 'name', align: 'start' },
        { title: 'Активен', key: 'is_active', align: 'start' },
        { title: 'Действия', key: 'actions', align: 'end', sortable: false }
      ] as VDataTableServer['headers'],
      serverItems: [] as Organization[],

      dialogDelete: false
    }
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  computed: {
    ...mapStores(useOrganizationListStore, useOrganizationStore)
  },

  components: { TableActionButtons, TheDialog, TableChip },

  methods: {
    getData() {
      const { count, results, isLoading } = this.organizationListStore.getData
      this.serverItems = results
      this.loading = isLoading
      this.totalItems = count
    },

    getQueryParams() {
      const { page = 1, page_size = 5, ordering } = this.$route.query

      this.page = Number(page)
      this.itemsPerPage = Number(page_size)

      const sort = ordering?.toString()
      if (sort) {
        if (sort.charAt(0) === '-') {
          this.sortBy = [{ key: sort.substring(1), order: 'asc' }]
        } else {
          this.sortBy = [{ key: sort, order: 'desc' }]
        }
      } else {
        this.sortBy = []
      }
    },

    updateQueryParams(params: FilterParams) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: params.page?.toString(),
          page_size: params.page_size?.toString(),
          ordering: params.ordering
        }
      })
    },

    async loadItems({
      page,
      itemsPerPage,
      sortBy
    }: {
      page: number
      itemsPerPage: number
      sortBy: { key: string; order?: boolean | 'asc' | 'desc' }[]
    }) {
      this.loading = true

      const params: FilterParams = {
        page: page || this.page,
        page_size: itemsPerPage || this.itemsPerPage
      }

      if (sortBy?.length) {
        let prev = ''
        switch (sortBy[0].order) {
          case 'asc':
            prev = '-'
            break
          default:
            prev = ''
            break
        }
        params.ordering = prev + sortBy[0].key
      }

      await this.organizationListStore.fetchList(params)
      this.getData()
      this.loading = false

      this.updateQueryParams(params)
    },

    openItem(item: Organization, isEdit = true) {
      this.organizationStore.setItem(item)

      if (item.id) {
        this.$router.push({
          name: `organization`,
          params: { id: item.id },
          query: { edit: `${isEdit}` }
        })
      }
    },

    deleteItem(item: Organization) {
      this.deleteItemId = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await OrganizationSevice.fetchDelete(this.deleteItemId)

      this.closeDelete()

      await this.loadItems({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
        sortBy: this.sortBy
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.deleteItemId = 0
    }
  },
  beforeMount() {
    this.getQueryParams()
  }
}
</script>
<style scoped></style>
