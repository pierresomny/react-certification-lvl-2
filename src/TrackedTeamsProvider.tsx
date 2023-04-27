import { createContext, ReactElement, ReactNode, useState } from 'react';
import { Team } from './utils/types.ts';

export interface TrackedTeamsContextType {
	trackedTeams: Team[];
	addTeam: (team: Team) => void;
	removeTeam: (team: Team) => void;
}

export const TrackedTeamsContext = createContext<TrackedTeamsContextType | null>(null);

interface TrackedTeamsProviderProperties {
	children: ReactNode;
}

export const TrackedTeamsProvider = ({ children }: TrackedTeamsProviderProperties): ReactElement => {
	// This state regroup all tracked team.
	const [ trackedTeams, setTrackedTeams ] = useState<Team[]>([]);

	/**
	 * Add a team to the current state
	 * @param {Team} team
	 */
	const addTeam = (team: Team): void => {
		setTrackedTeams([ ...trackedTeams, team ]);
	};

	/**
	 * Remove a team from the current state
	 * @param {Team} deleted_team
	 */
	const removeTeam = (deleted_team: Team): void => {
		setTrackedTeams(trackedTeams.filter((team: Team): boolean => team !== deleted_team));
	};

	return (
		<TrackedTeamsContext.Provider value={ { trackedTeams, addTeam, removeTeam } }>
			{ children }
		</TrackedTeamsContext.Provider>
	);
};