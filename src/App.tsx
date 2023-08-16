import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { container } from 'tsyringe';
import { AuthProvider } from './common/provider/auth.provider';
import Board from './components/Board';
import Header from './components/Header';
import List from './components/List';
import NotFound from './components/NotFound';
import SideBar from './components/SideBar';
import { AuthRepository } from './repositories/supabase/auth.repository';
import { TodoRepository } from './repositories/supabase/todo.repository';

function App() {
	container.register('TodoRepository', TodoRepository);
	container.register('AuthRepository', AuthRepository);
	console.log('App');

	return (
		<BrowserRouter>
			<div className='text-xl'>
				<AuthProvider>
					<Header />
					<div className='flex'>
						<SideBar />
						<Routes>
							<Route path='/' element={<Board />} />
							<Route path='list' element={<List />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
				</AuthProvider>
			</div>
		</BrowserRouter>
	);
}

export default App;
