export const transformEnumToQLEnum = (enumaration) => {
  return Object.entries(enumaration).reduce((acc, cur) => {
    acc[cur[0]] = { value: cur[1] }
    return acc
  }, {})
}