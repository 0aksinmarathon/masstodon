import { container } from 'tsyringe';
import Board from './components/Board';
import { TodoRepository } from './repositories/supabase/todo.repository';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
	container.register('TodoRepository', TodoRepository);
	console.log('App');
	return (
		<div className='text-xl'>
			<Header />
			<div className='flex'>
				<SideBar />
				<Board />
			</div>
		</div>
	);
}

export default App;
