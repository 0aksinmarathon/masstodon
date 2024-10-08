import { SupabaseClient } from '@supabase/supabase-js';
import { ITodoRepository } from '../todo.repository.interface';
import { supabase } from './supabase';
import { Status } from '../../stores/todos/todo.slice';

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
			comments ( id, content, user: user_id (name, picture, id), created_at ),
			likes ( user_id ),
			user: user_id ( name, picture )
			`
			)
			.eq('id', id)
			.is('deleted_at', null);
		if (error) throw new Error('failed to get todo detail');
		return data.map((todo) => {
			return {
				...todo,
				userId: todo.user_id,
				startDate: todo.start_date,
				endDate: todo.end_date,
				dueDate: todo.due_date,
				likes: todo.likes.map((like) => {
					return {
						userId: like.user_id,
					};
				}),
				comments: todo.comments.map((comment) => {
					return {
						...comment,
						createdAt: comment.created_at,
					};
				}),
			};
		});
	}

	async getMyTodoList(userId: number) {
		console.log('getMyTodoList');
		const { data, error } = await this.supabase
			.from('todos')
			.select(
				`
			*,
			tags ( id, name ),
			comments ( id ),
			likes ( user_id ),
			user: user_id ( id, name, picture )
			`
			)
			.is('deleted_at', null)
			.eq('user_id', userId);
		console.log(userId);
		console.log(data);
		if (error) throw new Error('failed to get my todo list');
		console.log(data);
		const processedData = data.map((todo) => {
			return {
				...todo,
				userId: todo.user_id,
				startDate: todo.start_date,
				endDate: todo.end_date,
				dueDate: todo.due_date,
				likes: todo.likes.map((like) => {
					return {
						userId: like.user_id,
					};
				}),
			};
		});
		return {
			planning: processedData?.filter(({ status }) => status === 'planning'),
			workInProgress: processedData?.filter(
				({ status }) => status === 'workInProgress'
			),
			finished: processedData?.filter(({ status }) => status === 'finished'),
			archived: processedData?.filter(({ status }) => status === 'archived'),
		};
	}

	async getPublicTodoList(userId: number) {
		console.log('getPublicTodoList');
		const { data, error } = userId
			? await this.supabase
					.from('todos')
					.select(
						`
			*,
			tags ( id, name ),
			comments ( id ),
			likes ( user_id ),
			user: user_id ( id, name, picture )
			`
					)
					.is('deleted_at', null)
					.neq('user_id', userId)
			: await this.supabase
					.from('todos')
					.select(
						`
			*,
			tags ( id, name ),
			comments ( id ),
			likes ( user_id ),
			user: user_id ( id, name, picture )
			`
					)
					.is('deleted_at', null);

		console.log(data);
		if (error) throw new Error('failed to get my todo list');
		console.log(data);
		const processedData = data.map((todo) => {
			return {
				...todo,
				userId: todo.user_id,
				startDate: todo.start_date,
				endDate: todo.end_date,
				dueDate: todo.due_date,
				likes: todo.likes.map((like) => {
					return {
						userId: like.user_id,
					};
				}),
			};
		});
		return {
			planning: processedData?.filter(({ status }) => status === 'planning'),
			workInProgress: processedData?.filter(
				({ status }) => status === 'workInProgress'
			),
			finished: processedData?.filter(({ status }) => status === 'finished'),
			archived: processedData?.filter(({ status }) => status === 'archived'),
		};
	}

	async getTodoList() {
		const {} = await fetch(``);
	}

	async addTodo(
		userId: number,
		title: string,
		description: string,
		progress: number,
		startDate: Date,
		endDate: Date,
		dueDate: Date,
		status: Status
	) {
		const { error } = await supabase.from('todos').insert({
			progress,
			user_id: userId,
			title,
			description,
			start_date: startDate,
			end_date: endDate,
			due_date: dueDate,
			status,
			sort_key: 100,
		});
		if (error) throw new Error('failed to add tag');
	}

	async deleteTodo() {
		const {} = await fetch(``);
	}

	async updateTodo() {
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

	async updateStartDate(todoId: number, startDate: string | null) {
		console.log('todoRepository.updateStartDate');
		const { error } = await supabase
			.from('todos')
			.update({ start_date: startDate ? new Date(startDate) : null })
			.eq('id', todoId);

		if (error) throw new Error('failed to add tag');
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
	async addTag(todoId: number, name: string) {
		const { error } = await supabase
			.from('tags')
			.insert({ todo_id: todoId, name });
		if (error) throw new Error('failed to add tag');
	}

	async addLike(todoId: number, userId: number) {
		const { error } = await supabase
			.from('likes')
			.insert({ todo_id: todoId, user_id: userId });
		if (error) throw new Error('failed to add like');
	}

	async deleteLike(todoId: number, userId: number) {
		const { error } = await supabase
			.from('likes')
			.delete()
			.eq('todo_id', todoId)
			.eq('user_id', userId);
		if (error) throw new Error('failed to delete like');
	}

	async updateProgress(todoId: number, progress: number) {
		const { error } = await supabase
			.from('todos')
			.update({ progress })
			.eq('id', todoId);
		if (error) throw new Error('failed to update progress');
	}

	async updateComment(commentId: number, content: number) {
		const { error } = await supabase
			.from('comments')
			.update({ content })
			.eq('id', commentId);
		if (error) throw new Error('failed to update comment');
	}

	async deleteComment(commentId: number) {
		const { error } = await supabase
			.from('comments')
			.delete()
			.eq('id', commentId);
		if (error) throw new Error('failed to delete comment');
	}

	async addComment(
		todoId: number,
		content: string,
		createdAt: Date,
		userId: number
	) {
		const { error } = await supabase.from('comments').insert({
			todo_id: todoId,
			content,
			created_at: createdAt,
			user_id: userId,
		});
		if (error) throw new Error('failed to add comment');
	}
	async updateStatusToArchive(todoId: number) {
		const { error } = await supabase
			.from('todos')
			.update({
				status: 'archived',
			})
			.eq('id', todoId);
		if (error) throw new Error('failed to add comment');
	}
}
