// store/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Define the User and FriendRequest interfaces
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
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  friends: [],
  pendingFriendRequests: [],
  loading: false,
  error: null,
};

// Simulate an API call to accept a friend request
export const acceptFriendRequest = createAsyncThunk<
  string, // Return type: the ID of the accepted request
  string, // Argument type: the ID of the request to accept
  { rejectValue: string }
>('user/acceptFriendRequest', async (requestId, { rejectWithValue }) => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    // In a real application, you would make an API call here
    return requestId;
  } catch (error) {
    return rejectWithValue('Failed to accept friend request.');
  }
});

// Simulate an API call to reject a friend request
export const rejectFriendRequest = createAsyncThunk<
  string, // Return type: the ID of the rejected request
  string, // Argument type: the ID of the request to reject
  { rejectValue: string }
>('user/rejectFriendRequest', async (requestId, { rejectWithValue }) => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    // In a real application, you would make an API call here
    return requestId;
  } catch (error) {
    return rejectWithValue('Failed to reject friend request.');
  }
});

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
    logout(state) {
      state.friends = [];
      state.pendingFriendRequests = [];
      state.users = [];
      state.loading = false;
      state.error = null;
    },
    // Add more reducers as needed
  },
  extraReducers: (builder) => {
    // Handle acceptFriendRequest
    builder
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const requestId = action.payload;
        const requestIndex = state.pendingFriendRequests.findIndex(
          (req) => req.id === requestId
        );
        if (requestIndex !== -1) {
          const acceptedRequest = state.pendingFriendRequests.splice(requestIndex, 1)[0];
          const newFriend: User = {
            id: acceptedRequest.id,
            name: acceptedRequest.name,
            avatar: acceptedRequest.avatar,
            isOnline: false, // Default to offline; adjust as needed
          };
          state.friends.push(newFriend);
        }
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unable to accept friend request.';
      });

    // Handle rejectFriendRequest
    builder
      .addCase(rejectFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const requestId = action.payload;
        state.pendingFriendRequests = state.pendingFriendRequests.filter(
          (req) => req.id !== requestId
        );
      })
      .addCase(rejectFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unable to reject friend request.';
      });
  },
});

export const { setUsers, setFriends, setPendingFriendRequests, logout } = userSlice.actions;

export default userSlice.reducer;
