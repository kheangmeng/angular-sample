import type { CustomerResponse, City } from '../../types'

export const mapCustomers = (res: any): CustomerResponse[] => {
  return res.customers?.map((customer: CustomerResponse) => ({
    id: customer.id,
    name: customer.name,
    gender: customer.gender,
    email: customer.email,
    phone: customer.phone,
    photo_url: customer.photo_url,
    idCard: customer.idCard,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  }))
}

export const mapGroupCityByCountry = (cities: City[]): Map<number, City[]> => {
  const cityMap = new Map<number, City[]>();

  cities.forEach(city => {
    const current = cityMap.get(city.countryId) || [];
    cityMap.set(city.countryId, [...current, city]);
  });

  return cityMap;
}
