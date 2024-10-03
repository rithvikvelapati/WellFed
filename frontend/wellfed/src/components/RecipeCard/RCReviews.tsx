import React from 'react';
import { reviews, reviewSummary } from '../../constants';

interface Review {
    id: number;
    username: string;
    avatar: string;
    rating: number;
    time: string;
    comment: string;
    images: string[]; // Assuming each review can have multiple images
}

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="w-full bg-white p-4 rounded-lg mb-4">
            {/* Image Container */}
            <div className="flex overflow-x-auto mb-4 -mx-4 px-4">
                {review.images.map((image, index) => (
                    <img key={index} src={image} alt={`Review ${index}`} className="w-20 h-20 mr-2 rounded" />
                ))}
            </div>

            {/* User Info and Review */}
            <div className="flex items-center">
                <img src={review.avatar} alt={`${review.username}'s avatar`} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h4 className="font-bold">{review.username}</h4>
                    <p className="text-xs text-gray-500">{review.time}</p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex mt-2">
                {Array.from({ length: review.rating }, (_, i) => (
                    <svg key={i} className="text-yellow-500 w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.5 3l2-6L2 7h6.5L10 1l1.5 6H18l-4.5 5l2 6z"></path>
                    </svg>
                ))}
            </div>

            {/* Comment */}
            <p className="text-gray-600 mt-2">{review.comment}</p>
        </div>
    );
};

const ReviewsPage = () => {
    return (
        <div className="w-full mx-auto p-4">
            <div className="flex justify-between items-center py-1">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                <a className="text-md text-gray-500 hover:text-gray-800 transition-colors ease-in-out duration-300">See All</a>
                </div>
            <div className="text-sm mb-4">12 images - 37 comments</div>
            {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    );
};

export default ReviewsPage;
