import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import {
  useLeagueTable,
  useLeagueInfo,
} from 'hooks';

export const LeagueTable = () => {
  const params = useParams();
  const navigate = useNavigate();
  const leagueTable = useLeagueTable(params.leagueId ?? '')
  const leagueInfo = useLeagueInfo(params.leagueId ?? '')
  const handleAddResultClick = () => {
    navigate('new-match');
  }
  if((leagueTable.data ?? []).length && leagueInfo.data){
    return (
      <div>
        <h2>{leagueInfo.data.name}</h2>
        <ol>
          {
            leagueTable.data.map(team => {
              return <li key={team._id}>{team.name} {team.points}</li>
            })
          }
        </ol>
        <button onClick={handleAddResultClick}>Add Result</button>
      </div>
    );
  }

  return null;
}
