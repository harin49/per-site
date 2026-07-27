'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from 'src/components/ThemeSwitcher';
import '../styles/nav.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/news', label: 'News' },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav__inner">
        <ul className="nav__links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`nav__link${pathname === href ? ' nav__link--active' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav__controls">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
