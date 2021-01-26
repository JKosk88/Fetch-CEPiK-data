import React, { useState, createContext, useEffect } from 'react';
import App from './App';
import DataTable from './Table';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [data, setData] = useState();

    return (
        <DataContext.Provider value={[data, setData]}>
            {props.children}
        </DataContext.Provider>
    )
}