import { useState, useCallback } from 'react';

import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

//  utils
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { IProductOrderProps } from 'src/types/product';
import { ListOrderRes } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  row: ListOrderRes;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function EcommerceAccountOrdersTableRow({ row, onSelectRow, selected }: Props) {
 
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const inputStyles = {
    pl: 1,
    [`&.${inputBaseClasses.focused}`]: {
      bgcolor: 'action.selected',
    },
  };
  

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={row.id} sx={inputStyles} />
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={row.items?.map(item => item.name)} sx={inputStyles} />
        </TableCell>

        <TableCell>{fDate(row.updated_at)}</TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={fCurrency(row.items?.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0))} sx={inputStyles} />
        </TableCell>

        <TableCell>
          <Label
            color={
              (row.status === 'Completed' && 'success') ||
              (row.status === 'To Process' && 'warning') ||
              (row.status === 'Cancelled' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" padding="none">
          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 160 },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:view" sx={{ mr: 1 }} /> View
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} /> Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Popover>
    </>
  );
}
