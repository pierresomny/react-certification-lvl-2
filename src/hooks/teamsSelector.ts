import { useEffect, useState } from 'react';
import { fetchAllPages } from '../utils/fetch.ts';
import { Team } from '../utils/types.ts';

export const useTeamsSelector = (): {
	teams: Team[],
	selectedTeam: Team | undefined,
	setSelectedTeam: (team: Team | undefined) => void
} => {
	const [ teams, setTeams ] = useState<Team[]>([]);
	const [ selectedTeam, setSelectedTeam ] = useState<Team>();

	useEffect(() => {
		fetchAllPages<Team>('teams')
			.then((teams: Team[]) => {
				setTeams(teams);
				setSelectedTeam(teams.pop());
			});
	}, []);

	return { teams, selectedTeam, setSelectedTeam };
};