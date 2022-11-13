/**
 * Replace backslash to slash
 *
 * @category String
 */
export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

/**
 * Ensure prefix of a string
 *
 * @category String
 */
export function ensurePrefix(prefix: string, str: string) {
  return str.startsWith(prefix) ? str : (prefix + str)
}

/**
 * Ensure suffix of a string
 *
 * @category String
 */
export function ensureSuffix(suffix: string, str: string) {
  return str.endsWith(suffix) ? str : (str + suffix)
}

/**
 * Dead simple template engine, just like Python's `.format()`
 *
 * @category String
 * @example
 * ```
 * const result = template(
 *   'Hello {0}! My name is {1}.',
 *   'Inès',
 *   'Anthony'
 * ) // Hello Inès! My name is Anthony.
 * ```
 */
export function template(str: string, ...args: any[]): string {
  return str.replace(/{(\d+)}/g, (match, key) => {
    const index = Number(key)
    return Number.isNaN(index) ? match : args[index]
  })
}

// port from nanoid
// https://github.com/ai/nanoid
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
/**
 * Generate a random string
 * @category String
 */
export function randomStr(size = 16, dict = urlAlphabet) {
  let id = ''
  let i = size
  const len = dict.length
  while (i--)
    id += dict[(Math.random() * len) | 0]
  return id
}

/**
 * First letter uppercase, other lowercase
 * @category string
 * @example
 * ```
 * capitalize('hello') => 'Hello'
 * ```
 */
export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
