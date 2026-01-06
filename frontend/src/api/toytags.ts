import type { AxiosInstance } from 'axios'

import type { ToyTag } from '@/types/tag'

export default (api: AxiosInstance) => {
  const getToyTags = async (): Promise<ToyTag[]> => {
    const response = await api.get('/json/toytags.json')
    if (response.status === 200) {
      return response.data
    }
    return []
  }

  return {
    getToyTags
  }
}
