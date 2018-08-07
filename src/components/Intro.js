import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import { rhythm } from '../utils/typography';

const Intro = () => (
  <div style={{ marginBottom: rhythm(2.5) }}>
    <p>
      Cet agenda référence les rando VTT du <strong>Sud-Ouest</strong> de la
      France.<br /> Il est <strong>libre et ouvert</strong> à la contribution
      communautaire.
    </p>
  </div>
);

export default Intro;
