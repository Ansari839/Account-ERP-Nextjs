'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeProvider';

const ThemeSettingsPage = () => {
  const { selectedPalette, isDarkMode, themePalettes, changePalette, toggleDarkMode } = useTheme();
  const [localSelectedPalette, setLocalSelectedPalette] = useState(selectedPalette);

  // Update local state when context changes
  useEffect(() => {
    setLocalSelectedPalette(selectedPalette);
  }, [selectedPalette]);

  const handleThemeChange = (palette) => {
    changePalette(palette);
    setLocalSelectedPalette(palette);
  };

  const getThemePreview = (palette) => {
    return (
      <div
        className="rounded-lg p-4 border h-32 flex flex-col justify-between"
        style={{ backgroundColor: palette.colors.background }}
      >
        <div className="flex justify-between">
          <div
            className="w-8 h-8 rounded"
            style={{ backgroundColor: palette.colors.accent }}
          ></div>
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: palette.colors.secondary }}
          ></div>
        </div>
        <div className="space-y-2">
          <div
            className="h-3 rounded"
            style={{ backgroundColor: palette.colors.secondary, width: '75%' }}
          ></div>
          <div
            className="h-3 rounded"
            style={{ backgroundColor: palette.colors.secondary, width: '50%' }}
          ></div>
        </div>
        <div
          className="h-8 rounded flex items-center justify-center text-xs font-medium"
          style={{
            backgroundColor: palette.colors.secondary,
            color: '#fff'
          }}
        >
          Preview
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Theme Settings</h1>
          <p className="text-gray-600">Customize the appearance of your application</p>
        </div>

        <Card className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <span className="mr-2 text-gray-700">Light</span>
              <button
                onClick={toggleDarkMode}
                className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                  isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                    isDarkMode ? 'translate-x-7' : ''
                  }`}
                ></div>
              </button>
              <span className="ml-2 text-gray-700">Dark</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Select Theme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {themePalettes.map((palette) => (
                  <div
                    key={palette.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      localSelectedPalette?.id === palette.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleThemeChange(palette)}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className="w-5 h-5 rounded-full mr-2"
                        style={{
                          backgroundColor: localSelectedPalette?.id === palette.id
                            ? palette.colors.primary
                            : '#D1D5DB' // default gray for unselected
                        }}
                      ></div>
                      <h4 className="font-semibold">{palette.name}</h4>
                    </div>
                    <div className="mb-3">
                      {getThemePreview(palette)}
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: palette.colors.primary }}
                        title="Primary"
                      ></div>
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: palette.colors.secondary }}
                        title="Secondary"
                      ></div>
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: palette.colors.accent }}
                        title="Accent"
                      ></div>
                      <div
                        className="w-4 h-4 rounded-sm border"
                        style={{ backgroundColor: palette.colors.background }}
                        title="Background"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <CardHeader>
            <CardTitle>Theme Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Current Theme</h4>
                  <p className="text-gray-700">{localSelectedPalette?.name || 'Default theme'}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Mode</h4>
                  <p className="text-gray-700 capitalize">{isDarkMode ? 'Dark' : 'Light'} Mode</p>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="font-medium mb-2">About Theme Selection</h4>
                <p className="text-gray-700">
                  Select from our professionally designed color palettes, each crafted
                  specifically for accounting and finance applications. The selected theme
                  is automatically applied to all UI elements across the application and
                  saved for future visits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ThemeSettingsPage;