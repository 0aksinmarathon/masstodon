import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { container } from 'tsyringe';
import Board from './components/Board';
import Header from './components/Header';
import List from './components/List';
import NotFound from './components/NotFound';
import SideBar from './components/SideBar';
import { TodoRepository } from './repositories/supabase/todo.repository';

function App() {
	container.register('TodoRepository', TodoRepository);
	console.log('App');
	return (
		<div className='text-xl'>
			<Header />
			<div className='flex'>
				<BrowserRouter>
					<SideBar />
					<Routes>
						<Route path='/' element={<Board />} />
						<Route path='list' element={<List />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
