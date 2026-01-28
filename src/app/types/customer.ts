export interface CustomerResponse {
  id: number
  name: string
  gender: string
  email: string
  phone: string
  // address: string
  // is_active: boolean
  photo_url: string
  idCard: string
  createdAt: string
  updatedAt: string
}

export type Customer = Pick<
  CustomerResponse,
  'name' | 'gender' | 'email' | 'phone' | 'photo_url' | 'idCard'
>

export interface CustomerInfo {
  firstName: string
  lastName: string
  gender: string
  dob?: string
  pob?: string
  phone: string
  email: string
}
export interface CustomerAddress {
  country: string
  city: string
  zipCode: string
  buildingNumber: string
  street: string
}
export interface CustomerIDCard {
  idCardFront: string
  idCardBack: string
}

export interface CustomerData
  extends CustomerInfo,
    CustomerAddress,
    CustomerIDCard {}

export interface Country {
  id: number
  name: string
  code: string
  createdAt: string
  updatedAt: string
}

export interface City {
  id: number
  name: string
  countryId: number
  createdAt: string
  updatedAt: string
}
