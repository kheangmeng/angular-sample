export interface Login {
  email: string
  password: string
}
export interface LoginResponse {
  token: string
  refreshToken: string
}
export interface RefreshTokenResponse {
  token: string
}

export interface AuthUser {
  id: string
  email: string
  name?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null
  statusMessage: string | null
}

export interface Signup {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
