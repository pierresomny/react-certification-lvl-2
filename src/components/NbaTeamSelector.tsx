import { ChangeEvent, ReactElement, useState } from 'react';
import classes from 'src/components/NbaTeamSelector.module.scss';
import { useTeams } from 'src/hooks/teams.ts';
import { useTrackedTeams } from 'src/hooks/trackedTeams.ts';
import { Team } from 'src/utils/types.ts';

export function NbaTeamSelector(): ReactElement {
	const teams: Team[] = useTeams();
	const { trackedTeams, addTeam } = useTrackedTeams();
	const [ selectedTeam, setSelectedTeam ] = useState<Team>();

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		setSelectedTeam(teams.find((team: Team): boolean => team.id === Number(event.target.value)));
	};

	const handleTeamAdd = (): void => {
		if (selectedTeam)
			addTeam(selectedTeam);
		else
			alert('Select a team first');
	};

	return <div className={ classes.selector }>
		<select onChange={ handleSelectChange } defaultValue={ teams
			.find((team: Team) => !trackedTeams.includes(team))?.id }>
			{ teams
				.filter((team: Team) => !trackedTeams.includes(team))
				.map((team: Team) => <option key={ team.id } label={ team.full_name }
				                             value={ team.id }></option>) }
		</select>
		<button onClick={ handleTeamAdd }>Track team</button>
	</div>;
}