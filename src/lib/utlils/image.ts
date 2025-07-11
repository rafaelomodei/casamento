export function isValidImage(url: string): boolean {
  if (typeof url !== 'string') return false;
  const lower = url.toLowerCase();
  // look for a file extension at the end of the path or query
  const match = lower.match(/\.([a-z0-9]+)(?:\?|$)/);
  if (!match) return false;

  const ext = match[1];
  const allowed = [
    'png',
    'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp',
    'gif',
    'webp',
    'bmp',
    'svg', 'svgz',
    'tiff', 'tif',
    'ico',
    'avif',
    'apng',
    'mp4', 'webm', 'ogv', 'mov'
  ];
  return allowed.includes(ext);
}
