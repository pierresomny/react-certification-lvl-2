import { useEffect, useState } from 'react';
import { fetchAllPages } from '../utils/fetch.ts';
import { Team } from '../utils/types.ts';

export const useTeams = (): Team[] => {
	const [ teams, setTeams ] = useState<Team[]>([]);

	useEffect(() => {
		fetchAllPages<Team>('teams').then((teams: Team[]) => setTeams(teams));
	}, []);

	return teams;
};