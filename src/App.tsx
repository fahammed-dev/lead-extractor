import { Route, Routes } from 'react-router-dom';
import Data from './pages/Data';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
	return (
		<>
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<Data />} path="/data" />
				<Route element={<NotFound />} path="*" />
			</Routes>
		</>
	);
}

export default App;
