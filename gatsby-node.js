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
              tags
            }
            id
          }
        }
      }
    }
  `)

  const tags = []
  const posts = data.allMdx.edges
  posts.forEach((post, index) => {
    //const selected = post.node.frontmatter
    actions.createPage({
      path: `/stories/${post.node.frontmatter.slug}`,
      component: require.resolve("./src/templates/post.tsx"),
      context: {
        //...selected,
        id: post.node.id,
      },
    })

    post.node.frontmatter.tags.forEach(tag => {
      if (!tags.some(tagItem => tagItem === tag)) {
        tags.push(tag)
      }

      actions.createPage({
        path: `/stories/tags/${tag.toLowerCase()}`,
        component: require.resolve("./src/templates/tag.tsx"),
        context: { tag },
      })
    })
  })
}
