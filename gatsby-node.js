exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            frontmatter {
              date
              slug
              meta_title
              title
            }
            id
          }
        }
      }
    }
  `)

  const posts = data.allMdx.edges
  posts.forEach((post, index) => {
    //const selected = post.node.frontmatter
    actions.createPage({
      path: `/stories/${post.node.frontmatter.slug}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        //...selected,
        id: post.node.id,
      },
    })
  })
}
