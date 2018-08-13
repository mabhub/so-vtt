import React from 'react';

import * as Styled from '../components/Styles';

export const Marcheur = () => <Styled.Emoji role="img" aria-label="Marcheur">🚶</Styled.Emoji>;
export const Cycliste = ({ vtt = true }) => (
  vtt
    ? <Styled.Emoji role="img" aria-label="Vététiste">🚵</Styled.Emoji>
    : <Styled.Emoji role="img" aria-label="Cycliste">🚴</Styled.Emoji>
);
export const Coureur = () => <Styled.Emoji role="img" aria-label="Trail">🏃</Styled.Emoji>;
