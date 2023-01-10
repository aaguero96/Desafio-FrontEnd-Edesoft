const firstToUpper = (name: string): string => {
  const sepparatedName = name.split(" ");
  return sepparatedName.map((value: string): string => (
    value.charAt(0).toUpperCase() + value.slice(1)
  )).join(" ");
}

export {
  firstToUpper,
}