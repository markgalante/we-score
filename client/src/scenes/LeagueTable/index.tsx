import {
  useParams,
} from 'react-router-dom';

import {
  useLeagueTable,
  useLeagueInfo,
} from 'hooks'

export const LeagueTable = () => {
  const params = useParams();
  const leagueTable = useLeagueTable(params.leagueId ?? '6361725adcb6552c40994403')
  const leagueInfo = useLeagueInfo(params.leagueId ?? '6361725adcb6552c40994403')

  if((leagueTable.data ?? []).length && leagueInfo.data){
    return (
      <div>
        <h2>{leagueInfo.data.name}</h2>
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
