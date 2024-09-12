const width = window.innerWidth;
const height = window.innerHeight;

if (width === 1280 && height === 720) {
  import('./styles/720p.scss');
} else if (width === 1920 && height === 1080) {
  import('./styles/1080p.scss');
} else if (width === 3840 && height === 2160) {
  import('./styles/2160p.scss');
} else {
  import('./styles/1080p.scss');
}
