"use client";
import React, { useState } from 'react';
import { Box, Card, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Link from 'next/link';
import { eventsData } from '../../../constants'; // Importing events data
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer';

const DiscoverEvents: React.FC = () => {
    const [events, setEvents] = useState(eventsData); // Using imported eventsData

    const toggleBookmark = (id: number) => {
        setEvents(events.map(event => event.id === id ? { ...event, bookmarked: !event.bookmarked } : event));
    };

    const renderPriceLevel = (level: number) => "$".repeat(level);

    return (
        <HorizontalScrollContainer>
            {events.map(event => (
                <Card
                    key={event.id}
                    sx={{
                        minWidth: { xs: 180, sm: 220, md: 250 },
                        maxWidth: { xs: 180, sm: 220, md: 250 },
                        position: 'relative',
                        display: 'inline-block',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        flex: '0 0 auto',
                    }}
                >
                    <Box sx={{ position: 'relative', width: '100%', height: { xs: 180, sm: 250, md: 300 } }}>
                        <Link href={`/events/${event.id}`} passHref>
                            <Box component="a" sx={{ display: 'block', height: '100%' }}>
                                <Image
                                    src={event.imageUrl}
                                    alt={event.title}
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                />
                            </Box>
                        </Link>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(event.id);
                            }}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: event.bookmarked ? '#EC9556' : '#EC9556',
                                transition: 'color 0.3s',
                            }}
                        >
                            {event.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                                color: 'white',
                                padding: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 'semi-bold',
                                    fontSize: 'fluid-sm',
                                    color: '#ffffff',
                                }}
                            >
                                {event.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {Array.from({ length: event.rating }, (_, i) => (
                                    <StarIcon key={i} sx={{ color: '#EC9556', fontSize: 16 }} />
                                ))}
                                <Typography
                                    sx={{
                                        marginLeft: '10px',
                                        fontSize: '0.875rem',
                                        color: '#EC9556',
                                    }}
                                >
                                    {renderPriceLevel(event.priceLevel)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            ))}
        </HorizontalScrollContainer>
    );
};

export default DiscoverEvents;
