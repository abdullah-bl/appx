export const ICON_SIZE = 24


export const RANDOM_COLOR = () => '#' +
  (
    '00000' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)
  ).slice(-6)


export const RANDOM_LIGHT_COLOR = () => `hsl(${Math.random() * 360}, 90%, 90%, 0.2)`




export const RANKS = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 5,
  },
]

