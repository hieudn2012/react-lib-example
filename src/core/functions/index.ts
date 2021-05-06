export const guidGenerator = () =>
  `${Math.random().toString(36).slice(-8)}_${Math.random()
    .toString(36)
    .slice(-8)}_${Math.random().toString(36).slice(-4)}`

export const formatMoney = (value: any) =>
  value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
