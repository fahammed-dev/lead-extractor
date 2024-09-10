import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
	return (
		<>
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<NotFound />} path="*" />
			</Routes>
		</>
	);
}

export default App;
