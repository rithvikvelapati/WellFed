"use client";
import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// Define an interface for icons
interface Icon {
  name: string;
  label: string;
  src: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Set initial active icon for the Home if the path is `/` (root) or `/home`
  const initialPath = pathname === '/' || pathname.startsWith('/home') ? '/' : pathname;
  const [activeIcon, setActiveIcon] = useState(initialPath);

  // Sync activeIcon with the current pathname whenever it changes
  useEffect(() => {
    setActiveIcon(pathname === '/' || pathname.startsWith('/home') ? '/' : pathname);
  }, [pathname]);

  // Define icons, ensuring Home button points to the root `/`
  const icons: Icon[] = [
    { name: 'home', label: 'Home', src: '/Home.svg', path: '/' },
    { name: 'add-friend', label: 'Add Friend', src: '/AddFriend.svg', path: '/add-friend' },
    { name: 'messages', label: 'Messages', src: '/Message.svg', path: '/messages' },
    { name: 'calendar', label: 'Calendar', src: '/Calendar.svg', path: '/calendar' },
    { name: 'groups', label: 'Groups', src: '/Groups.svg', path: '/groups' },
    { name: 'tickets', label: 'Tickets', src: '/Ticket.svg', path: '/tickets' },
    { name: 'food', label: 'Food', src: '/Food.svg', path: '/food' },
    { name: 'cog', label: 'Settings', src: '/Cog.svg', path: '/cog' },
  ];

  const handleIconClick = (iconPath: string) => {
    setActiveIcon(iconPath);
    router.push(iconPath);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        minWidth: 51, // Ensure sidebar has a minimum width of 51px
        width: 60, // Default width
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 2,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Link href="/" passHref>
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
          />
        </Box>
      </Link>

      <List sx={{ width: '100%', padding: 0 }}>
        {icons.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              justifyContent: 'center',
              marginBottom: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              transition: 'transform 0.3s ease-in-out',
              transform: activeIcon === item.path ? 'translateY(-10px)' : 'translateY(0)',
            }}
          >
            <ListItemButton
              onClick={() => handleIconClick(item.path)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px 0',
                minHeight: 58,
                minWidth: 51,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  background: activeIcon === item.path
                    ? 'linear-gradient(90deg, #B64B29, #EC9556)' // Linear gradient for active icon
                    : 'none',
                  borderRadius: '5px',
                  zIndex: -1,
                },
                '& img': {
                  filter: activeIcon === item.path ? 'brightness(0) invert(1)' : 'none',
                  transition: 'filter 0.3s ease-in-out',
                },
              }}
            >
              <Image
                src={item.src}
                alt={item.label}
                width={24}
                height={24}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
