// store/userSelectors.ts
import { RootState } from './store';

export const selectOnlineUsersCount = (state: RootState) =>
  state.user.users.filter((user) => user.isOnline).length;

export const selectAllFriendsCount = (state: RootState) => state.user.friends.length;

export const selectPendingFriendRequests = (state: RootState) =>
  state.user.pendingFriendRequests;
