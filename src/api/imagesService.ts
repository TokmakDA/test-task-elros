import type { AxiosError, AxiosResponse } from 'axios'
import { type FilterParams } from '../@types/organization'
import { ApiEndpoints, AxiosApi } from '@/api/axois-api-config'
import type { Image } from '@/@types/images'

export class imagesService {
  public static async getList(params: FilterParams): Promise<AxiosResponse> {
    return await AxiosApi.get<any>(`${ApiEndpoints.images}`, {
      params,
      paramsSerializer: function (params) {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      }
    })
  }

  public static async postImage(
    FormData: FormData
  ): Promise<AxiosResponse<Image>> {
    return await AxiosApi.post<Image>(`${ApiEndpoints.images}`, FormData)
  }

  public static async fetchDelete(id: string | number): Promise<AxiosResponse> {
    return await AxiosApi.post<AxiosResponse>(`${ApiEndpoints.images}/${id}`)
  }
}
