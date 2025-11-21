'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button';
import Input from '../UI/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../UI/Form';
import { cn } from '@/lib/utils';

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
    if (onSubmit) onSubmit(data);
  };

  return (
    <div className="bg-[color:var(--theme-card-bg)] border border-[color:var(--theme-border)] rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--theme-text)]">{mode === 'create' ? 'Create New Account' : 'Edit Account'}</h2>
        <p className="text-[color:var(--theme-text)]/70">
          {mode === 'create'
            ? 'Fill in the details to create a new account'
            : 'Update the account details and save changes'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">Name *</FormLabel>
                <FormControl>
                  <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                    <Input
                      placeholder="Enter account name"
                      {...field}
                      className={cn(
                        "w-full border-0 focus:ring-0 p-0",
                        form.formState.errors.name
                          ? "focus:ring-1 focus:ring-red-500"
                          : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
            />

            {/* City Field */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">City</FormLabel>
                <FormControl>
                  <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                    <Input
                      placeholder="Enter city"
                      {...field}
                      className={cn(
                        "w-full border-0 focus:ring-0 p-0",
                        form.formState.errors.city
                          ? "focus:ring-1 focus:ring-[color:var(--theme-accent)]"
                          : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
              <div className="space-y-2 md:col-span-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">Address</FormLabel>
                <FormControl>
                  <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                    <Input
                      placeholder="Enter address"
                      {...field}
                      className={cn(
                        "w-full border-0 focus:ring-0 p-0",
                        form.formState.errors.address
                          ? "focus:ring-1 focus:ring-[color:var(--theme-accent)]"
                          : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
            />

            {/* Telephone Field */}
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">Telephone</FormLabel>
                <FormControl>
                  <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                    <Input
                      placeholder="Enter telephone number"
                      {...field}
                      className={cn(
                        "w-full border-0 focus:ring-0 p-0",
                        form.formState.errors.telephone
                          ? "focus:ring-1 focus:ring-[color:var(--theme-accent)]"
                          : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
            />

            {/* Head of Account Field */}
            <FormField
              control={form.control}
              name="headOfAccount"
              render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">Head of Account *</FormLabel>
                <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "w-full border-0 focus:ring-0 py-0",
                          form.formState.errors.headOfAccount
                            ? "focus:ring-1 focus:ring-[color:var(--theme-accent)]"
                            : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                        )}
                      >
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
                </div>
                <FormMessage />
              </div>
            )}
            />

            {/* Opening Balance Field */}
            <FormField
              control={form.control}
              name="openingBalance"
              render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">Opening Balance</FormLabel>
                <FormControl>
                  <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                    <Input
                      type="number"
                      placeholder="Enter opening balance"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                      className={cn(
                        "w-full border-0 focus:ring-0 p-0",
                        form.formState.errors.openingBalance
                          ? "focus:ring-1 focus:ring-[color:var(--theme-accent)]"
                          : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
            />

            {/* Opening Type Field */}
            <FormField
              control={form.control}
              name="openingType"
              render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">Opening Type *</FormLabel>
                <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "w-full border-0 focus:ring-0 py-0",
                          form.formState.errors.openingType
                            ? "focus:ring-1 focus:ring-[color:var(--theme-accent)]"
                            : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                        )}
                      >
                        <SelectValue placeholder="Select opening type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DR">DR</SelectItem>
                      <SelectItem value="CR">CR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </div>
            )}
            />

            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
              <div className="space-y-2 md:col-span-2">
                <FormLabel className="text-sm font-bold text-[color:var(--theme-text)] block">Category</FormLabel>
                <FormControl>
                  <div className="border border-[color:var(--theme-border)] rounded-lg p-2">
                    <Input
                      placeholder="Enter category"
                      {...field}
                      className={cn(
                        "w-full border-0 focus:ring-0 p-0",
                        form.formState.errors.category
                          ? "focus:ring-1 focus:ring-[color:var(--theme-accent)]"
                          : "focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
            />
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-[color:var(--theme-border)]">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
              }}
              className="px-4 py-2 rounded-lg border-[color:var(--theme-border)] text-[color:var(--theme-text)] hover:bg-[color:var(--theme-card-bg)]/70"
            >
              Reset
            </Button>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.href = '/dashboard/accounts'}
                className="px-4 py-2 rounded-lg border-[color:var(--theme-border)] text-[color:var(--theme-text)] hover:bg-[color:var(--theme-card-bg)]/70 sm:order-1"
              >
                Go to Account List
              </Button>

              <Button
                type="submit"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[color:var(--theme-primary)] to-[color:var(--theme-secondary)] hover:from-[color:var(--theme-primary)]/80 hover:to-[color:var(--theme-secondary)]/80 text-white transition-all duration-200 shadow-md hover:shadow-lg sm:order-2"
              >
                {mode === 'edit' ? 'Update Account' : 'Create Account'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;