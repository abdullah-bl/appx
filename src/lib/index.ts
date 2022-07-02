export const ICON_SIZE = 24


export const RANDOM_COLOR = () => '#' +
  (
    '00000' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)
  ).slice(-6)


export const RANDOM_LIGHT_COLOR = () => `hsl(${Math.random() * 360}, 90%, 90%, 0.2)`
