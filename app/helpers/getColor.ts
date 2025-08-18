export function getColor(id: string): string {
  // Hash string to number
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Map to hue (0–360)
  const hue = Math.abs(hash) % 360;

  // Make saturation & lightness vary slightly with hash, but avoid white tones
  const saturation = 60 + (Math.abs(hash) % 20); // 60–80%
  const lightness = 35 + (Math.abs(hash >> 8) % 20); // 35–55%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
