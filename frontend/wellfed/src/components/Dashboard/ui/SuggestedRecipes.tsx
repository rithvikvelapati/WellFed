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

const SuggestedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Chicken Alfredo", imageUrl: "/CA.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
    { id: 2, title: "Chicken Biryani", imageUrl: "/CB.jpg", time: "45min", cost: "$$", rating: 4.5, reviews: 12, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
    { id: 3, title: "Karelian Pie", imageUrl: "/KP.jpg", time: "20min", cost: "$", rating: 4, reviews: 8, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
    { id: 4, title: "Mushroom Risotto", imageUrl: "/MR.jpg", time: "40min", cost: "$$", rating: 4, reviews: 30, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
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
        flexDirection: 'row',
        overflowX: 'auto',
        p: 2,
        gap: 2,
      }}
    >
      {recipes.map(recipe => (
        <Card
          key={recipe.id}
          sx={{
            minWidth: 180,
            minHeight: 175,
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flexShrink: 0,
            margin: '2px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              image={recipe.imageUrl}
              alt={recipe.title}
              sx={{ height: 120, objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
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

            <Box sx={{ position: 'absolute', bottom: 8, left: 8, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '8px' }}>
              <AccessTimeIcon sx={{ fontSize: '0.8rem', color: 'white' }} />
              <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'white'  }}>{recipe.time}</Typography>
              <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'white', ml:2 }}>{recipe.cost}</Typography>
            </Box>
          </Box>

          <CardContent sx={{ padding: '4px' }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', fontSize: '0.6rem', mb: 0.5, lineHeight: '0.8rem' }}
            >
              {recipe.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Rating
                name="read-only"
                value={recipe.rating}
                readOnly
                size="small"
                precision={0.5}
                sx={{ color: '#EC9556', '& .MuiRating-iconEmpty': { color: '#EC9556' } }}
              />
              <Typography variant="caption" sx={{ fontSize: '0.6rem', color: grey[600] }}>
                ({recipe.reviews})
              </Typography>
              <IconButton onClick={() => toggleBookmark(recipe.id)} sx={{ ml: 1, p: '4px' }}>
                {recipe.bookmarked ? <BookmarkIcon sx={{ color: '#EC9556' }} /> : <BookmarkBorderIcon sx={{ color: '#EC9556' }} />}
              </IconButton>
            </Box>
            
            <Typography
              variant="caption"
              sx={{ fontSize: '0.6rem', color: grey[500], mt: 0.2, lineHeight: '0.8rem' }}
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
