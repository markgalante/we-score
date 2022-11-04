import * as React from 'react';
import {
  useLeagues
} from '../../hooks';

export const ViewLeagues = () => {
  const leagues = useLeagues();
  if ((leagues.data ?? []).length){
    return (
      <div>
        <h2>Leagues</h2>
        <ul>
          <li><a href='/custom-league-table'>Custom League Table</a></li>
            {
              leagues.data.map((league) => {
                return <li key={league._id}><a href={`/rankings/${league._id}`}>{league.name}</a></li>
              })
            }
          </ul>
      </div>
    )
  }
  return (
    <div>
      <h2>Leagues</h2>
    </div>
  )
}