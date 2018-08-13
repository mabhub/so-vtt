import React from 'react';

export const Marcheur = () => <span role="img" aria-label="Marcheur">🚶</span>;
export const Cycliste = ({ vtt = true }) => (
  vtt
    ? <span role="img" aria-label="Vététiste">🚵</span>
    : <span role="img" aria-label="Cycliste">🚴</span>
);
export const Coureur = () => <span role="img" aria-label="Trail">🏃</span>;
