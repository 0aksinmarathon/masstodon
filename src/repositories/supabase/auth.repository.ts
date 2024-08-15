import { SupabaseClient } from '@supabase/supabase-js';
import { IAuthRepository } from '../auth.repository.interface';
import { supabase } from './supabase';

// @injectable()
export class AuthRepository implements IAuthRepository {
	private supabase: SupabaseClient = supabase;
	constructor() {
		console.log('constructor');
	}

	async addUser(uid: string, name: string, picture: string) {
		console.log('addUser');
		const { data, error } = await this.supabase
			.from('users')
			.insert({ external_id: uid, name, picture });

		if (error) throw new Error('failed to get todo detail');
		return;
	}

	async getUser(uid: string) {
		console.log('getUser');
		const { data, error } = await this.supabase
			.from('users')
			.select('*')
			.eq('external_id', uid)
			.is('deleted_at', null);
		if (error) throw new Error('failed to get todo detail');
		return data;
	}

	// async countUsers(uid: string) {
	// 	console.log('countUsers');
	// 	const { data, error } = await this.supabase
	// 		.from('users')
	// 		.select('*', { count: 'exact' })
	// 		.eq('external_id', 'xx')
	// 		.is('deleted_at', null);
	// 	if (error) throw new Error('failed to get todo detail');
	// 	console.log(data);
	// 	return data;
	// }
}
