export interface CustomerResponse {
  id: string,
  avatar: string,
  birthday: string,
  idCard: string,
  firstName: string,
  lastName: string,
  email: string,
  sex: string,
  dob: string | null
  pob: string | null
  phoneNumber: string,
  address: CustomerAddress,
  company: string,
  idCardFront: string
  idCardBack: string
  createdAt: string,
  updatedAt?: string,
}

export interface CustomerListResponse {
  name: string,
  gender: string,
  email: string,
  phone: string,
  idCard: string,
  createdAt: string,
  updatedAt?: string,
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  gender: string
  dob: string | null
  pob: string | null
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
