// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include paths to your components and pages
  ],
  theme: {
    extend: {
      screens: {
        '720p': '1280px',   // 720p HD
        '1080p': '1920px',  // 1080p Full HD
        '1920p': '2560px',  // 1920p WQHD
        '4k': '3840px',     // 4K Ultra HD
      },
    },
  },
  plugins: [],
}
