import React, { useEffect, useState } from 'react';
import { IoPersonCircleOutline, IoRestaurantOutline, IoCardOutline, IoChevronForward } from 'react-icons/io5';
import { GiShoppingBag } from 'react-icons/gi';
import { ImPriceTag } from 'react-icons/im';
import { MdDriveFolderUpload } from 'react-icons/md';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // Clerk for authentication
import { BASE_URL, GET_PROFILE } from '@/constants/api'; // API constants

const DashboardLinks = () => {
    const router = useRouter();
    const { isSignedIn, user } = useUser(); // Clerk's useUser hook to get current user
    const [firstName, setFirstName] = useState(''); // For storing firstName from the database

    useEffect(() => {
        if (isSignedIn && user) {
            fetchUserData(); // Fetch user data when user is signed in
        }
    }, [isSignedIn, user]);

    // Function to fetch user data from the database (similar to ProfileInfo component)
    const fetchUserData = async () => {
        try {
            const profileUrl = BASE_URL + GET_PROFILE + user?.id; // API call using Clerk user ID
            const response = await fetch(profileUrl);
            const result = await response.json();

            // Set the first name if it exists, or keep it empty
            setFirstName(result.firstName || '');
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="relative h-screen w-full flex flex-col items-center">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-tl-lg p-4 w-full max-w-md mx-auto">
                <h1 className="text-white text-2xl font-bold">
                    Welcome{firstName ? `, ${firstName}` : ''}
                </h1>
            </div>

            <div className="w-full max-w-md space-y-fluid-px mt-4 pb-4 pr-2">
                {/* My Profile (flat background) */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between mx-1 h-16 w-full" onClick={() => router.push('/profile-section/profile-info')}>
                    <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center">
                            <IoPersonCircleOutline className="text-secondary" size={24} />
                        </span>
                        <div className="ml-4">
                            <h2 className="text-base font-semibold">My Profile</h2>
                            <p className="text-xs text-gray-500">Edit Your Profile.</p>
                        </div>
                    </div>
                    <IoChevronForward className="text-gray-600" size={24} />
                </div>

                {/* My Orders (gradient background) */}
                <div className="bg-gradient-to-t from-slate-400 to-slate-700 rounded-xl shadow-lg p-4 flex items-center justify-between mx-1 h-16 w-full">
                    <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center">
                            <GiShoppingBag className="text-white" size={24} />
                        </span>
                        <div className="ml-4">
                            <h2 className="text-base font-semibold text-white">My Orders</h2>
                            <p className="text-xs text-gray-200">Track Order Status, Or View Purchase History And Receipts.</p>
                        </div>
                    </div>
                    <IoChevronForward className="text-white" size={24} />
                </div>

                {/* My Food Preferences (flat background) */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between mx-1 h-16 w-full">
                    <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center">
                            <IoRestaurantOutline className="text-secondary" size={24} />
                        </span>
                        <div className="ml-4">
                            <h2 className="text-base font-semibold">My Food Preferences</h2>
                            <p className="text-xs text-gray-500">Set Your Food Preferences and Diet Requirements.</p>
                        </div>
                    </div>
                    <IoChevronForward className="text-gray-600" size={24} />
                </div>

                {/* Payment (gradient background) */}
                <div className="bg-gradient-to-t from-slate-400 to-slate-700 rounded-xl shadow-lg p-4 flex items-center justify-between mx-1 h-16 w-full">
                    <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center">
                            <IoCardOutline className="text-white" size={24} />
                        </span>
                        <div className="ml-4">
                            <h2 className="text-base font-semibold text-white">Payment</h2>
                            <p className="text-xs text-gray-200">Add And Modify Your Payment Methods.</p>
                        </div>
                    </div>
                    <IoChevronForward className="text-white" size={24} />
                </div>

                {/* Credits, Promos, And Gift Cards (lighter gradient background) */}
                <div className="bg-gradient-to-t from-slate-400 to-slate-700 rounded-xl shadow-lg p-4 flex items-center justify-between mx-1 h-16 w-full">
                    <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center">
                            <ImPriceTag className="text-white" size={24} />
                        </span>
                        <div className="ml-4">
                            <h2 className="text-base font-semibold text-white">Credits, Promotions</h2>
                            <p className="text-xs text-gray-200">0 Offer Available | $0 Credits</p>
                        </div>
                    </div>
                    <IoChevronForward className="text-white" size={24} />
                </div>

                {/* My Lists Section */}
                <div className="mt-4 w-full">
                    <h2 className="text-lg font-semibold text-slate-900 mb-2 pl-2">My Lists</h2>
                    {/* Uploads (lighter gradient background) */}
                    <div className="bg-gradient-to-t from-slate-400 to-slate-700 rounded-xl shadow-lg p-4 flex items-center justify-between mb-2 mx-1 h-16 w-full">
                        <div className="flex items-center">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <MdDriveFolderUpload className="text-white" size={24} />
                            </span>
                            <div className="ml-4">
                                <h2 className="text-base font-semibold text-white">Uploads</h2>
                                <p className="text-xs text-gray-200">Upload And Download Recipes.</p>
                            </div>
                        </div>
                        <IoChevronForward className="text-white" size={24} />
                    </div>

                    {/* Favorites (flat background) */}
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between mb-2 mx-1 h-16 w-full" onClick={() => router.push('/dashboard-links/favorites')}>
                        <div className="flex items-center">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <FaHeart className="text-secondary" size={24} />
                            </span>
                            <div className="ml-4">
                                <h2 className="text-base font-semibold">Favorites</h2>
                                <p className="text-xs text-gray-500">Add And Save Your Favorite Recipes.</p>
                            </div>
                        </div>
                        <IoChevronForward className="text-gray-600" size={24} />
                    </div>

                    {/* Bookmarks (flat background) */}
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between mx-1 h-16 w-full">
                        <div className="flex items-center">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <FaBookmark className="text-secondary" size={24} />
                            </span>
                            <div className="ml-4">
                                <h2 className="text-base font-semibold">Bookmarks</h2>
                                <p className="text-xs text-gray-500">Mark The Recipes To Try Later.</p>
                            </div>
                        </div>
                        <IoChevronForward className="text-gray-600" size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLinks;
