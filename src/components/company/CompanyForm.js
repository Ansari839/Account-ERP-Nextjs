'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { Card, CardContent } from '@/components/UI/Card';
import { toast } from 'sonner'; // Using sonner for toasts

const CompanyForm = ({ initialData, loading }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    email: '',
    ntn: '',
    strn: '',
    currency: { code: 'USD', symbol: '$', name: 'US Dollar' }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial data when it's available
  useEffect(() => {
    if (initialData && !loading) {
      setFormData({
        companyName: initialData.companyName ?? '',
        address: initialData.address ?? '',
        email: initialData.email ?? '',
        ntn: initialData.ntn ?? '',
        strn: initialData.strn ?? '',
        currency: initialData.currency ?? { code: 'USD', symbol: '$', name: 'US Dollar' }
      });
      setIsEditing(true);
    } else if (!loading) {
      setIsEditing(false);
      setFormData({
        companyName: '',
        address: '',
        email: '',
        ntn: '',
        strn: '',
        currency: { code: 'USD', symbol: '$', name: 'US Dollar' }
      });
    }
  }, [initialData, loading]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle currency change
  const handleCurrencyChange = (value) => {
    const currencyOptions = [
      { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
      { code: 'USD', symbol: '$', name: 'US Dollar' },
      { code: 'GBP', symbol: '£', name: 'British Pound' },
      { code: 'EUR', symbol: '€', name: 'Euro' },
      { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates Dirham' },
      { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
      { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
      { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
      { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
      { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    ];

    const selectedCurrency = currencyOptions.find(option => option.code === value);
    if (selectedCurrency) {
      setFormData(prev => ({
        ...prev,
        currency: {
          code: selectedCurrency.code,
          symbol: selectedCurrency.symbol,
          name: selectedCurrency.name
        }
      }));
    }

    // Clear currency error when user selects a value
    if (errors.currency) {
      setErrors(prev => ({
        ...prev,
        currency: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.currency.code) {
      newErrors.currency = 'Currency is required';
    }

    // Email validation
    if (formData.email && formData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data to send (only send the values we need to update)
      const dataToSend = {
        ...formData,
        currency: formData.currency
      };

      let response;
      if (isEditing) {
        // Update existing company
        response = await fetch('/api/company', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
      } else {
        // Create new company
        response = await fetch('/api/company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save company information');
      }

      const result = await response.json();
      
      // Update state with the saved data
      setFormData({
        companyName: result.companyName || result.data?.companyName,
        address: result.address || result.data?.address,
        email: result.email || result.data?.email,
        ntn: result.ntn || result.data?.ntn,
        strn: result.strn || result.data?.strn,
        currency: result.currency || result.data?.currency
      });
      
      setIsEditing(true);
      
      toast.success(isEditing ? 'Company information updated successfully!' : 'Company information created successfully!');
    } catch (error) {
      console.error('Error saving company:', error);
      toast.error(`Error saving company: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Currency options
  const currencyOptions = [
    { code: 'PKR', name: 'Pakistani Rupee' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'EUR', name: 'Euro' },
    { code: 'AED', name: 'United Arab Emirates Dirham' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'JPY', name: 'Japanese Yen' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-bold text-[color:var(--theme-text)] block">Company Name *</label>
          <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              disabled={isSubmitting}
              className="w-full border-0 focus:ring-0 p-0"
            />
          </div>
          {errors.companyName && <p className="text-sm text-[color:var(--theme-accent)]">{errors.companyName}</p>}
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <label htmlFor="currency" className="text-sm font-bold text-[color:var(--theme-text)] block">Currency *</label>
          <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
            <Select
              value={formData.currency?.code}
              onValueChange={handleCurrencyChange}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full border-0 focus:ring-0 py-0">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.currency && <p className="text-sm text-[color:var(--theme-accent)]">{errors.currency}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-[color:var(--theme-text)] block">Email</label>
          <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter company email"
              disabled={isSubmitting}
              className="w-full border-0 focus:ring-0 p-0"
            />
          </div>
          {errors.email && <p className="text-sm text-[color:var(--theme-accent)]">{errors.email}</p>}
        </div>

        {/* NTN */}
        <div className="space-y-2">
          <label htmlFor="ntn" className="text-sm font-bold text-[color:var(--theme-text)] block">NTN</label>
          <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
            <Input
              id="ntn"
              name="ntn"
              value={formData.ntn}
              onChange={handleChange}
              placeholder="Enter NTN"
              disabled={isSubmitting}
              className="w-full border-0 focus:ring-0 p-0"
            />
          </div>
        </div>

        {/* STRN */}
        <div className="space-y-2">
          <label htmlFor="strn" className="text-sm font-bold text-[color:var(--theme-text)] block">STRN</label>
          <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
            <Input
              id="strn"
              name="strn"
              value={formData.strn}
              onChange={handleChange}
              placeholder="Enter STRN"
              disabled={isSubmitting}
              className="w-full border-0 focus:ring-0 p-0"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2 md:col-span-2">
        <label htmlFor="address" className="text-sm font-bold text-[color:var(--theme-text)] block">Address</label>
        <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter company address"
            rows={3}
            className="w-full border-0 focus:ring-0 p-0 resize-none"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end pt-4 border-t border-[color:var(--theme-border)]">
        <Button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[color:var(--theme-primary)] to-[color:var(--theme-secondary)] hover:from-[color:var(--theme-primary)]/80 hover:to-[color:var(--theme-secondary)]/80 text-white transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Information' : 'Save Information'}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;