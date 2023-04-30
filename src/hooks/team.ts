import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetch.ts';
import { Game, Team } from '../utils/types.ts';
import { useResults } from './results.ts';

interface useTeamOutputs {
	team: Team | undefined,
	games: Game[]
}

export const useTeam = (teamCode: string): useTeamOutputs => {
	const [ team, setTeam ] = useState<Team>();
	const [ games, setGames ] = useState<Game[]>([]);

	useEffect(() => {
		fetchData(`teams/${ teamCode }`).then((team: Team) => setTeam(team));
	}, []);

	useEffect(() => {
		if (team)
			setGames(useResults(team));
	}, [ team ]);

	return { team, games };
};