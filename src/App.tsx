import { ReactElement } from 'react';
import classes from 'src/App.module.scss';

export function App(): ReactElement {

	return (
		<div className={ classes.app }>
			<h1>NBA Score Tracking App</h1>
		</div>
	);
}
