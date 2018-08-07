import React from 'react';
import Link from 'gatsby-link';

import { rhythm, scale } from '../utils/typography';

const Header = ({ isHome, children }) => {
  const Heading = isHome ? 'h1' : 'h3';

  const headingStyles = {
    h1: {
      ...scale(1.5),
      marginTop: 0,
      marginBottom: rhythm(1.5),
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      marginTop: 0,
      marginBottom: rhythm(-1),
    },
  };

  const linkStyle = {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <Heading style={headingStyles[Heading]}>
      <Link style={linkStyle} to="/">
        {children}
      </Link>
    </Heading>
  );
};

export default Header;
