import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/App.tsx';
import { TrackedTeamsProvider } from 'src/components/TrackedTeamsProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<TrackedTeamsProvider>
			<App/>
		</TrackedTeamsProvider>
	</React.StrictMode>,
);
