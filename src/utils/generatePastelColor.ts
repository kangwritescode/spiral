export function generatePastelColor() {
    // Generate random values for red, green, and blue between 64 and 191
    const r = Math.floor(Math.random() * 128) + 64;
    const g = Math.floor(Math.random() * 128) + 64;
    const b = Math.floor(Math.random() * 128) + 64;
  
    // Convert RGB values to hex code
    const hexCode = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  
    return hexCode;
  }