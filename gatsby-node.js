const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    resolve(graphql(`
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `).then(result => {
      if (result.errors) {
        // console.log(result.errors);
        reject(result.errors);
      }

      // Create events pages.
      result.data.allMarkdownRemark.edges.forEach((event, index, events) => {
        const isFirstEvent = index === 0;
        const isLastEvent  = index === events.length - 1;

        createPage({
          path: event.node.fields.slug,
          component: path.resolve('./src/templates/event.js'),
          context: {
            slug: event.node.fields.slug,
            previous: isLastEvent ? null : events[index + 1].node,
            next:    isFirstEvent ? null : events[index - 1].node,
          },
        });
      });
    }));
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: createFilePath({ node, getNode }),
    });
  }
};
