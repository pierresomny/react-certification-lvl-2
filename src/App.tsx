import { ReactElement } from 'react';
import classes from './App.module.scss';
import { NbaTeamSelector } from './components/NbaTeamSelector.tsx';
import { TeamCard } from './components/TeamCard.tsx';
import { useTrackedTeams } from './hooks/trackedTeams.ts';
import { Team } from './utils/types.ts';

export function App(): ReactElement {

	const { trackedTeams } = useTrackedTeams();

	return (
		<div className={ classes.app }>
			<h1>NBA Score Tracking App</h1>
			<NbaTeamSelector/>
			<div className={ classes.content }>
				{ trackedTeams.map((team: Team, key: number) => <TeamCard key={ key } team={ team }/>) }
			</div>
		</div>
	);
}
