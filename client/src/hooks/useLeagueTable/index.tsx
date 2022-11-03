import * as React from 'react';
import {
  useQuery
} from '@tanstack/react-query';
import axios from 'axios';

import {
  LeagueTableData
} from './types';

const fetchLeagueTable = async ({
  leagueId
}: {
  leagueId: string;
}) => 
  await (await axios.get(`http://localhost:8001/rankings/${leagueId}`)).data?.data

type UseLeagueTableResult = {
  data: LeagueTableData,
  error: unknown;
  status: "error" | "success" | "loading"
}

export const useLeagueTable = (
  leagueId: string
  ): UseLeagueTableResult => {
  const {
    data,
    error,
    status,
  } = useQuery([leagueId] ,() => fetchLeagueTable({leagueId}))
  return {
    data,
    error,
    status,
  }
}