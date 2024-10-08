'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import Image from 'next/image';
import { IoChevronBack } from 'react-icons/io5';
import { setModalOpen } from '@/store/modalSlice';
import ProfilePreview from '@/components/ProfileSection/ProfilePreview'; // Ensure the path is correct

const ProfilePreviewPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setModalOpen(true));
        return () => {
            dispatch(setModalOpen(false));
        };
    }, [dispatch]);

    const modalVariants = {
        initial: {
            x: '-100vw', // Start from the left
            opacity: 0,
        },
        animate: {
            x: 0, // Slide to the center
            opacity: 1,
            transition: { type: 'tween', duration: 0.5 },
        },
        exit: {
            x: '100vw', // Slide out to the right
            opacity: 0,
            transition: { type: 'tween', duration: 0.5 },
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-white"
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div>
                    {/* Profile Banner and Back Button */}
                    <div className="relative w-full h-32 bg-gradient-to-r from-[#B64B29] to-[#EC9556]">
                        <Image
                            src="/Profilebanner.svg"  // Replace with the correct path to the image
                            alt="Profile Banner"
                            layout="fill"
                            objectFit="cover"
                        />
                        {/* Back Button */}
                        <button className="absolute top-4 left-4 text-white" onClick={() => router.back()}>
                            <IoChevronBack size={24} />
                        </button>
                    </div>

                    {/* Render the ProfilePreview component */}
                    <ProfilePreview />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProfilePreviewPage;
