import type { CustomerResponse, City } from '../../types'

export const mapCustomers = (res: any): CustomerResponse[] => {
  return res.customers?.map((customer: CustomerResponse) => ({
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    avatar: customer.avatar,
    birthday: customer.birthday,
    idCard: customer.idCard,
    gender: customer.sex,
    email: customer.email,
    phone: customer.phoneNumber,
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
