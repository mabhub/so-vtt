/* global __PREFIX_PATHS__:false, __PATH_PREFIX__:false */

import React from 'react';

import { rhythm } from '../utils/typography';
import Header from '../components/Header';

const Template = ({ location, children }) => {
  const rootPath = (typeof __PREFIX_PATHS__ !== 'undefined' && __PREFIX_PATHS__)
    ? `${__PATH_PREFIX__}/`
    : '/';

  const isHome = location.pathname === rootPath;

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Header isHome={isHome}><abbr title="Sud-Ouest">SO</abbr> VTT</Header>
      {children()}
    </div>
  );
};

export default Template;
