export const getApiUrl = (path = '/') => {
  const base = (import.meta.env.VITE_API_URL || '/api').trim();
  const normalizedBase = base.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath;
};
