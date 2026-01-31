import type { CategoryResponse, Category } from './index'

export interface OptionType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
}
export interface OptionValue {
  id: number;
  optionTypeId: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
}
export interface OptionTypeWithValues extends OptionType {
  values: OptionValue[];
}
export interface ProductResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  categoryId: number;
  category: CategoryResponse;
  brand: string | null;
  basePrice: number;
  isActive: boolean | null;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}
export interface ProductVariant {
  id: number | null;
  productId: number | null;
  sku: string;
  price: string;
  stockQuantity: number;
  weight: number;
  isActive: boolean | null;
  image: string;
  optionTypeId: number;
  optionValueId: number;
}
export interface Product {
  id: number | null;
  name: string;
  slug: string;
  description: string;
  categoryId: number;
  brand: string | null;
  basePrice: number;
  isActive: boolean | null;
  variants: ProductVariant[];
}

export interface ProductApi {
  id: number
  name: string
  description?: string
  category: Category
  price: number
  size: string
  quantity_in_stock: number
  is_active: boolean
  images_json: string[]
  tags_json: string[]
  createdAt: string
  updatedAt: string
}
