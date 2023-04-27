import { ReactElement } from 'react';
import classes from 'src/App.module.scss';
import { NbaTeamSelector } from 'src/components/NbaTeamSelector.tsx';
import { TeamCard } from 'src/components/TeamCard.tsx';
import { useTrackedTeams } from 'src/hooks/trackedTeams.ts';
import { Team } from 'src/utils/types.ts';

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
