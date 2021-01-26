import React from 'react';
import './App.css'
import { InputLabel } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: '16px 15px 8px 0',
        width: '250px',
        textAlign: 'left',
    }
}));

const RegionDropdown = ({ items, isLoading, onChange, value, error }) => {

    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const handleChange = e => {
        onChange(e);
    }

    const classes = useStyles();

    return (
        <div className='region'>
            {isLoading
                ? <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Region</InputLabel>
                    <Select
                        value={value}>
                    </Select>
                    <FormHelperText>Loading ..</FormHelperText>
                </FormControl>
                : !error ?
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            onChange={handleChange}
                        >
                            {items.map(el => {
                                return (
                                    <MenuItem key={el['klucz-slownika']} value={el['klucz-slownika']} >
                                        {capitalizeFirstLetter(el['wartosc-slownika'])}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        {isLoading && <FormHelperText>Loading ..</FormHelperText>}
                    </FormControl>
                    : <FormControl className={classes.formControl} error={true}>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select>
                        </Select>
                        <FormHelperText>Error occured. Refresh page.</FormHelperText>
                    </FormControl>
            }
        </div>
    )
}

export default RegionDropdown;