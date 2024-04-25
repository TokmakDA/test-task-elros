<template>
  <v-card max-width="500px">
    <!-- <template v-slot:activator="{ props }">
      <v-btn class="mb-2" color="primary" dark v-bind="props"> New Item </v-btn>
    </template> -->
    <v-card>
      <v-card-title>
        <span class="text-h5">Тайтл</span>
      </v-card-title>

      <!-- <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="currentOrganization.name"
                label="Dessert name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="currentOrganization.short_name"
                label="Calories"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="currentOrganization.description"
                label="Fat (g)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="currentOrganization.is_active"
                label="Carbs (g)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
