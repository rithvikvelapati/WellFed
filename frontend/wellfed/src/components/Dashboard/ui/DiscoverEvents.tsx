"use client";
import React, { useState } from 'react';
import { Box, Card, Typography, IconButton, Rating } from '@mui/material';
import Image from 'next/image';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Link from 'next/link';
import { eventsData } from '../../../constants';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer';

const DiscoverEvents: React.FC = () => {
    const [events, setEvents] = useState(eventsData);

    const toggleBookmark = (id: number) => {
        setEvents(events.map(event => event.id === id ? { ...event, bookmarked: !event.bookmarked } : event));
    };

    return (
        <HorizontalScrollContainer className='bg-gradient-to-r from-backgroundDash to-inherit'>
            {events.map(event => (
                <Card
                    key={event.id}
                    sx={{
                        minWidth: 145,
                        position: 'relative',
                        display: 'inline-block',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        flex: '0 0 auto',
                        margin: '5px',
                    }}
                >
                    <Box sx={{ position: 'relative', width: '100%', minHeight: 190 }}>
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
                                top: 4,
                                right: 4,
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
                                    fontSize: 14,
                                    color: 'white',
                                }}
                            >
                                {event.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Rating
                                    name="event-rating"
                                    value={event.rating}
                                    readOnly
                                    precision={0.5}
                                    sx={{ fontSize: 14, color: '#EC9556', '& .MuiRating-iconEmpty': { color: '#EC9556' } }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Card>
            ))}
        </HorizontalScrollContainer>
    );
};

export default DiscoverEvents;
