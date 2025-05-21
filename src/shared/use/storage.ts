function isBrowser() {
  return typeof window !== 'undefined'
}

export const storage = {
  getItem,
  setItem,
  clearItem,
  getFlag,
  setFlag
}

function getItem(name: string): any {
  const item = isBrowser() && window.localStorage.getItem(name)
  return item && JSON.parse(item)
}
function setItem(name: string, value: any): void {
  const type = typeof value
  const valueToSet = {
    string: value,
    object: JSON.stringify(value),
  }[type] || ''
  if (isBrowser()) window.localStorage.setItem(name, value && valueToSet)
}
function clearItem(name: string): void {
  if (isBrowser()) window.localStorage.removeItem(name)
}
function getFlag<T>(flagName: string): T | boolean {
  const flags = getItem('flags') || {}
  return !!flags[flagName]
}
function setFlag<T>(flagName: string, value: T | boolean) {
  const flags = getItem('flags') || {}
  flags[flagName] = value

  setItem('flags', flags)
}
