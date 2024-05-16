import {FC} from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

const App: FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	</BrowserRouter>
);

export default App; 
