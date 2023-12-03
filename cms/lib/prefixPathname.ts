export function prefixPathname(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}
