import { container } from 'tsyringe';
import Board from './components/Board';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { TodoRepository } from './repositories/supabase/todo.repository';

function App() {
	container.register('TodoRepository', TodoRepository);
	console.log('App');
	return (
		// <LocalizationProvider dateAdapter={AdapterDateFns}>
		<div className='text-xl'>
			<Header />
			<div className='flex'>
				<SideBar />
				<Board />
			</div>
		</div>
		// </LocalizationProvider>
	);
}

export default App;
