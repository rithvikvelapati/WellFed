// Example: Dispatching actions in a component or useEffect
"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers, setFriends, setPendingFriendRequests } from '@/store/userSlice';

const SampleDataLoader: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sample Users
    const users = [
      { id: '1', name: 'Alice', avatar: '/avatars/Avatar1.png', isOnline: true },
      { id: '2', name: 'Bob', avatar: '/avatars/Avatar2.png', isOnline: false },
      { id: '3', name: 'Charlie', avatar: '/avatars/Avatar3.png', isOnline: true },
    ];

    // Sample Friends
    const friends = [
      { id: '1', name: 'Alice', avatar: '/avatars/Avatar1.png', isOnline: true },
      { id: '2', name: 'Bob', avatar: '/avatars/Avatar2.png', isOnline: false },
    ];

    // Sample Pending Friend Requests
    const pendingFriendRequests = [
      { id: '3', name: 'Charlie', avatar: '/avatars/Avatar3.png' },
    ];

    dispatch(setUsers(users));
    dispatch(setFriends(friends));
    dispatch(setPendingFriendRequests(pendingFriendRequests));
  }, [dispatch]);

  return null;
};

export default SampleDataLoader;
