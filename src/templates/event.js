import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';

import Intro from '../components/Intro';
import { rhythm, scale } from '../utils/typography';

const EventTemplate = props => {
  const event = props.data.markdownRemark;
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const { previous, next } = props.pathContext;

  return (
    <div>
      <Helmet title={`${event.frontmatter.title} | ${siteTitle}`} />
      <h1>{event.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {event.frontmatter.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: event.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Intro />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {
            previous &&
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          }
        </li>
        <li>
          {
            next &&
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          }
        </li>
      </ul>
    </div>
  );
};

export default EventTemplate;

export const pageQuery = graphql`
  query EventBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
