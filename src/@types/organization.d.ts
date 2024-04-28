import type { Image } from './images'

export interface OrganizationsResponse {
  success: boolean
  count: number
  next: string | null
  previous: string | null
  results: Organization[]
}

export interface OrganizationRequest {
  name: string
  short_name: string
  description: string
  is_active?: true // Обязятельно True можно сделать булевое Boolean(True/False)
  image?: string | number | null
}

export interface FilterParams {
  page?: number
  page_size?: number
  ordering?: string | null
}

export type OrganizationsState = OrganizationsResponse & {
  isLoading: boolean
  counterLoad: number
}

export type Organization = {
  id: number | string
  uuid?: string
  name?: string
  short_name?: string
  description?: string | null
  maximum_seats?: string | null
  parent?: string | null
  image?: Image | null
  is_seller?: boolean
  object_type?: string
  addresses?: [] | unknown
  is_active?: boolean
  payment_info?: [] | unknown
  work_schedule?: WorkDay[]
  children?: [] | unknown
  work_mode?: string
  gallery?: null | unknown
}

export interface WorkDay {
  id: number | string
  weekday: string
  start_time: string
  end_time: string
  has_break: boolean
  break_start_time: string
  break_end_time: string
  is_day_off: boolean
}
