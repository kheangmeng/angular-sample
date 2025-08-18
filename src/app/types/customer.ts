export interface CustomerResponse {
  id: number
  name: string
  gender: string
  email: string
  phone: string
  // address: string
  // is_active: boolean
  photo_url: string
  id_card_number: string
  created_at: string
  updated_at: string
}

export type Customer = Pick<
  CustomerResponse,
  'name' | 'gender' | 'email' | 'phone' | 'photo_url' | 'id_card_number'
>
