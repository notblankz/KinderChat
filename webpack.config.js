import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './public/js/chatPage.js', // Entry point
  output: {
    filename: 'chatPage.bundle.js', // Output file
    path: path.resolve(__dirname, 'public/js'), // Output directory
  },
  mode: 'development', // Set the mode to development for easier debugging
};
