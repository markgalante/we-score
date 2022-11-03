import axios from 'axios';
import {
  useQuery,
} from '@tanstack/react-query';
import {
  LeagueInfoType
} from '../types'

const fetchLeagues = async () => 
  await (await axios.get(`http://localhost:8001/leagues`)).data?.data

type UseLeaguesResult = {
  data: Array<LeagueInfoType>;
  error: unknown;
  status: "error" | "success" | "loading";
}

export const useLeagues = (): UseLeaguesResult => {
  const {
    data,
    error,
    status,
  } = useQuery(['leagues'] , fetchLeagues)
  return {
    data,
    error,
    status,
  }
}