import {FC} from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Users from './pages/Users';

const App: FC = () => (
<QueryClientProvider client={new QueryClient()}>
  <BrowserRouter>
	<Routes>
	  <Route path="/login" element={<Login />} />
	  <Route path="/register" element={<Register />} />
	  <Route path="/users" element={<Users />} />
	</Routes>
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
);

export default App; 
