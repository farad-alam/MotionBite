// Only same-site relative paths: a single leading '/', no '//', no backslash,
// no scheme, no control characters.
export function safeDraftPath(input: string | null | undefined): string | null {
  if (!input) return null
  if (!input.startsWith('/') || input.startsWith('//')) return null
  if (input.includes('\\') || /[\u0000-\u001f]/.test(input)) return null
  if (/^\/[a-z][a-z0-9+.-]*:/i.test(input)) return null
  if (input.startsWith('/api/draft')) return null
  return input
}
