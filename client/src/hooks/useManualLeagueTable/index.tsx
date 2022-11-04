import axios from 'axios';
import {
  useQuery,
} from '@tanstack/react-query';
import {
  ManualLeagueTableItem
} from '../types'

// import results from '../../results.json';

export const fetchManualLeagueTable = async () => 
  await (await axios.get(`http://localhost:8001/input-league`)).data?.data

type UseLeaguesResult = {
  data: Array<ManualLeagueTableItem>;
  error: unknown;
  status: "error" | "success" | "loading";
}

export const useCustomLeagueTable = (): UseLeaguesResult => {
  const {
    data,
    error,
    status,
  } = useQuery(['manual-league-table'] , fetchManualLeagueTable)
  return {
    data,
    error,
    status,
  }
}