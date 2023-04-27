import { useEffect, useState } from 'react';
import { fetchAllPages } from 'src/utils/fetch.ts';
import { Game, Team } from 'src/utils/types.ts';

export const useResult = (team: Team) => {
	const [ games, setGames ] = useState<Game[]>([]);

	/**
	 * Construct param for dates
	 * 12 past days
	 * @returns {[string, string][]}
	 */
	const getLast12Days = (): [ string, string ][] => {
		return Array.from({ length: 12 }, (_, i: number) => {
			            const date = new Date();
			            date.setDate(date.getDate() - i);
			            return date;
		            })
		            .reverse()
		            .reduce((result: [ string, string ][], date: Date): [ string, string ][] => {
			            return [
				            ...result,
				            [
					            'dates[]',
					            date.toLocaleDateString('en-CA'),
				            ],
			            ];
		            }, []);
	};

	useEffect(() => {
		fetchAllPages<Game>('games', 1, [
			[ 'team_ids[]', team.id ],
			...getLast12Days(),
		]).then((games: Game[]) => setGames(games));
	}, []);

	return games;
};