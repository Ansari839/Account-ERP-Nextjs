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

const AccountTable = ({ accounts = [], onDelete, className }) => {
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
        <div className="text-center py-8 text-muted-foreground">
          No accounts found
        </div>
      ) : (
        accounts.map((account) => (
          <div 
            key={account._id} 
            className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{account.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{account.headOfAccount}</p>
              </div>
              <div className="flex space-x-2">
                <a
                  href={`/dashboard/accounts/${account._id}/edit`}
                  className="p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(account._id)}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div className="text-muted-foreground">Opening Balance</div>
              <div>${account.openingBalance || 0}</div>
              
              <div className="text-muted-foreground">Opening Type</div>
              <div>{renderStatusBadge(account.openingType)}</div>
              
              <div className="text-muted-foreground">City</div>
              <div>{account.city || '-'}</div>
              
              <div className="text-muted-foreground">Category</div>
              <div>{account.category || '-'}</div>
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
        <TableCaption className="mt-4">
          Showing {accounts.length} account{accounts.length !== 1 ? 's' : ''}
        </TableCaption>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[30%]">Account Name</TableHead>
            <TableHead className="w-[20%]">Head of Account</TableHead>
            <TableHead className="w-[15%]">Opening Balance</TableHead>
            <TableHead className="w-[10%]">Type</TableHead>
            <TableHead className="w-[15%]">Category</TableHead>
            <TableHead className="w-[10%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.length === 0 ? (
            <TableRow>
              <TableCell colSpan="6" className="text-center py-8 text-muted-foreground">
                No accounts found
              </TableCell>
            </TableRow>
          ) : (
            accounts.map((account) => (
              <TableRow 
                key={account._id} 
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-md mr-3">
                      <div className="bg-primary/20 w-6 h-6 rounded-md flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">
                          {account.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div>{account.name}</div>
                      {account.city && (
                        <div className="text-xs text-muted-foreground">{account.city}</div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{account.headOfAccount}</TableCell>
                <TableCell>${account.openingBalance || 0}</TableCell>
                <TableCell>{renderStatusBadge(account.openingType)}</TableCell>
                <TableCell>{account.category || '-'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <a
                      href={`/dashboard/accounts/${account._id}/edit`}
                      className="p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(account._id)}
                      className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
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
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {renderDesktopView()}
      {renderMobileView()}
    </div>
  );
};

export default AccountTable;