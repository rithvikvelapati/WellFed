"use client";
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, CardMedia, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { grey } from '@mui/material/colors';

const SuggestedRecipes = () => {
    const [recipes, setRecipes] = useState([
        { id: 1, title: "Chicken Alfredo", imageUrl: "/CA.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
        { id: 2, title: "Chicken Alfredo", imageUrl: "/CB.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
        { id: 3, title: "Chicken Alfredo", imageUrl: "/KP.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
        { id: 4, title: "Chicken Alfredo", imageUrl: "/MR.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
        { id: 5, title: "Chicken Alfredo", imageUrl: "/CA.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
        { id: 6, title: "Chicken Alfredo", imageUrl: "/CB.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
    ]);

    const toggleFavorite = (id: number) => {
        setRecipes(recipes.map(recipe =>
            recipe.id === id ? { ...recipe, favorited: !recipe.favorited } : recipe
        ));
    };

    const toggleBookmark = (id: number) => {
        setRecipes(recipes.map(recipe =>
            recipe.id === id ? { ...recipe, bookmarked: !recipe.bookmarked } : recipe
        ));
    };

    return (
        <Box
            className="scrollbar-hide"
            sx={{
                display: 'flex',
                flexDirection: 'row', // Horizontal layout
                overflowX: 'auto', // Enable horizontal scrolling
                p: 2,
                gap: 2, // Space between the cards
            }}
        >
            {recipes.map(recipe => (
                <Card
                    key={recipe.id}
                    sx={{
                        minWidth: { xs: 200, sm: 250, md: 300 }, // Fixed width for each card
                        maxWidth: { xs: 200, sm: 250, md: 300 },
                        borderRadius: '16px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        flex: '0 0 auto', // Prevent shrinking or growing
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <CardMedia
                            component="img"
                            image={recipe.imageUrl}
                            alt={recipe.title}
                            sx={{ height: 180, objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                        />
                        <IconButton
                            onClick={() => toggleFavorite(recipe.id)}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: recipe.favorited ? 'red' : grey[500],
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                                borderRadius: '50%',
                            }}
                        >
                            {recipe.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Box>
                    <CardContent sx={{ padding: 1 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 'bold', fontSize: '0.9rem', mb: 0.5 }}
                        >
                            {recipe.title}
                        </Typography>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', color: grey[700], mb: 0.5 }}
                        >
                            <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>{recipe.time}</Typography>
                            <AttachMoneyIcon sx={{ ml: 1, fontSize: '0.9rem' }} />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>{recipe.cost}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Rating
                                name="read-only"
                                value={recipe.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                                sx={{ color: '#EC9556', '& .MuiRating-iconEmpty': { color: '#EC9556' } }}
                            />
                            <Typography variant="caption" sx={{ color: grey[600] }}>
                                ({recipe.reviews})
                            </Typography>
                            <IconButton onClick={() => toggleBookmark(recipe.id)} sx={{ ml: 2 }}>
                                {recipe.bookmarked ? (
                                    <BookmarkIcon sx={{ color: '#EC9556' }} />
                                ) : (
                                    <BookmarkBorderIcon sx={{ color: '#EC9556' }} />
                                )}
                            </IconButton>
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{ display: 'block', color: grey[500], mt: 0.5 }}
                        >
                            {recipe.handle}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default SuggestedRecipes;
