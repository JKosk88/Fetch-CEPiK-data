import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: '16px 15px 8px 0',
        width: '250px',
        textAlign: 'left',
    }
}));

export default function Datepicker({ onChange, value, label, maxDate }) {

    const handleChange = (e) => {
        onChange(e);
    }

    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id={label}
                label={label}
                value={value}
                maxDate={maxDate}
                hintText='please'
                onChange={handleChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
