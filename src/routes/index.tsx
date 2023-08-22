import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { IHttp } from '../helpers/HttpAdapter';
import { Board } from '../pages/Board/Index';

export function RoutesApp({ http }: { http: IHttp }) {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Board />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
