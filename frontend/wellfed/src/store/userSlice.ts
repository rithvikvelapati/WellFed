// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  friends: User[];
  pendingFriendRequests: FriendRequest[];
}

const initialState: UserState = {
  users: [], // List of all users
  friends: [], // List of all friends
  pendingFriendRequests: [], // List of pending friend requests
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setFriends(state, action: PayloadAction<User[]>) {
      state.friends = action.payload;
    },
    setPendingFriendRequests(state, action: PayloadAction<FriendRequest[]>) {
      state.pendingFriendRequests = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setUsers, setFriends, setPendingFriendRequests } = userSlice.actions;

export default userSlice.reducer;
