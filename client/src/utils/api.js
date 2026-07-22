export const getApiUrl = (path = '/') => {
  const base = (
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? 'https://apj-institute-website.onrender.com' : '/api')
  ).trim();

  const normalizedBase = base.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!normalizedBase || normalizedBase === '/') {
    return normalizedPath;
  }

  const baseHasApi = /\/api(?:\/|$)/.test(normalizedBase);
  const effectiveBase = baseHasApi ? normalizedBase : `${normalizedBase}/api`;
  const pathSuffix = normalizedPath.startsWith('/api') ? normalizedPath.slice(4) : normalizedPath;
  const suffix = pathSuffix === '' ? '/' : pathSuffix.startsWith('/') ? pathSuffix : `/${pathSuffix}`;

  return `${effectiveBase}${suffix}`;
};
