import type { LoginResponse, RefreshTokenResponse } from '../../types'

export const mapLoginResponse = (res: any): LoginResponse => {
  return { token: res.data?.token, refreshToken: res.data?.refreshToken }
}

export const mapSignupResponse = (res: any): string => {
  return res.data.message
}

export const mapRefreshTokenResponse = (res: any): RefreshTokenResponse => {
  return { token: res.data?.token }
}

export const mapLogoutResponse = (res: any) => {
  return res.data.message
}

export const mapForgotPasswordResponse = (res: any) => {
  return res.data.message
}
