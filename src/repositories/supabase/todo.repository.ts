import { container, injectable, singleton } from 'tsyringe';
import { ITodoRepository } from '../todo.repository.interface';
import { supabase } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import ContinuousSlider from '../../components/Slider';

// @injectable()
export class TodoRepository implements ITodoRepository {
	private supabase: SupabaseClient = supabase;
	constructor() {
		console.log('constructor');
	}

	async getTodoDetail(id: number) {
		console.log('getTodoDetail');
		const { data, error } = await this.supabase
			.from('todos')
			.select(
				`
			*,
			tags ( id, name ),
			comments ( id, content, user: user_id (name, picture) ),
			likes ( user_id ),
			user: user_id ( name, picture )
			`
			)
			.eq('id', id)
			.is('deleted_at', null);
		if (error) throw new Error('failed to get todo detail');
		return data;
	}

	async getMyTodoList() {
		console.log('getMyTodoList');
		const { data, error } = await this.supabase
			.from('todos')
			.select(
				`
			*,
			tags ( id, name ),
			comments ( id ),
			likes ( user_id ),
			user: user_id ( name, picture )
			`
			)
			.is('deleted_at', null);
		console.log(data);
		if (error) throw new Error('failed to get my todo list');
		return {
			planning: data?.filter(({ status }) => status === 'planning'),
			workInProgress: data?.filter(({ status }) => status === 'workInProgress'),
			finished: data?.filter(({ status }) => status === 'finished'),
		};
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

	async updateTitle(todoId: number, title: string) {
		console.log('updateTitle');
		const { error } = await supabase
			.from('todos')
			.update({ title })
			.eq('id', todoId);
		if (error) throw new Error('failed to update title');
	}

	async updateDescription(todoId: number, description: string) {
		console.log('updateTitle');
		const { error } = await supabase
			.from('todos')
			.update({ description })
			.eq('id', todoId);
		if (error) throw new Error('failed to update desc');
	}
	async updateSorKey() {
		const {} = await fetch(``);
	}

	async updateStartDate() {
		const {} = await fetch(``);
	}

	async updateEndDate() {
		const {} = await fetch(``);
	}

	async updateDueDate() {
		const {} = await fetch(``);
	}
	async deleteTag(tagId: number) {
		console.log('deleteTag');
		const { error } = await supabase.from('tags').delete().eq('id', tagId);
		if (error) throw new Error('failed to delete tag');
	}
	async addTag() {
		const {} = await fetch(``);
	}
}
