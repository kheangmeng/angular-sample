import type { CustomerResponse } from '../../types'

export const mapCustomers = (res: any): CustomerResponse[] => {
  return res.customers?.map((customer: CustomerResponse) => ({
    id: customer.id,
    name: customer.name,
    gender: customer.gender,
    email: customer.email,
    phone: customer.phone,
    photo_url: customer.photo_url,
    id_card_number: customer.id_card_number,
    created_at: customer.created_at,
    updated_at: customer.updated_at,
  }))
}
