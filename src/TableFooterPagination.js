import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Typography } from '@material-ui/core';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

const TableFooterPagination = ({ nextPage, prevPage, page, pages, lastPage, firstPage }) => {
    const classes = useStyles1();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <IconButton
                onClick={firstPage}
                disabled={page === 1}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={prevPage}
                disabled={page === 1}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <Typography>
                {page} / {pages}
            </Typography>
            <IconButton
                onClick={nextPage}
                disabled={page === pages}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={lastPage}
                disabled={page === pages}
                aria-label="first page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

export default TableFooterPagination;