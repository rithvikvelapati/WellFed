"use client"
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeIcon, setActiveIcon] = useState(pathname === '/' ? '/home' : pathname);

  const icons = [
    { name: 'home', label: 'Home', src: '/Home.svg', path: '/home' },
    { name: 'add-friend', label: 'Add Friend', src: '/AddFriend.svg', path: '/add-friend' },
    { name: 'messages', label: 'Messages', src: '/Message.svg', path: '/messages' },
    { name: 'calendar', label: 'Calendar', src: '/Calendar.svg', path: '/calendar' },
    { name: 'groups', label: 'Groups', src: '/Groups.svg', path: '/groups' },
    { name: 'tickets', label: 'Tickets', src: '/Ticket.svg', path: '/tickets' },
    { name: 'food', label: 'Food', src: '/Food.svg', path: '/food' },
    { name: 'cog', label: 'Cog', src: '/Cog.svg', path: '/cog' },
  ];

  const handleIconClick = (iconPath: string) => {
    setActiveIcon(iconPath);
    router.push(iconPath);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 4,
        backgroundColor: '#FFFFFF',

      }}
    >
    <Link href="/home" passHref>
        <Box
          sx={{
            width: 60,
            height: 60,
            marginBottom: 4,
            cursor: 'pointer',
          }}
        >
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={100}
            priority
            className='w-15 h-15'
          />
        </Box>
      </Link>
      <List sx={{ width: '100%', padding: 0 }}>
        {icons.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            component="li"
            sx={{
              justifyContent: 'center',
              marginBottom: 2,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '&.Mui-selected': {
                backgroundColor: '#FFFFFF',
              },
            }}
          >
            <ListItemButton
              onClick={() => handleIconClick(item.path)}
              selected={activeIcon === item.path}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px 0',
                minHeight: 64,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '0',
                  width: activeIcon === item.path ? '100%' : 0,
                  height: activeIcon === item.path ? '100%' : 0,
                  backgroundColor: '#B64B29',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: '5px',
                  zIndex: 0,
                  boxShadow: activeIcon === item.path
                    ? '5px 5px 12px rgba(0, 0, 0, 0.3)'
                    : 'none',
                },
                '& img': {
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.3s ease-in-out',
                  transform: activeIcon === item.path ? 'scale(1.2)' : 'scale(1)',
                  filter: activeIcon === item.path ? 'invert(100%) brightness(2)' : 'none',
                },
              }}
            >
              <Image
                src={item.src}
                alt={item.label}
                width={25}
                height={25}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
