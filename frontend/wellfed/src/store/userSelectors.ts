// store/userSelectors.ts
import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';

export const selectOnlineUsersCount = (state: RootState) =>
  state.user.users.filter((user) => user.isOnline).length;

export const selectAllFriendsCount = (state: RootState) => state.user.friends.length;

export const selectPendingFriendRequests = (state: RootState) =>
  state.user.pendingFriendRequests;

export const selectOnlineFriends = createSelector(
  [(state: RootState) => state.user.friends],
  (friends) => friends.filter((friend) => friend.isOnline)
);

export const selectAllFriends = (state: RootState) => state.user.friends;
