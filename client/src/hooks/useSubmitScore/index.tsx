import {
  useMutation,
} from '@tanstack/react-query';
import axios from 'axios';
import {
  useNavigate,
} from 'react-router-dom'

import {
  PostResultArgs
} from '../types';

const postResult = async (args: PostResultArgs) => {
  return axios.post('http://localhost:8001/register-match', {
    ...args
  })
};

export const useSubmitScore = () => {
  const navigate = useNavigate();
  const mutation = useMutation<
    any,
    any,
    PostResultArgs,
    any
  >(args => postResult(args), {
    onSuccess: () => {
      navigate(-1);
    }
  });
  const postLeagueResult = (args: PostResultArgs) => {
    mutation.mutateAsync(args);
  }
  return {
    postLeagueResult,
  }
}

export {};