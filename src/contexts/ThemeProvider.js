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

    // Apply palette colors
    root.style.setProperty('--theme-primary', palette.colors.primary);
    root.style.setProperty('--theme-secondary', palette.colors.secondary);
    root.style.setProperty('--theme-accent', palette.colors.accent);
    root.style.setProperty('--theme-background', palette.colors.background);

    // Apply dark mode if needed
    if (darkMode) {
      root.style.setProperty('--theme-text', '#ffffff');
      root.style.setProperty('--theme-card-bg', '#1f2937');
      root.style.setProperty('--theme-border', '#374151');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.style.setProperty('--theme-text', '#000000');
      root.style.setProperty('--theme-card-bg', '#ffffff');
      root.style.setProperty('--theme-border', '#e5e7eb');
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