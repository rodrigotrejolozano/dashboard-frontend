import axios from 'axios'
import { type ApiError } from '../types/api-types'

export const api = axios.create({
  baseURL: "http://localhost:3000"
})

api.interceptors.request.use(async (config) => {
  return config
})

export const InternalError: ApiError = {
  message: 'Ocurrio un error durante la consulta.',
  success: false,
  code: 500
}

export const getExcepcionPayload = (error: unknown): ApiError => {
  if (typeof error !== 'object' || (error == null)) {
    return InternalError
  }

  const typeObject = error as Record<string, unknown>
  // eslint-disable-next-line no-prototype-builtins
  if (error.hasOwnProperty('response') && typeof typeObject.response === 'object' && typeObject.response !== null) {
    const { data, status } = typeObject.response as { data: Record<string, unknown>, status: number }

    if (typeof data === 'object' && data !== null && typeof status === 'number') {
      const { message, errors } = data as { message: string, errors: Record<string, string[]> | undefined }
      if (typeof message === 'string' && errors !== undefined) {
        return {
          message,
          success: false,
          code: status,
          errors
        }
      }
      if (typeof message === 'string') {
        return {
          message,
          success: false,
          code: status
        }
      }
    }
  }

  const typeException = error as ApiError

  // eslint-disable-next-line no-prototype-builtins
  if (error.hasOwnProperty('message') && typeof typeException.message === 'string' && error.hasOwnProperty('code') && typeof typeException.code === 'string') {
    return {
      message: typeException.message,
      code: typeException.code,
      success: false
    }
  }
  return InternalError
}
