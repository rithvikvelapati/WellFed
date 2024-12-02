import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Friend {
  id: number;
  name: string;
  isOnline: boolean;
}

interface FriendRequest {
  id: number;
  name: string;
}

interface FriendsState {
  friends: Friend[];
  pendingRequests: FriendRequest[];
}

const initialState: FriendsState = {
  friends: [],
  pendingRequests: [],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
    setPendingRequests: (state, action: PayloadAction<FriendRequest[]>) => {
      state.pendingRequests = action.payload;
    },
    acceptRequest: (state, action: PayloadAction<number>) => {
      const requestId = action.payload;
      const request = state.pendingRequests.find(req => req.id === requestId);
      if (request) {
        state.friends.push({ id: request.id, name: request.name, isOnline: false });
        state.pendingRequests = state.pendingRequests.filter(req => req.id !== requestId);
      }
    },
    declineRequest: (state, action: PayloadAction<number>) => {
      state.pendingRequests = state.pendingRequests.filter(req => req.id !== action.payload);
    },
  },
});

export const { setFriends, setPendingRequests, acceptRequest, declineRequest } = friendsSlice.actions;

export default friendsSlice.reducer;
