import React from 'react';
import moment from 'moment';

import CalenDay from '../components/CalenDay';
import LabelGroup from '../components/LabelGroup';
import * as Styled from '../components/Styles';

import { Cycliste, Marcheur, Coureur } from '../components/emojis';

const Event = props => {
  const date = moment(props.frontmatter.date);
  const time = date.format('HH[h]mm');

  const distancesVTT = props.frontmatter.boucles
    .filter(({ sport }) => !sport || sport === 'vtt')
    .map(item => `${item.distance} km`);

  const distancesCyclo = props.frontmatter.boucles
    .filter(({ sport }) => sport === 'cyclo')
    .map(item => `${item.distance} km`);

  const distancesMarche = props.frontmatter.boucles
    .filter(({ sport }) => sport === 'marche')
    .map(item => `${item.distance} km`);

  const distancesTrail = props.frontmatter.boucles
    .filter(({ sport }) => sport === 'trail')
    .map(item => `${item.distance} km`);

  return (
    <Styled.Event>
      <CalenDay
        date={moment(props.frontmatter.date)}
        firstOfDay={props.newDay}
      />
      <div>
        <Styled.Place>
          <strong>{props.frontmatter.commune}</strong> ({props.frontmatter.departement})
        </Styled.Place>

        <Styled.Title>{props.frontmatter.title}</Styled.Title>

        <LabelGroup items={[time]} tooltip="Départ à…" />
        <LabelGroup items={distancesVTT} icon={<Cycliste />} color="#aaf" tooltip="VTT" />
        <LabelGroup items={distancesCyclo} icon={<Cycliste vtt={false} />} color="#8cd" tooltip="Cyclo" />
        <LabelGroup items={distancesMarche} icon={<Marcheur />} color="#ece" tooltip="Marche" />
        <LabelGroup items={distancesTrail} icon={<Coureur />} color="#ec8" tooltip="Trail / Cross" />
        <LabelGroup items={props.frontmatter.inscriptions} color="#bfb" tooltip="Inscription" />
      </div>
    </Styled.Event>
  );
};

export default Event;
