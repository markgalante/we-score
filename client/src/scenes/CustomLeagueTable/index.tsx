import {
  useCustomLeagueTable,
  type ManualLeagueTableItem,
} from '../../hooks';

export const CustomLeagueTable = () => {
  const leagueTable = useCustomLeagueTable();
  console.log(leagueTable)
  if((leagueTable.data ?? []).length){
    return (
      <div>
        <h2>League Table</h2>
        <ol>
          {
            leagueTable.data.map((team: ManualLeagueTableItem, idx: number) => <li key={idx}>{team.team}, {team.points}</li>)
          }
        </ol>
      </div>
    );
  }

  return null;
}