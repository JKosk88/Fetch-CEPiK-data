import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataContext } from './DataContext';

const columns = [
    { id: 'mark', label: 'Mark', minWidth: 170 },
    { id: 'model', label: 'Model', minWidth: 100 },
    { id: 'production', label: 'Production year', minWidth: 100 },
    { id: 'engine', label: 'Engine', minWidth: 170 },
    { id: 'fuel', label: 'Fuel', minWidth: 170 },
    { id: 'mass', label: 'Mass', minWidth: 170 },
];

const useStyles = makeStyles({
    container: {
        height: '100%',
    },
    spinner: {
        margin: '20px 0',
    },
});

export default function DataTable({ rowsLoading, querySent, error }) {
    const [data, setData] = useContext(DataContext);
    const classes = useStyles();

    return (
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                align={column.label === 'Mark' || column.label === 'Model' ? 'left' : 'right'}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {(rowsLoading && querySent)
                    ? <TableBody>
                        <TableCell>

                        </TableCell>
                        <TableCell>
                            <CircularProgress />
                        </TableCell>
                    </TableBody>
                    : (!rowsLoading && querySent)
                        ? (!error)
                            ? <TableBody>
                                {data.map((row) => {
                                    return (
                                        <Row row={row} />
                                    );
                                })}
                            </TableBody>
                            : <TableBody>
                                <TableCell>

                                </TableCell>
                                <TableCell>
                                    Error occured during fetching data. Try again.
                                </TableCell>
                            </TableBody>
                        : ''
                }
            </Table>
        </TableContainer >
    );
}


const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({
        registration: '',
        region: '',
        engine: '',
        weight: '',
        type: ''
    });

    const convertData = (data) => {
        let detailsData = {
            registration: data['data-pierwszej-rejestracji'],
            region: data['rejestracja-wojewodztwo'] + ' / ' + data['rejestracja-powiat'] + ' / ' + data['rejestracja-gmina'],
            engine: data['moc-netto-silnika'],
            weight: data['dopuszczalna-masa-calkowita'],
            type: data['rodzaj-pojazdu'],
        }

        return detailsData;
    }

    const openDetails = link => {
        if (!open) {
            fetch(link)
                .then(response => response.json())
                .then(response => response.data.attributes)
                .then(data => setDetails(convertData(data)))
        }
        setOpen(!open);
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => openDetails(row.link)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.mark}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell align='right'>{row.production}</TableCell>
                <TableCell align='right'>{row.engine} {row.engine && 'cc'} </TableCell>
                <TableCell align='right'>{row.fuel}</TableCell>
                <TableCell align='right'>{row.mass} {row.mass && 'kg'}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit style={{ backgroundColor: '#eee', padding: '10px', margin: '10px 15px' }}>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First registration</TableCell>
                                        <TableCell>Registration region</TableCell>
                                        <TableCell>Engine kW</TableCell>
                                        <TableCell>Permissible gross weight</TableCell>
                                        <TableCell>Type</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell >{details.registration}</TableCell>
                                        <TableCell >{details.region}</TableCell>
                                        <TableCell >{details.engine}</TableCell>
                                        <TableCell >{details.weight}</TableCell>
                                        <TableCell >{details.type}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}