'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const CartIcon: React.FC = () => {
  const pathname = usePathname();
  const isActive = pathname === '/cart';

  return (
    <Link href="/cart" passHref>
      <div className="relative cursor-pointer">
        <Image
          src="/Shopping cart.svg"
          alt="Shopping Cart"
          width={24}
          height={24}
          className={`w-auto h-auto transition-all duration-150 ${isActive ? 'filter invert' : ''}`}
        />
      </div>
    </Link>
  );
};

export default CartIcon;
