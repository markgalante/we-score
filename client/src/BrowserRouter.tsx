import * as React from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import {ViewLeagues, LeagueTable} from './scenes'

export function BrowserRouter(){
  return (
    <Router>
        <Routes>
          <Route path='/' element={<ViewLeagues />} />
          <Route path='/rankings/:leagueId' element={<LeagueTable />}/>
        </Routes>
    </Router>
  )
}