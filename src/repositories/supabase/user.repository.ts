import { SupabaseClient } from '@supabase/supabase-js';

import { supabase } from './supabase';
import { IUserRepository } from '../user.repository.interface';

// @injectable()
export class UserRepository implements IUserRepository {
	private supabase: SupabaseClient = supabase;
	constructor() {
		console.log('constructor');
	}

	async getUser(userId: string) {
		console.log('getUser');
		const { data, error } = await this.supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.is('deleted_at', null);
		if (error) throw new Error('failed to get todo detail');
		return data;
	}

	async addFollow(followerId: number, followedId: number) {
		const { error } = await supabase.from('follows').insert({
			follower_id: followerId,
			followed_id: followedId,
		});
		if (error) throw new Error('failed to add comment');
	}

	async deleteFollow(followerId: number, followedId: number) {
		const { error } = await supabase
			.from('follows')
			.delete()
			.eq('follower_id', followerId)
			.eq('followed_id', followedId);
		if (error) throw new Error('failed to add comment');
	}

	async getFollowAndFollowerCount(userId: number) {
		const [
			{ count: followCount, error: followCountError },
			{ count: followerCount, error: followerCountError },
		] = await Promise.all([
			await supabase

				.from('follows')
				.select('*', { count: 'exact', head: true })
				.eq('follower_id', userId),
			await supabase
				.from('follows')
				.select('*', { count: 'exact', head: true })
				.eq('followed_id', userId),
		]);
		if (followCountError || followerCountError)
			throw new Error('failed to getFollowAndFollowerCount');
		return [followCount, followerCount];
	}

	async getFollowsAndFollowers(userId: number) {
		console.log('getFollowsAndFollowers');
		const [
			{ data: follows, error: followsError },
			{ data: followers, error: followersError },
		] = await Promise.all([
			await this.supabase
				.from('follows')
				.select(
					`
			user: followed_id ( id, name, picture )
			`
				)
				.eq('follower_id', userId),
			await this.supabase
				.from('follows')
				.select(
					`
			user: follower_id ( id, name, picture )
			`
				)
				.eq('followed_id', userId),
		]);

		if (followsError || followersError)
			throw new Error('failed to getFollowsAndFollowers');
		return [
			follows?.map(({ user }) => user),
			followers?.map(({ user }) => user),
		];
	}

	async getIsUserFollowed(followerId: number, followedId: number) {
		console.log('getIsUserFollowed');
		const { data, error } = await this.supabase
			.from('follows')
			.select('*')
			.eq('follower_id', followerId)
			.eq('followed_id', followedId);

		if (error || data.length > 1)
			throw new Error('failed to getFollowsAndFollowers');
		return data.length === 1;
	}
}
