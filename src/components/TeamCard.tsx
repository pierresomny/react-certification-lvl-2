import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResults } from '../hooks/results.ts';
import { useTrackedTeams } from '../hooks/trackedTeams.ts';
import { Game, Team } from '../utils/types.ts';
import { GameResultIcon } from './GameResultIcon.tsx';
import classes from './TeamCard.module.scss';

interface TeamCardProperties {
	team: Team;
}

export const TeamCard = ({ team }: TeamCardProperties): ReactElement => {
	const games: Game[] = useResults(team);
	const { removeTeam } = useTrackedTeams();
	const navigate = useNavigate();
	// Calculate scores.
	const avgPtsScored: number = Math.round(games.reduce((average: number, game: Game) => average + (
		game.home_team.id === team.id ? game.home_team_score : game.visitor_team_score
	), 0) / games.length);

	const avgPtsConcerned: number = Math.round(games.reduce((average: number, game: Game) => average + (
		game.home_team.id === team.id ? game.visitor_team_score : game.home_team_score
	), 0) / games.length);

	const displayScore = (): ReactElement => {
		if (games.length === 0) return <p>No current results</p>;
		return <div className={ classes.score }>
			<p>Results of past 12 days:</p>
			<div className={ classes.lastGames }>
				{
					games.map((game: Game) => <GameResultIcon key={ game.id } game={ game } team={ team }/>)
				}
			</div>
			<p>Avg pts scored: { avgPtsScored }</p>
			<p>Avg pts concerned: { avgPtsConcerned } </p>
		</div>;
	};

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
			{
				displayScore()
			}
			<img className={ classes.logo } src={ `https://interstate21.com/nba-logos/${ team.abbreviation }.png` }
			     alt={ `${ team.full_name } logo` }/>
		</div>
		<button onClick={ () => navigate(`results/${ team.id }`) }>
			See game results
		</button>
	</div>;
};
