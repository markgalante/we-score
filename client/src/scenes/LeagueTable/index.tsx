import * as React from 'react';
import {
  useLeagueTable,
} from '../../hooks'

export const LeagueTable = () => {
  const leagueTable = useLeagueTable('6361725adcb6552c40994403')

  if((leagueTable.data ?? []).length){
    return (
      <div>
        <h2>League Table</h2>
        <ul>
          {
            leagueTable.data.map((team, idx) => {
              return <li key={team._id}>{idx + 1} {team.name} {team.points}</li>
            })
          }
        </ul>
      </div>
    );
  }

  return null;
}
