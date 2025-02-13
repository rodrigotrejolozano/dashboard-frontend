export enum ApiStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ApiError {
  success: boolean
  message: string
  code: number
  errors?: Record<string, string[]>
}

export interface ApiState {
  isLoading: boolean
  status: ApiStatus
  error?: ApiError
  message?: string
}

export interface ApiData<DataType = unknown> {
  success: boolean
  data?: DataType
  message?: string
  code: number
  meta?: IMetaPagination
}
export interface IMetaPagination {
  totalItems: number
  totalPages: number
  currentPage: number
  nextPage?: number
  prevPage?: number
}
