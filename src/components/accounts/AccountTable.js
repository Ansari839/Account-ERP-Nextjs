import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../UI/Table';
import AccountRow from './AccountRow';

const AccountTable = ({ accounts = [], onDelete }) => {
  return (
    <div className="border rounded-lg overflow-hidden w-full">
      {/* Desktop Table */}
      <div className="hidden sm:table w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account Name</TableHead>
              <TableHead>Account Head</TableHead>
              <TableHead>Closing Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                <td colSpan="4" className="text-center py-8 text-muted-foreground">
                  No accounts found
                </td>
              </TableRow>
            ) : (
              accounts.map((account) => (
                <AccountRow
                  key={account._id}
                  account={account}
                  onDelete={onDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View - Stacked cards */}
      <div className="sm:hidden space-y-4 w-full p-4">
        {accounts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No accounts found
          </div>
        ) : (
          accounts.map((account) => (
            <div
              key={account._id}
              className="border rounded-lg p-4 bg-card shadow-sm"
            >
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-sm text-muted-foreground">Account Name</div>
                <div className="font-medium">{account.name}</div>

                <div className="text-sm text-muted-foreground">Account Head</div>
                <div>{account.headOfAccount}</div>

                <div className="text-sm text-muted-foreground">Closing Balance</div>
                <div>${account.openingBalance || 0}</div>
              </div>

              <div className="flex space-x-2 pt-3 border-t">
                <a
                  href={`/dashboard/accounts/${account._id}/edit`}
                  className="flex-1 border rounded px-3 py-2 text-sm hover:bg-accent transition-colors text-center"
                >
                  Edit
                </a>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete account "${account.name}"?`)) {
                      onDelete(account._id);
                    }
                  }}
                  className="flex-1 border rounded px-3 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AccountTable;