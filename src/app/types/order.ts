export interface Order {
  id: number
  customer_id: number
  order_date: string
  total_amount: number
  order_status: string
  payment_status: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price_at_order: number
  createdAt: string
  updatedAt: string
}
