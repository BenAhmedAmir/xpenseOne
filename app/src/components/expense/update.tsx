import React, { useEffect, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import ExpenseType from '../../models/expenseType';
import { getExpenseTypes } from "../../services/admin/expenseTypeService";
import { useAuth } from 'use-auth0-hooks';
import { Controller, useForm } from "react-hook-form";
import ReactHookFormSelect from '../forms/customControls/ReactHookFormSelect';
import { getTaxes } from '../../services/admin/taxService';
import Tax from '../../models/tax';
import { updateExpense } from '../../services/expenseService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    }),
);

export const UpdateExpense = ({
    expense, config
}) => {
    const classes = useStyles();
    const { accessToken } = useAuth({
        audience: config.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [taxes, setTaxes] = useState([]);

    const { register, handleSubmit, control } = useForm();

    useEffect(() => {
        if (expenseTypes.length == 0 && accessToken) {
            getExpenseTypes(accessToken, expense.orgId, config)
                .then((data: ExpenseType[]) => {
                    return data;
                })
                .then(setExpenseTypes);
        }

        if (taxes.length == 0 && accessToken) {
            getTaxes(accessToken, expense.orgId, config)
                .then((data: Tax[]) => {
                    return data;
                })
                .then(setTaxes);
        }
    });

    const onSubmit = data => {
        updateExpense(
            expense.sheetId,
            expense.id,
            accessToken,
            data,
            config
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            {/* TODO: Souci avec le time zone lorsv de la sauvegarde */}
            <Controller
                render={({ onChange, value }) => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            value={value}
                            variant="inline"
                            format="dd/MM/yyyy"
                            label="Date"
                            onChange={onChange}
                        />
                    </MuiPickersUtilsProvider>
                )}
                defaultValue={expense.date}
                control={control}
                name="date"
                placeholder="Date"
            />
            <ReactHookFormSelect className={classes.formControl}
                defaultValue={expense.type}
                id="expense-type"
                name="type"
                label="Choose an expense type"
                control={control}
            >
                {expenseTypes.map((expt) => (
                    <MenuItem key={expt.id} value={expt.id}>
                        {expt.i18n?.fr?.name}
                    </MenuItem>
                ))}
            </ReactHookFormSelect>
            <TextField name="source" id="source" inputRef={register} label="Source" defaultValue={expense.source} />
            <br />
            <TextField name="amount" id="amount" inputRef={register({ valueAsNumber: true })} label="Amount" defaultValue={expense.amount.value} />
            <ReactHookFormSelect className={classes.formControl}
                defaultValue={expense.amount.tax?.id}
                id="tax"
                name="tax"
                label="Choose a tax"
                control={control}>
                {taxes.map((tax) => (
                    <MenuItem key={tax.id} value={tax.id}>
                        {tax.i18n?.fr?.name} - {tax.code}
                    </MenuItem>
                ))}
            </ReactHookFormSelect>
            <TextField name="taxAmount" id="tax-amount" inputRef={register({ valueAsNumber: true })} label="Tax" defaultValue={expense.amount.tax?.amount} />
            <TextField name="currency" id="currency" inputRef={register} label="Currency" defaultValue={expense.amount.curr} />
            <div>
                <FormControl variant="outlined">
                    <Button type="submit" color="primary" variant="outlined">
                        Save
                    </Button>
                </FormControl>
            </div>
        </form >
    )
}
