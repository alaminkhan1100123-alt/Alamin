import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a73e8" />
      <stop offset="100%" stop-color="#0d47a1" />
    </linearGradient>
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <circle cx="256" cy="256" r="170" fill="white" filter="url(#dropShadow)" opacity="0.15" />
  
  <!-- Verified Badge & Camera Emblem -->
  <g transform="translate(106, 106)" filter="url(#dropShadow)">
    <circle cx="150" cy="150" r="140" fill="#ffffff" />
    <!-- Blue Badge Check -->
    <path d="M150 40 L180 75 L225 70 L238 115 L280 130 L270 175 L298 208 L268 240 L275 285 L232 295 L215 338 L170 328 L140 360 L110 328 L65 338 L48 295 L5 285 L12 240 L-18 208 L10 175 L0 130 L42 115 L55 70 L100 75 Z" fill="#1a73e8" transform="scale(0.72) translate(58, 58)" />
    <!-- White Checkmark -->
    <path d="M115 152 L138 175 L188 125" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>
`;

const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a73e8" />
      <stop offset="100%" stop-color="#0d47a1" />
    </linearGradient>
  </defs>
  <!-- Full bleed for maskable safe zone -->
  <rect width="512" height="512" fill="url(#bgGrad)" />
  
  <!-- Central Safe Zone icon (padded 20%) -->
  <g transform="translate(131, 131)">
    <circle cx="125" cy="125" r="115" fill="#ffffff" />
    <!-- Blue Badge Check -->
    <path d="M125 35 L150 62 L188 58 L198 96 L233 108 L225 146 L248 173 L223 200 L229 238 L193 246 L179 282 L142 273 L117 300 L92 273 L55 282 L41 246 L5 238 L11 200 L-14 173 L10 146 L1 108 L36 96 L46 58 L84 62 Z" fill="#1a73e8" transform="scale(0.68) translate(58, 58)" />
    <!-- White Checkmark -->
    <path d="M96 127 L115 146 L157 104" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>
`;

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate 512x512
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  // Generate 192x192
  await sharp(Buffer.from(iconSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  // Generate apple-touch-icon 180x180
  await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Generate maskable 512x512
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  console.log('PWA icons successfully generated in public/ folder!');
}

run().catch(console.error);
