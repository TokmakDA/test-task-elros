// Utilities
import { createPinia } from 'pinia'
import { useOrganizationListStore } from './organizationList'
import { useOrganizationStore } from './organization'

export default createPinia()

export { useOrganizationListStore, useOrganizationStore }
