/**
 * Convert a string into a URL-safe slug.
 * @example slugify('Hello World!') // 'hello-world'
 */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
