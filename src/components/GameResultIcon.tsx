import { ReactElement } from 'react';
import { Game, Team } from '../utils/types.ts';
import classes from './GameResultIcon.module.scss';

interface GameResultIconProperties {
	game: Game;
	team: Team;
}

export const GameResultIcon = ({ game, team }: GameResultIconProperties): ReactElement => {
	const winner: Team = game.home_team_score > game.visitor_team_score ? game.home_team : game.visitor_team;

	return <span className={ winner.id === team.id ? classes.win : classes.lose }>{ winner.id === team.id
	                                                                                ? 'W'
	                                                                                : 'L' }</span>;
};