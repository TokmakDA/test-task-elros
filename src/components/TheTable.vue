<template>
  <v-data-table-server
    class=""
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :items-per-page-options="itemsPerPageOptions"
    @update:options="loadItems"
    hover
    showCurrentPage
    expandOnClick
    select-strategy="single"
    fixedFooter
    fixedHeader
    @click:row.stop="onClickRow"
  >
    <template v-slot:loading>
      <v-skeleton-loader
        :type="`table-row@${itemsPerPage > 10 ? 10 : itemsPerPage}`"
      ></v-skeleton-loader>
    </template>

    <template v-slot:top>
      <the-dialog
        v-model="dialogDelete"
        title="Подтвердить удаление?"
        @close="closeDelete"
        @confirm="deleteItemConfirm"
        typeDialog="danger"
      ></the-dialog>
    </template>

    <template v-slot:item="{ item }">
      <tr
        @click.stop="
          $router.push({
            name: `organization`,
            params: { id: item.id },
            query: { edit: 'false' }
          })
        "
      >
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
            @edit-item="editItem"
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
import { defineComponent } from 'vue'
import type { VDataTableServer } from 'vuetify/components'
import TheDialog from './TheDialog.vue'
import TableActionButtons from './TableActionButtons.vue'
import TableChip from './TableChip.vue'

import {
  organizationListStore as useorganizationListStore,
  type Organization,
  type FilterParams
} from '@/stores/organizationList'

export default defineComponent({
  data() {
    return {
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
      itemsPerPage: 5,
      loading: true,
      totalItems: 0,
      itemsPerPageOptions: [
        { value: 1, title: '1' },
        { value: 5, title: '5' },
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: -1, title: 'Все' }
      ],

      dialog: false,
      dialogDelete: false,
      currentOrganization: {} as Organization,
      defaultOrganization: {
        name: '',
        short_name: '',
        description: '',
        is_active: true
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  computed: {
    organizationListStore() {
      return useorganizationListStore()
    }
  },

  components: { TableActionButtons, TheDialog, TableChip },
  methods: {
    getData() {
      const { count, results, isLoading } = this.organizationListStore.getData
      this.serverItems = results
      this.loading = isLoading
      this.totalItems = count
    },

    async loadItems({
      page,
      itemsPerPage,
      sortBy
    }: {
      page: number
      itemsPerPage: number
      sortBy: { key: string; order: string }[]
    }) {
      let params: FilterParams = {}

      if (itemsPerPage) {
        params.page_size = itemsPerPage
      }

      if (page && page != 1) {
        params.page = page
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

      this.loading = true

      await this.organizationListStore.fetchList(params)
      this.getData()
      this.loading = false
    },

    editItem(item: Organization) {
      console.log('editItem', item)
      if (item.id) {
        this.$router.push({
          name: `organization`,
          params: { id: item.id },
          query: { edit: 'true' }
        })
      }
    },

    deleteItem(item: Organization) {
      console.log('deleteItem', item.id)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      console.log('deleteItemConfirm')
      this.closeDelete()
    },

    close() {
      // this.dialog = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    closeDelete() {
      // this.dialogDelete = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      // this.close()
    },
    onClickRow(item: Organization) {
      console.log(item)
    }
  }
})
</script>
<style scoped></style>
