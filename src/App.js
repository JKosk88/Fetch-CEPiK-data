import { useEffect, useState, useContext } from 'react';
import './App.css';
import RegionDropdown from './RegionDropdown';
import DateTypeDropdown from './DateTypeDropdown';
import Datepicker from './Datepicker';
import DataTable from './Table';
import TableFooterPagination from './TableFooterPagination';
import NearMeIcon from '@material-ui/icons/NearMe';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ResultsPerPageSlider from './ResultsPerPageSlider';
import { DataContext } from './DataContext';
import ErrorModal from './Error';

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: '16px 0 8px 30px',
    maxHeight: '50px',
    backgroundColor: '#224499',

    '&:hover': {
      backgroundColor: '#4466bb'
    }
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

function App() {
  const [regions, setRegions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 2)));
  const [region, setRegion] = useState('XX');
  const [regionsError, setRegionsError] = useState(false);
  const [dateType, setDateType] = useState('1');
  const [dataError, setDataError] = useState(false);
  const [querySent, setQuerySent] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(100);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  const [data, setData] = useContext(DataContext)

  const maxDate = new Date(new Date(dateFrom).setFullYear(new Date(dateFrom).getFullYear() + 2));
  const classes = useStyles();

  const handleDateFromChange = value => setDateFrom(value);
  const handleDateToChange = value => setDateTo(value);
  const handleRegionChange = e => setRegion(e.target.value);
  const handleDateTypeChange = e => setDateType(e.target.value);
  const handleResultsPerPageChange = value => setResultsPerPage(value);

  const formatDate = date => {
    let year = `${date.getFullYear()}`;
    let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    return year + month + day;
  }

  const createData = (mark, model, production, engine, fuel, mass, link) => {
    return { mark, model, production, engine, fuel, mass, link };
  }

  const changePage = value => {
    setPage(page + value)
  }

  const firstPage = () => {
    setPage(1);
  }

  const lastPage = () => {
    setPage(pages);
  }

  useEffect(() => {
    if (querySent) {
      sendRequest();
    }
  }, [page])

  const sendRequest = () => {
    setDataError(false);
    let url = `https://api.cepik.gov.pl/pojazdy?wojewodztwo=${region}&data-od=${formatDate(dateFrom)}&data-do=${formatDate(dateTo)}&typ-daty=${dateType}&limit=${resultsPerPage}&page=${page}`
    let _rows = [];
    setRowsLoading(true);
    setQuerySent(true);
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setPages(Math.ceil(response.meta.count / resultsPerPage));
        response.data.map(car => {
          _rows.push(createData(car['attributes']['marka'], car['attributes']['model'], car['attributes']['rok-produkcji'], car['attributes']['pojemnosc-skokowa-silnika'], car['attributes']['rodzaj-paliwa'], car['attributes']['masa-wlasna'], car['links']['self']));
        })
      })
      .then(() => setData(_rows))
      .then(() => setRowsLoading(false))
      .catch(err => {
        setDataError(true);
        console.log(err);
      })
  }

  useEffect(() => {
    setRegionsError(false)
    fetch('https://api.cepik.gov.pl/slowniki/wojewodztwa')
      .then(response => response.json())
      .then(resp => {
        return resp.data.attributes['dostepne-rekordy-slownika'];
      })
      .then(data => {
        setRegions(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setRegionsError(true);
      })
  }, []);

  return (
    <div className={classes.app}>
      <div className={classes.form}>
        <RegionDropdown value={region} onChange={handleRegionChange} items={regions} isLoading={isLoading} error={regionsError} />
        <Datepicker value={dateFrom} onChange={handleDateFromChange} label='From *' maxDate={new Date()} />
        <DateTypeDropdown value={dateType} onChange={handleDateTypeChange} />
        <Datepicker value={dateTo} onChange={handleDateToChange} label='To *' maxDate={maxDate} />
        <ResultsPerPageSlider value={resultsPerPage} onChange={handleResultsPerPageChange} />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={sendRequest}
          endIcon={<NearMeIcon />}
          disabled={(regionsError)}
        >
          Send
        </Button>
      </div>
      {regionsError ?
        <ErrorModal open={false} hint={'Error occured when fetching regions data. Refrech page and try again.'} />
        : dataError ?
          <ErrorModal open={false} hint={'Error occured when fetching data. Send request and try again'} />
          : <DataTable rowsLoading={rowsLoading} querySent={querySent} error={dataError} />
      }
      {(querySent && !isLoading && !rowsLoading && !dataError && !regionsError) && <TableFooterPagination nextPage={() => changePage(1)} prevPage={() => changePage(-1)} pages={pages} page={page} firstPage={firstPage} lastPage={lastPage} />}
    </div>
  );
}

export default App;
