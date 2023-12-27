import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { IHttp } from '../helpers/HttpAdapter';
import { Board } from '../pages/Board/Index';
import { BoxStreet } from '../pages/Box-Street';

export function RoutesApp({ http }: { http: IHttp }) {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Board />}
				/>
				<Route
					path='/street'
					element={<BoxStreet />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
