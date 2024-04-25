import type { AxiosResponse } from 'axios'
import {
  type FilterParams,
  type OrganizationRequest,
  type OrganizationsResponse
} from './types'
import { ApiEndpoints, AxiosApi } from '@/api/axois-api-config'

export class OrganizationSevice {
  public static async fetchList(params: FilterParams): Promise<AxiosResponse> {
    return await AxiosApi.get<OrganizationsResponse>(
      `${ApiEndpoints.organizations}`,
      {
        params,
        paramsSerializer: function (params) {
          return Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
        }
      }
    )
  }

  public static async fetchAdd(
    data: OrganizationRequest
  ): Promise<AxiosResponse<OrganizationsResponse>> {
    return await AxiosApi.post<OrganizationsResponse>(
      `${ApiEndpoints.organizations}`,
      data
    )
  }

  public static async fetchDelete(
    id: string | number
  ): Promise<AxiosResponse<OrganizationsResponse>> {
    return await AxiosApi.post<OrganizationsResponse>(
      `${ApiEndpoints.organizations}/${id}`
    )
  }
}
