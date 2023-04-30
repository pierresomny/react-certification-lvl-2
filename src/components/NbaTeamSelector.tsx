import { ChangeEvent, ReactElement } from 'react';
import { useTeamsSelector } from '../hooks/teamsSelector.ts';
import { useTrackedTeams } from '../hooks/trackedTeams.ts';
import { Team } from '../utils/types.ts';
import classes from './NbaTeamSelector.module.scss';

export function NbaTeamSelector(): ReactElement {
	const { teams, selectedTeam, setSelectedTeam } = useTeamsSelector();
	const { trackedTeams, addTeam } = useTrackedTeams();

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		setSelectedTeam(teams.find((team: Team): boolean => team.id === Number(event.target.value)));
	};

	const handleTeamAdd = (): void => {
		if (selectedTeam) {
			addTeam(selectedTeam);
			// Then select next non-tracked teams
			return setSelectedTeam(teams.filter((team: Team) => trackedTeams.filter((trackedTeam: Team): boolean => trackedTeam.id === team.id).length === 0 && team.id !== selectedTeam.id)
			                            .pop());
		}
		alert('Select a team first');
	};

	return <div className={ classes.selector }>
		<select id={ 'teamSelect' } onChange={ handleSelectChange } value={ selectedTeam?.id }>
			{ teams
				.filter((team: Team) => trackedTeams.filter((trackedTeam: Team): boolean => trackedTeam.id === team.id).length === 0)
				.map((team: Team) => <option key={ team.id } label={ team.full_name }
				                             value={ team.id }></option>) }
		</select>
		<button id={ 'trackBtn' } onClick={ handleTeamAdd }>Track team</button>
	</div>;
}