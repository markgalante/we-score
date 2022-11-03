import React from 'react';
import {
  QueryClientProvider, QueryClient
} from '@tanstack/react-query';

import './styles/App.css';
import './styles/colors.css';

import {BrowserRouter} from './BrowserRouter';

const queryClient = new QueryClient()

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <BrowserRouter />
    </div>
  </QueryClientProvider>
  );
}

export default App;
