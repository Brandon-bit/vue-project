export const formatToMoney = (value: number, locale: string = 'es-MX', currency: string = 'MXN'): string => {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });
}
