import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import moment from 'moment';

import Intro from '../components/Intro';
import * as Styled from '../components/Styles';
import LabelGroup from '../components/LabelGroup';

import EventList from '../components/EventList';

import { Cycliste, Marcheur, Coureur } from '../components/emojis';

moment.locale('fr');

const Legende = () => (
  <Styled.Legende>
    {/* <LabelGroup items={['Départ']} tooltip="Départ" /> */}
    <LabelGroup items={['VTT']} icon={<Cycliste />} color="#aaf" tooltip="VTT" />
    <LabelGroup items={['Route']} icon={<Cycliste vtt={false} />} color="#8cd" tooltip="Route" />
    <LabelGroup items={['Marche']} icon={<Marcheur />} color="#ece" tooltip="Marche" />
    <LabelGroup items={['Trail']} icon={<Coureur />} color="#ec8" tooltip="Trail / Cross" />
    {/* <LabelGroup items={['Inscription']} color="#bfb" tooltip="Inscription" /> */}
  </Styled.Legende>
);

const AgendaIndex = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');

  const events = get(props, 'data.allMarkdownRemark.edges')
    .map(({ node }, index, full) => {
      const previous = full[index - 1] && full[index - 1].node;

      if (!node.frontmatter.boucles) {
        node.frontmatter.boucles = [
          ...node.frontmatter.boucles_vtt.map(distance => ({ distance, sport: null })),
          ...node.frontmatter.boucles_marche.map(distance => ({ distance, sport: 'marche' })),
          ...node.frontmatter.boucles_trail.map(distance => ({ distance, sport: 'trail' })),
          ...node.frontmatter.boucles_route.map(distance => ({ distance, sport: 'route' })),
        ];
      } else {
        node.frontmatter.boucles = node.frontmatter.boucles.map(boucle => ({ ...boucle, distance: boucle.distance + ' km' }));
      }

      return {
        ...node,
        newMonth: !previous || previous.frontmatter.month !== node.frontmatter.month,
        newDay: !previous || previous.frontmatter.day !== node.frontmatter.day,
      };
    });

  return (
    <div>
      <Helmet title={siteTitle} />
      <Intro />
      <Legende />
      <EventList events={events} />
    </div>
  );
};

export default AgendaIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            month: date(formatString: "YYYY-MM")
            day: date(formatString: "YYYY-MM-DD")
            date
            title
            inscriptions
            commune
            departement
            boucles {
              distance
              sport
            }
            boucles_vtt
            boucles_route
            boucles_marche
            boucles_trail
          }
        }
      }
    }
  }
`;
