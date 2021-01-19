import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const ResultsPerPageSlider = ({ onChange, value }) => {

    const marks = [
        {
            value: 100,
            label: '100',
        },
        {
            value: 200,
            label: '200',
        },
        {
            value: 300,
            label: '300',
        },
        {
            value: 400,
            label: '400',
        },
        {
            value: 500,
            label: '500',
        },
    ];

    const handleChange = (e, newValue) => {
        onChange(newValue);
    }

    const useStyles = makeStyles(theme => ({
        slider: {
            margin: '16px 15px 8px 15px',
            width: '250px',
            textAlign: 'left',
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.slider}>
            <Typography id="continuous-slider" gutterBottom>
                Results per page
            </Typography>
            <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" valueLabelDisplay="auto" min={100} max={500} step={50} marks={marks} />
        </div>
    )
}

export default ResultsPerPageSlider;
