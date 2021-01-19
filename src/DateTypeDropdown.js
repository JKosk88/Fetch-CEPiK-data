import React from 'react';
import './App.css'
import { InputLabel } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles'

const DateTypeDropdown = ({ onChange, value }) => {

    const handleChange = e => {
        onChange(e);
    }

    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: '16px 15px 8px 15px',
            width: '250px',
            textAlign: 'left',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Date type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={handleChange}
            >
                <MenuItem key={1} value={1} >Date of first registration in Poland</MenuItem>
                <MenuItem key={2} value={2} >Date of last registration in Poland</MenuItem>
            </Select>
        </FormControl>
    )
}

export default DateTypeDropdown;