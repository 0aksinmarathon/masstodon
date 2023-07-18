import { container } from 'tsyringe';
import { ITodoRepository } from '../todo.repository.interface';
import { supabase } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export class TodoRepository implements ITodoRepository {
	private supabase: SupabaseClient = supabase;
	constructor() {
		console.log('constructor');
	}

	async getTodoDetail(id: number) {
		console.log('getTodoDetail');
		const { data, error } = await this.supabase
			.from('todos')
			.select('*')
			.eq('id', id)
			.is('deleted_at', null);

		if (error) throw new Error('failed to get todo detail');
		return data;
	}

	async getMyTodoList() {
		const {} = await fetch(``);
	}

	async getTodoList() {
		const {} = await fetch(``);
	}

	async addTodo() {
		const {} = await fetch(``);
	}

	async deleteTodo() {
		const {} = await fetch(``);
	}

	async updateTodo() {
		const {} = await fetch(``);
	}

	async addComment() {
		const {} = await fetch(``);
	}

	async updateComment() {
		const {} = await fetch(``);
	}

	async deleteComment() {
		const {} = await fetch(``);
	}
}

container.register('TodoRepository', {
	useClass: TodoRepository,
});
