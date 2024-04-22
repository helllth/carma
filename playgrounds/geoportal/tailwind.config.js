/* tailwind.config.js */
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '../../libraries/layer-lib/src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
