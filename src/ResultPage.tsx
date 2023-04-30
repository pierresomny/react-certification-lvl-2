import { useLoaderData, useNavigate } from 'react-router-dom';
import { useResults } from './hooks/results.ts';
import classes from './ResultPage.module.scss';
import { Game, Team } from './utils/types.ts';

export const ResultPage = () => {
	const { team } = useLoaderData() as { team: Team };
	const games: Game[] = useResults(team);
	const navigate = useNavigate();
	const displayGameRow = (game: Game) => {
		return <p>
			<b>{ game.home_team.abbreviation }</b>
			{ game.home_team_score } - { game.visitor_team_score }
			<b>{ game.visitor_team.abbreviation }</b>
		</p>;
	};

	return <div className={ classes.result }>
		<h2>{ team.full_name } [{ team.abbreviation }]</h2>
		<hr/>
		<p>Score of past 12 days :</p>
		{
			games.map((game: Game) => displayGameRow(game))
		}
		<button id={ 'backBtn' } onClick={ () => navigate('/') }>
			{ `<<` } Back to all team stats
		</button>
	</div>;
};