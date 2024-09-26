"use client";
import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { sidebarIcons } from '../constants';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const initialPath = pathname === '/' || pathname.startsWith('/home') ? '/' : pathname;
  const [activeIcon, setActiveIcon] = useState(initialPath);

  useEffect(() => {
    setActiveIcon(pathname === '/' || pathname.startsWith('/home') ? '/' : pathname);
  }, [pathname]);

  const handleIconClick = (iconPath: string) => {
    setActiveIcon(iconPath);
    router.push(iconPath);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: 51,
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
        {sidebarIcons.map((item) => (
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
                Width: 51,
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
                    ? 'linear-gradient(90deg, #B64B29, #EC9556)'
                    : 'none',
                  borderRadius: '5px',
                  zIndex: -1,
                },
                '& img': {
                  filter: activeIcon === item.path ? 'brightness(0) invert(1)' : 'none',
                  transition: 'filter 0.5s ease-in-out',
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
