import React from 'react';
import Link from 'next/link';
import { TableCell, TableRow } from '../UI/Table';
import { Button } from '../UI/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../UI/AlertDialog';

const AccountRow = ({ account, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handleDelete = () => {
    onDelete(account._id);
    setShowDeleteDialog(false);
  };

  return (
    <TableRow key={account._id} className="sm:table-row block sm:static border-b sm:border-b-0 mb-4 sm:mb-0">
      {/* Account Name */}
      <TableCell className="font-medium sm:table-cell block">
        <div className="sm:hidden text-sm text-muted-foreground mb-1">Account Name</div>
        <div>{account.name}</div>
      </TableCell>

      {/* Account Head */}
      <TableCell className="sm:table-cell block">
        <div className="sm:hidden text-sm text-muted-foreground mb-1">Account Head</div>
        <div>{account.headOfAccount}</div>
      </TableCell>

      {/* Closing Balance */}
      <TableCell className="sm:table-cell block">
        <div className="sm:hidden text-sm text-muted-foreground mb-1">Closing Balance</div>
        <div>${account.openingBalance || 0}</div>
      </TableCell>

      {/* Actions */}
      <TableCell className="sm:table-cell block">
        <div className="sm:hidden text-sm text-muted-foreground mb-1">Actions</div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/accounts/${account._id}/edit`}>
            <Button
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
          </Link>
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the account
                  "{account.name}" and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AccountRow;