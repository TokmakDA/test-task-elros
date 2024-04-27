import type { AxiosResponse } from 'axios'
import { ApiEndpoints, AxiosApi } from '@/api/axois-api-config'
import type {
  FilterParams,
  Organization,
  OrganizationRequest,
  OrganizationsResponse
} from '@/@types/organization'

export class OrganizationSevice {
  public static async getList(params: FilterParams): Promise<AxiosResponse> {
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

  public static async postOpganization(
    data: OrganizationRequest
  ): Promise<AxiosResponse<Organization>> {
    return await AxiosApi.post<Organization>(
      `${ApiEndpoints.organizations}/`,
      data
    )
  }
  public static async patchOrganization(
    id: string | number,
    data: {}
  ): Promise<AxiosResponse<Organization>> {
    return await AxiosApi.patch<Organization>(
      `${ApiEndpoints.organizations}/${id}/`,
      data
    )
  }
  public static async getOrganization(
    id: string | number
  ): Promise<AxiosResponse<Organization>> {
    return await AxiosApi.get<Organization>(
      `${ApiEndpoints.organizations}/${id}/`
    )
  }

  public static async fetchDelete(
    id: string | number
  ): Promise<AxiosResponse<OrganizationsResponse>> {
    return await AxiosApi.delete<OrganizationsResponse>(
      `${ApiEndpoints.organizations}/${id}/`
    )
  }
}
