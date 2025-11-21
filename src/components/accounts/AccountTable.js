import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../UI/Table';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import {
  Search,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AccountTable = ({ accounts = [], onDelete, onEdit, setShowForm, className }) => {
  // Function to render status badge based on openingType
  const renderStatusBadge = (type) => {
    if (!type) return null;

    return (
      <Badge
        variant={type === 'DR' ? 'default' : 'secondary'}
        className={cn(
          "text-xs font-medium",
          type === 'DR'
            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
            : "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100"
        )}
      >
        {type}
      </Badge>
    );
  };

  // For mobile view - render as cards
  const renderMobileView = () => (
    <div className="space-y-4 md:hidden">
      {accounts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No accounts found
        </div>
      ) : (
        accounts.map((account, index) => (
          <div
            key={account._id}
            className={cn(
              "border border-gray-200 rounded-xl p-5 shadow-sm transition-all duration-200",
              "bg-white",
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
              "hover:shadow-md"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{account.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{account.headOfAccount}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onEdit(account);
                    setShowForm(true);
                  }}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(account._id)}
                  className="p-2 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="text-gray-600">Opening Balance</div>
              <div className="text-gray-800">${account.openingBalance || 0}</div>

              <div className="text-gray-600">Opening Type</div>
              <div>{renderStatusBadge(account.openingType)}</div>

              <div className="text-gray-600">City</div>
              <div className="text-gray-800">{account.city || '-'}</div>

              <div className="text-gray-600">Category</div>
              <div className="text-gray-800">{account.category || '-'}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // For desktop view - render as table
  const renderDesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="mt-4 text-gray-500">
          Showing {accounts.length} account{accounts.length !== 1 ? 's' : ''}
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[30%] font-bold text-gray-700 px-4 py-3 text-left">Account Name</TableHead>
            <TableHead className="w-[20%] font-bold text-gray-700 px-4 py-3 text-left">Head of Account</TableHead>
            <TableHead className="w-[15%] font-bold text-gray-700 px-4 py-3 text-left">Opening Balance</TableHead>
            <TableHead className="w-[10%] font-bold text-gray-700 px-4 py-3 text-left">Type</TableHead>
            <TableHead className="w-[15%] font-bold text-gray-700 px-4 py-3 text-left">Category</TableHead>
            <TableHead className="w-[10%] font-bold text-gray-700 px-4 py-3 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.length === 0 ? (
            <TableRow>
              <TableCell colSpan="6" className="text-center py-8 text-gray-500">
                No accounts found
              </TableCell>
            </TableRow>
          ) : (
            accounts.map((account, index) => (
              <TableRow
                key={account._id}
                className={cn(
                  "border-t transition-colors duration-150",
                  "hover:bg-gray-50",
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                )}
              >
                <TableCell className="font-medium px-4 py-3">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      <div className="bg-blue-200 w-6 h-6 rounded-md flex items-center justify-center">
                        <span className="text-blue-700 font-bold text-xs">
                          {account.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-800">{account.name}</div>
                      {account.city && (
                        <div className="text-xs text-gray-500">{account.city}</div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">{account.headOfAccount}</TableCell>
                <TableCell className="px-4 py-3 text-gray-700">${account.openingBalance || 0}</TableCell>
                <TableCell className="px-4 py-3">{renderStatusBadge(account.openingType)}</TableCell>
                <TableCell className="px-4 py-3 text-gray-700">{account.category || '-'}</TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onEdit(account);
                        setShowForm(true);
                      }}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(account._id)}
                      className="p-2 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Account List</h2>
        <Button
          onClick={() => {
            onEdit(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200"
        >
          Create New Account
        </Button>
      </div>

      {renderDesktopView()}
      {renderMobileView()}
    </div>
  );
};

export default AccountTable;