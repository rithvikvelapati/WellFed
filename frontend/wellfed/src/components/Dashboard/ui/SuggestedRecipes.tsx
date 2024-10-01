'use client';
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, CardMedia } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import { recipesData } from '../../../constants';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer';

const SuggestedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState(recipesData);

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
      <HorizontalScrollContainer className='bg-gradient-to-r from-backgroundDash to-inherit'>
        {recipes.map(recipe => (
          <Card
            key={recipe.id}
            sx={{
              width: 180,
              minHeight: 175,
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              flexShrink: 0,
              margin: '5px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Link href={`/recipes/${recipe.id}`} passHref>
                <CardMedia
                  component="img"
                  image={recipe.imageUrl}
                  alt={recipe.title}
                  sx={{ height: 132, objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                />
              </Link>

              <IconButton
                onClick={() => toggleBookmark(recipe.id)}
                sx={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  color: recipe.bookmarked ? '#EC9556' : '#EC9556',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                  borderRadius: '50%',
                }}
              >
                {recipe.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Box>

            <CardContent
              sx={{
                padding: '4px 4px 0px 4px', // Ensure no bottom padding
                flexGrow: 1, // Let the content take full vertical space
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 1}}>
                <Box sx={{
                    display: 'block',
                    maxWidth: '70%',
                  }}
                >
                  <Typography
                    className="mobile-scrollbar-hide"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 12,
                      whiteSpace: 'nowrap',
                      overflowX: 'auto',
                    }}
                  >
                    {recipe.title}
                  </Typography>
                </Box>

                <IconButton
                  onClick={() => toggleFavorite(recipe.id)}
                  sx={{ p: '4px', color: recipe.favorited ? '#EC9556' : '#EC9556' }}
                >
                  {recipe.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', ml: 1 }}>
                <Typography
                  sx={{ fontSize: '0.6rem', color: 'grey-600', display: 'flex', alignItems: 'center' }}
                >
                  {recipe.rating}
                  <StarIcon sx={{ fontSize: '12px', color: '#EC9556', ml: '2px' }} />
                  ({recipe.reviews})
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AccessTimeIcon sx={{ fontSize: '0.8rem', color: 'black' }} />
                  <Typography sx={{ fontSize: '0.6rem', color: 'grey-600' }}>
                    {recipe.time}~
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Typography
                  className="mobile-scrollbar-hide"
                  sx={{
                    fontSize: '0.6rem',
                    color: 'grey-500',
                    lineHeight: '0.8rem',
                    whiteSpace: 'nowrap',
                    overflowX: 'auto',
                    maxWidth: '60%',
                  }}
                >
                  {recipe.handle}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </HorizontalScrollContainer>
  );
};

export default SuggestedRecipes;
