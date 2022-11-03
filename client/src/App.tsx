import React from 'react';
import {
  QueryClientProvider, QueryClient
} from '@tanstack/react-query';

import './styles/App.css';
import './styles/colors.css';

import {
  LeagueTable
} from './scenes'

const queryClient = new QueryClient()

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <LeagueTable />
    </div>
  </QueryClientProvider>
  );
}

export default App;
