import { useRouter } from "next/dist/client/router"
import * as React from 'react'
import { useAuth, withLoginRequired } from 'use-auth0-hooks';
import { useState, useEffect } from 'react';
import { Expense } from "../../models/expense"
import ExpenseType from "../../models/expenseType";
import { getExpenses } from "../../services/expenseService";
import { getExpenseTypes } from "../../services/admin/expenseTypeService";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CustomDialog } from '../../components/common/customDialog';
import { UpdateExpense } from "../../components/expense/update";
import { Attachments } from "../../components/expense/attachments";
import Layout from '../../layouts/UserLayout';
import ExpenseRow from "../../components/expense/ExpenseRow";
import getServerRuntimeConfig from '../../utils/getServerRuntimeConfig';
import { GetServerSideProps } from 'next';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            serverSideConfig: getServerRuntimeConfig()
        },
    }
}

// @ts-ignore
const sheet = ({ serverSideConfig }) => {
    const [expenses, setExpenses] = useState([]);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [expenseTypes, setExpenseTypes] = useState([]);
    const router = useRouter()
    const { sid, org } = router.query
    const [isOpen, setIsOpen] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const classes = useStyles();

    const { isLoading, accessToken } = useAuth({
        audience: serverSideConfig.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });

    const handleDialogOpen = (expense) => {
        setCurrentExpense(expense)
        setIsOpen(true)
    }
    const handleDialogClose = () => {
        loadExpenses()
        setIsOpen(false)
    }

    const handleUploadDialogOpen = (expense) => {
        setCurrentExpense(expense)
        setIsUploadOpen(true)
    }
    const handleUploadDialogClose = () => {
        setIsUploadOpen(false)
    }

    function loadExpenses() {
        if (accessToken) {
            getExpenses(sid.toString(), accessToken, serverSideConfig)
                .then((data: Expense[]) => {
                    return data;
                })
                .then(setExpenses);
        }
    }

    function loadExpenseTypes() {
        if (accessToken) {
            getExpenseTypes(accessToken, org.toString(), serverSideConfig)
                .then((data: ExpenseType[]) => {
                    return data;
                })
                .then(setExpenseTypes);
        }
    }
    useEffect(() => {
        loadExpenseTypes();
    }, [accessToken]);
    useEffect(() => {
        loadExpenses();
    }, [expenseTypes]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="expenses list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Attachments</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Tax</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense, index) => (
                            <ExpenseRow key={expense.id}
                                expense={expense}
                                expenseTypes={expenseTypes}
                                handleDialogOpen={handleDialogOpen}
                                handleUploadDialogOpen={handleUploadDialogOpen} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomDialog
                isOpen={isOpen}
                handleClose={handleDialogClose}
                title='Edit expense'>
                <UpdateExpense {...{ expense: currentExpense, config: serverSideConfig }} />
            </CustomDialog>
            <CustomDialog
                isOpen={isUploadOpen}
                handleClose={handleUploadDialogClose}
                title='Attachments'>
                <Attachments expenseId={currentExpense?.id} sheetId={currentExpense?.sheetId} config={serverSideConfig} />
            </CustomDialog>
        </>
    )
}
sheet.layout = Layout;
// @ts-ignore
export default sheet;
