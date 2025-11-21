'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Define 15 theme palettes with specific colors
const themePalettes = [
  {
    id: 'pastel-finance',
    name: "Pastel Finance",
    colors: {
      primary: "#A8DADC",   // light blue
      secondary: "#457B9D", // blue
      accent: "#F1FAEE",    // off-white
      background: "#1D3557" // dark blue
    }
  },
  {
    id: 'royal-blue',
    name: "Royal Blue",
    colors: {
      primary: "#003566",   // dark blue
      secondary: "#00509E", // medium blue
      accent: "#EDF2F4",    // light gray
      background: "#F9F7F7" // white
    }
  },
  {
    id: 'classic-dark',
    name: "Classic Dark",
    colors: {
      primary: "#1B1B1B",   // very dark gray
      secondary: "#2C2C2C", // dark gray
      accent: "#E0E0E0",    // light gray
      background: "#FFD166" // yellow
    }
  },
  {
    id: 'corporate-green',
    name: "Corporate Green",
    colors: {
      primary: "#2A9D8F",   // teal
      secondary: "#06D6A0", // green
      accent: "#E9C46A",    // yellow
      background: "#F4A261" // orange
    }
  },
  {
    id: 'business-gray',
    name: "Business Gray",
    colors: {
      primary: "#264653",   // dark teal
      secondary: "#2A9D8F", // teal
      accent: "#E9C46A",    // yellow
      background: "#F4A261" // orange
    }
  },
  {
    id: 'ocean-blue',
    name: "Ocean Blue",
    colors: {
      primary: "#023E8A",   // deep blue
      secondary: "#0077B6", // blue
      accent: "#0096C7",    // light blue
      background: "#90E0EF" // very light blue
    }
  },
  {
    id: 'sunset-accounting',
    name: "Sunset Accounting",
    colors: {
      primary: "#283618",   // dark green
      secondary: "#606C38", // green
      accent: "#BC6C25",    // brown
      background: "#DDA15E" // orange
    }
  },
  {
    id: 'modern-finance',
    name: "Modern Finance",
    colors: {
      primary: "#3A86FF",   // bright blue
      secondary: "#FB5607", // orange
      accent: "#FF006E",    // pink
      background: "#8338EC" // purple
    }
  },
  {
    id: 'forest-green',
    name: "Forest Green",
    colors: {
      primary: "#2D5016",   // dark green
      secondary: "#617B46", // medium green
      accent: "#A1B57D",    // light green
      background: "#E0F4D7" // very light green
    }
  },
  {
    id: 'professional-navy',
    name: "Professional Navy",
    colors: {
      primary: "#03045E",   // dark blue
      secondary: "#023E8A", // medium blue
      accent: "#0077B6",    // light blue
      background: "#90E0EF" // very light blue
    }
  },
  {
    id: 'charcoal-gray',
    name: "Charcoal Gray",
    colors: {
      primary: "#36454F",   // charcoal
      secondary: "#5C6B73", // blue-gray
      accent: "#8B979E",    // light gray-blue
      background: "#D6DBDF" // light gray
    }
  },
  {
    id: 'golden-finance',
    name: "Golden Finance",
    colors: {
      primary: "#A55528",   // brown-orange
      secondary: "#E5B878", // light orange
      accent: "#F5E6B4",    // light yellow
      background: "#F7F0E8" // off-white
    }
  },
  {
    id: 'deep-purple',
    name: "Deep Purple",
    colors: {
      primary: "#433878",   // dark purple
      secondary: "#6D67E3", // medium purple
      accent: "#B5B2FF",    // light purple
      background: "#E2E0FF" // very light purple
    }
  },
  {
    id: 'crimson-red',
    name: "Crimson Red",
    colors: {
      primary: "#9B2226",   // dark red
      secondary: "#D00000", // red
      accent: "#DC2F02",    // orange-red
      background: "#F0A772" // light orange
    }
  },
  {
    id: 'emerald-green',
    name: "Emerald Green",
    colors: {
      primary: "#087990",   // teal
      secondary: "#0E9AA7", // blue-teal
      accent: "#1E6091",    // blue
      background: "#34A0A4" // teal-green
    }
  }
];

export const ThemeProvider = ({ children }) => {
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedPalette = localStorage.getItem('selectedPalette');
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';
    
    if (savedPalette) {
      const palette = themePalettes.find(p => p.id === savedPalette);
      if (palette) {
        setSelectedPalette(palette);
        applyTheme(palette, savedDarkMode);
      }
    }
    
    setIsDarkMode(savedDarkMode);
  }, []);

  // Apply theme by setting CSS variables
  const applyTheme = (palette, darkMode) => {
    if (!palette) return;

    const root = document.documentElement;

    // Convert hex colors to HSL for CSS variables
    const hexToHSL = (hex) => {
      // Remove the hash if present
      hex = hex.replace(/^#/, '');

      // Parse r, g, b values
      let r, g, b;
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else {
        // Default to black if invalid
        return "0 0% 0%";
      }

      // Normalize values to [0, 1]
      r /= 255;
      g /= 255;
      b /= 255;

      // Find min and max values
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h = Math.round(h * 60);
        if (h < 0) h += 360;
      }

      s = Math.round(s * 100);
      l = Math.round(l * 100);

      return `${h} ${s}% ${l}%`;
    };

    // Apply palette colors to new CSS variables
    root.style.setProperty('--primary', hexToHSL(palette.colors.primary));
    root.style.setProperty('--secondary', hexToHSL(palette.colors.secondary));
    root.style.setProperty('--accent', hexToHSL(palette.colors.accent));
    root.style.setProperty('--background', hexToHSL(palette.colors.background));

    // Apply text color based on theme (determine if light or dark background)
    const isLightBackground = parseInt(hexToHSL(palette.colors.background).split(' ')[2]) > 50;
    const textColor = darkMode ? '0 0% 98%' : isLightBackground ? '240 10% 3.9%' : '0 0% 98%';
    root.style.setProperty('--text', textColor);

    // Apply card and border colors
    const cardColor = darkMode ? '#1f2937' : '#ffffff';
    const borderColor = darkMode ? '#374151' : '#e5e7eb';

    root.style.setProperty('--card', hexToHSL(cardColor));
    root.style.setProperty('--border', hexToHSL(borderColor));

    // Apply chart colors based on primary and secondary
    root.style.setProperty('--chart-primary', hexToHSL(palette.colors.primary));
    root.style.setProperty('--chart-secondary', hexToHSL(palette.colors.secondary));

    // Also apply to the legacy variables for backward compatibility
    root.style.setProperty('--theme-primary', palette.colors.primary);
    root.style.setProperty('--theme-secondary', palette.colors.secondary);
    root.style.setProperty('--theme-accent', palette.colors.accent);
    root.style.setProperty('--theme-background', palette.colors.background);
    root.style.setProperty('--theme-text', darkMode ? '#ffffff' : '#000000');
    root.style.setProperty('--theme-card-bg', cardColor);
    root.style.setProperty('--theme-border', borderColor);

    // Apply dark mode if needed
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  };

  // Handle palette change
  const changePalette = (palette) => {
    setSelectedPalette(palette);
    applyTheme(palette, isDarkMode);
    localStorage.setItem('selectedPalette', palette.id);
  };

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (selectedPalette) {
      applyTheme(selectedPalette, newMode);
    }
    localStorage.setItem('isDarkMode', newMode);
  };

  // Context value
  const value = {
    selectedPalette,
    isDarkMode,
    themePalettes,
    changePalette,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};