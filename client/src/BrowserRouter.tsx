import * as React from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import {
  ViewLeagues,
  LeagueTable,
  AddResult,
  CustomLeagueTable,
} from './scenes'

export function BrowserRouter(){
  return (
    <Router>
        <Routes>
          <Route path='/' element={<ViewLeagues />} />
          <Route path='/rankings/:leagueId' element={<LeagueTable />}/>
          <Route path='/rankings/:leagueId/new-match' element={<AddResult />}/>
          <Route path='/custom-league-table' element={<CustomLeagueTable />}/>
        </Routes>
    </Router>
  )
}