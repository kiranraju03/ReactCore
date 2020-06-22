import React from 'react';

const contextProvider = React.createContext({
    //default values, as the values are set in the location where the provider is intialised
    autheticated: false,
    login: () => { }
});

export default contextProvider;