export interface IUserRepository {
	getUser;
	addFollow;
	deleteFollow;
	getFollowAndFollowerCount;
	getFollowsAndFollowers;
	getIsUserFollowed;
}
