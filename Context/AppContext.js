import React from 'react';

export const AppContext = React.createContext({
  message: {
    status: false,
    title: '',
    content: '',
    type: 'error',
    set: () => {},
  },
  login: false,
  loaded: false,
  setLogin: () => {},
  setLoaded: () => {},
});
