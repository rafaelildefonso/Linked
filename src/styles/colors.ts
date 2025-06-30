// Define a paleta de cores para o aplicativo, baseada na logo "Linked".
// Inclui tons de cinza para texto e elementos neutros,
// e tons de azul para elementos primários e de destaque.

export const colors = {
  // A modern, vibrant blue for primary actions and highlights.
  blue: {
    100: "#EBF8FF", // Lightest blue for backgrounds
    300: "#90CDF4", // Light blue for secondary elements
    500: "#4299E1", // Primary blue, vibrant and accessible
    700: "#2B6CB0", // Darker blue for pressed states or important text
    900: "#2A4365", // Deepest blue
  },

  // A neutral gray palette for text, backgrounds, and borders.
  gray: {
    50: "#F7FAFC",  // Almost white, for app background
    100: "#EDF2F7", // Light gray for cards, inputs
    200: "#E2E8F0", // Light borders
    300: "#CBD5E0", // Medium gray for borders and dividers
    400: "#A0AEC0", // Lighter text, placeholders
    500: "#718096", // Main body text
    600: "#4A5568", // Headings and important text
    700: "#2D3748", // Darker text
    800: "#1A202C", // Almost black
    900: "#171923", // Deepest black
  },

  // Accent colors for user feedback.
  feedback: {
    success: "#48BB78", // Green
    warning: "#F6E05E", // Yellow
    error: "#F56565",   // Red
  },
  
  yellow: {
    500: "#FFC700", // For the star icon
  },

  // Basic colors
  basic: {
    white: "#FFFFFF",
    black: "#1A202C",
  },
};
