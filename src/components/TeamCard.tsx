import { ReactElement } from 'react';
import { GameResultIcon } from '../components/GameResultIcon.tsx';
import { useResult } from '../hooks/result.ts';
import { useTrackedTeams } from '../hooks/trackedTeams.ts';
import { Game, Team } from '../utils/types.ts';
import classes from './TeamCard.module.scss';

interface TeamCardProperties {
	team: Team;
}

export const TeamCard = ({ team }: TeamCardProperties): ReactElement => {
	const games: Game[] = useResult(team);
	const { removeTeam } = useTrackedTeams();
	// Calculate scores.
	const avgPtsScored: number = games.reduce((average: number, game: Game) => average + (
		game.home_team.id === team.id ? game.home_team_score : game.visitor_team_score
	), 0) / games.length;

	const avgPtsConcerned: number = games.reduce((average: number, game: Game) => average + (
		game.home_team.id === team.id ? game.visitor_team_score : game.home_team_score
	), 0) / games.length;

	return <div className={ classes.teamCard }>
		<div className={ classes.header }>
			<div className={ classes.title }>
				<p>{ team.full_name } [{ team.abbreviation }]</p>
				<span>{ team.conference }</span>
			</div>
			<button onClick={ () => removeTeam(team) }>x</button>
		</div>
		<hr/>
		<div className={ classes.content }>
			<div className={ classes.score }>
				<p>Results of past 12 days:</p>
				<div className={ classes.lastGames }>
					{
						games.map((game: Game) => <GameResultIcon key={ game.id } game={ game } team={ team }/>)
					}
				</div>
				<p>Avg pts scored: { avgPtsScored }</p>
				<p>Avg pts concerned: { avgPtsConcerned } </p>
			</div>
			<img className={ classes.logo } src={ `https://interstate21.com/nba-logos/${ team.abbreviation }.png` }
			     alt={ `${ team.full_name } logo` }/>
		</div>
		<button>
			See game results
		</button>
	</div>;
};
