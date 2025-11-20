'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button';
import Input from '../UI/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../UI/Form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../UI/Card';
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
    <Card className="shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{mode === 'create' ? 'Create New Account' : 'Edit Account'}</CardTitle>
        <CardDescription>
          {mode === 'create' 
            ? 'Fill in the details to create a new account' 
            : 'Update the account details and save changes'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter account name" 
                        {...field} 
                        className={form.formState.errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"}
                      />
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
                    <FormLabel className="text-sm font-medium">City</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter city" 
                        {...field} 
                        className={form.formState.errors.city ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"}
                      />
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
                    <FormLabel className="text-sm font-medium">Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter address" 
                        {...field} 
                        className={form.formState.errors.address ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"}
                      />
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
                    <FormLabel className="text-sm font-medium">Telephone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter telephone number" 
                        {...field} 
                        className={form.formState.errors.telephone ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"}
                      />
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
                    <FormLabel className="text-sm font-medium">Head of Account *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className={cn(
                            "w-full",
                            form.formState.errors.headOfAccount ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"
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
                    <FormLabel className="text-sm font-medium">Opening Balance</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter opening balance"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                        className={form.formState.errors.openingBalance ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"}
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
                    <FormLabel className="text-sm font-medium">Opening Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className={cn(
                            "w-full",
                            form.formState.errors.openingType ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-sm font-medium">Category</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter category" 
                        {...field} 
                        className={form.formState.errors.category ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-primary focus:border-primary"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.reset();
                }}
                className="px-4"
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                className="px-6"
              >
                {mode === 'edit' ? 'Update Account' : 'Create Account'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountForm;