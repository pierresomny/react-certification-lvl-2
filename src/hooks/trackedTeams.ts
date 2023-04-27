import { useContext } from 'react';
import { TrackedTeamsContext, TrackedTeamsContextType } from '../TrackedTeamsProvider.tsx';

export const useTrackedTeams = () => {
	const context: TrackedTeamsContextType | null = useContext(TrackedTeamsContext);

	// Must check if context is set.
	if (!context) {
		throw new Error('useTeams must be used within a TrackedTeamsProvider');
	}

	return context;
};