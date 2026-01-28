import type { OptionType, OptionValue, OptionTypeWithValues } from '../../types';

export const mapOptionTypeWithValues = (options: OptionType[], values: OptionValue[]): OptionTypeWithValues[] => {
  const subMap = new Map<number, OptionValue[]>();

  values.forEach(sub => {
    const current = subMap.get(sub.optionTypeId) || [];
    subMap.set(sub.optionTypeId, [...current, sub]);
  });

  return options.map(cat => ({
    ...cat,
    values: subMap.get(cat.id) || []
  }));
}
