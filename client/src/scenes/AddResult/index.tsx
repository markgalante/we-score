import * as React from 'react';
import {
  useParams,
} from 'react-router-dom';

import {
  type TeamInfo,
  useSubmitScore,
  useLeagueTable,
} from '../../hooks'

export const AddResult = () => {
  const params = useParams();
  const {postLeagueResult} = useSubmitScore();
  const leagueTable = useLeagueTable(params.leagueId ?? '');
  const [homeTeam, setHomeTeam] = React.useState<undefined | TeamInfo>();
  const [homeTeamId, setHomeTeamId] = React.useState<undefined | string>();
  const [homeScore, setHomeScore] = React.useState<number>(0);
  const [awayTeam, setAwayTeam] = React.useState<undefined | TeamInfo>();
  const [awayTeamId, setAwayTeamId] = React.useState<undefined | string>();
  const [awayScore, setAwayScore] = React.useState<number>(0);

  const handleHomeTeam = (e: any) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');  
    setHomeTeamId(option);
    setHomeTeam(e.target.value);
  };
  const handleAwayTeam = (e: any) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id'); 
    setAwayTeamId(option); 
    setAwayTeam(e.target.value);
  };
  const handleHomeScore = (e: any) => {
    setHomeScore(e.target.value);
  }
  const handleAwayScore = (e: any) => {
    setAwayScore(e.target.value);
  }

  const handleScoreSubmit = () => {
    postLeagueResult({
      awayScore,
      awayTeam: awayTeamId ?? '',
      homeScore,
      homeTeam: homeTeamId ?? '',
      league: params.leagueId ?? '',
    })
  }

  return (
    <div>
      <div style={{display: 'flex'}}>
        <select value={homeTeam?.name} onChange={handleHomeTeam}>
          <option></option>
          {
            leagueTable.data.map(team => (
              <option key={team._id} id={team._id}>{team.name}</option>
            ))
          }
        </select>
        <input type='number' value={homeScore} onChange={handleHomeScore} />
        <input type='number' value={awayScore} onChange={handleAwayScore} />
        <select value={awayTeam?.name} onChange={handleAwayTeam}>
          <option></option>
          {
            leagueTable.data.map(team => (
              <option key={team._id} id={team._id}>{team.name}</option>
            ))
          }
        </select>
      </div>
      <button
        disabled={!homeTeamId || !awayTeamId || homeTeamId === awayTeamId}
        onClick={handleScoreSubmit}
      >
        Submit Score
      </button>
    </div>
  )
}