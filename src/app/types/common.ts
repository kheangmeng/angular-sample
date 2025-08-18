export interface CreateResponse {
  message: string
  status: string
  code: number
}
export interface UpdateResponse {
  message: string
  status: string
  code: number
  data?: unknown
}

export interface Pagination {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
