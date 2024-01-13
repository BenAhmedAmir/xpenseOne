import * as React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PhotoCamera } from "@material-ui/icons";

// @ts-ignore
const ExpenseRow = ({
    expense,
    expenseTypes,
    handleDialogOpen,
    handleUploadDialogOpen
}) => {
    return (
        <TableRow key={expense.id}>
            <TableCell>{expense.date}</TableCell>
            <TableCell>
                {expenseTypes.find(x => x.id == expense.type).i18n?.fr?.name}
            </TableCell>
            <TableCell>{expense.source}</TableCell>
            <TableCell>{expense.attachments.length}</TableCell>
            <TableCell>{expense.amount.value}</TableCell>
            <TableCell>{expense.amount.curr}</TableCell>
            <TableCell>{expense.amount?.tax?.amount}</TableCell>
            <TableCell>
                <IconButton onClick={() => handleDialogOpen(expense)} color="primary" aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleUploadDialogOpen(expense)} color="primary"
                    aria-label="upload file" component="span">
                    <PhotoCamera />
                </IconButton>
                <IconButton color="secondary" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ExpenseRow;

