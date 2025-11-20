'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button';
import Input from '../UI/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../UI/Form';

// Define the form schema using Zod
const accountFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  city: z.string().optional(),
  address: z.string().optional(),
  telephone: z.string().optional(),
  headOfAccount: z.enum(['Asset', 'Liability', 'Capital', 'Income', 'Expense'], {
    required_error: 'Head of Account is required'
  }),
  openingBalance: z.union([z.string(), z.number()]).optional(),
  openingType: z.enum(['DR', 'CR'], {
    required_error: 'Opening Type is required'
  }),
  category: z.string().optional(),
});

const AccountForm = ({ onSubmit, initialData = null, mode = 'create' }) => {
  const form = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      city: initialData?.city || '',
      address: initialData?.address || '',
      telephone: initialData?.telephone || '',
      headOfAccount: initialData?.headOfAccount || '',
      openingBalance: initialData?.openingBalance || '',
      openingType: initialData?.openingType || 'DR',
      category: initialData?.category || '',
    },
  });

  const handleSubmit = (data) => {
    console.log('Form submitted with data:', data);
    if (onSubmit) onSubmit(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City Field */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Telephone Field */}
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter telephone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Head of Account Field */}
          <FormField
            control={form.control}
            name="headOfAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Head of Account *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select head of account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Asset">Asset</SelectItem>
                    <SelectItem value="Liability">Liability</SelectItem>
                    <SelectItem value="Capital">Capital</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Opening Balance Field */}
          <FormField
            control={form.control}
            name="openingBalance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opening Balance</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter opening balance" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Opening Type Field */}
          <FormField
            control={form.control}
            name="openingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opening Type *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select opening type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DR">DR</SelectItem>
                    <SelectItem value="CR">CR</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" className="w-full md:w-auto">
              {mode === 'edit' ? 'Update Account' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;