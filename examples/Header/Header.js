import React from 'react';
import Profile from '../Profile';

// Header is a dumb component that inadvertantly renders a smart component

const Header = () => (
  <div>
    <nav>some nav stuff</nav>
    {/* smart component (not that we know that here) */}
    <Profile/>
  </div>
);

export default Header;
