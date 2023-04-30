import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App.tsx';
import './index.css';
import { ResultPage } from './ResultPage.tsx';
import { TrackedTeamsProvider } from './TrackedTeamsProvider.tsx';
import { fetchData } from './utils/fetch.ts';
import { Team } from './utils/types.ts';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <App/>,
		},
		{
			path: '/results/:teamCode',
			element: <ResultPage/>,
			loader: async ({ params }) => {
				const team: Team = await fetchData(`teams/${ params.teamCode }`).then((team: Team) => team);
				return { team };
			},
		},
	], {
		basename: '/react-certification-lvl-2',
	});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<h1 className={ 'main-title' }>NBA Score Tracking App</h1>
		<TrackedTeamsProvider>
			<RouterProvider router={ router }/>
		</TrackedTeamsProvider>
	</React.StrictMode>,
);
