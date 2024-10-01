'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NotificationIcon: React.FC = () => {
  const pathname = usePathname();
  const isActive = pathname === '/notifications';

  return (
    <Link href="/notifications" passHref>
      <div className="relative cursor-pointer">
        <Image
          src="/Notification.svg"
          alt="Notification"
          width={24}
          height={24}
          className={`transition-all duration-150 ${isActive ? 'filter invert' : ''}`}
        />
      </div>
    </Link>
  );
};

export default NotificationIcon;
