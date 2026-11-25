// Prefixes a public-asset path with Vite's base URL so URLs stay correct both
// locally ('/') and on GitHub Pages ('/hytalethankmas.com/'). Vite only
// rewrites imported asset URLs, not literal strings in JSX or head().
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
