import {
  useQuery
} from '@tanstack/react-query';
import axios from 'axios';

import {
  LeagueInfoType,
} from '../types';

type UseLeagueInfoResult = {
  data: LeagueInfoType;
  status: "error" | "success" | "loading";
  error: unknown;
}

const fetchLeague = async ({
  leagueId
}: {
  leagueId: string;
}) => 
  await (await axios.get(`http://localhost:8001/leagues/${leagueId}`)).data?.data;

export const useLeagueInfo = (
  leagueId: string = ''
): UseLeagueInfoResult => {
  const {
    data,
    error,
    status,
  } = useQuery(['league', leagueId] ,() => fetchLeague({leagueId}))
  return {
    data,
    error,
    status,
  }
}