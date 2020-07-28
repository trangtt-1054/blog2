exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              meta_title
              date
              title
            }
            id
          }
        }
      }
    }
  `)

  // const postPerPage = 3
  // const numberOfPages = Math.ceil(
  //   data.allMarkdownRemark.edges.length / postPerPage
  // )
  // Array.from({ length: numberOfPages }).forEach((_, index) => {
  //   actions.createPage({
  //     path: index === 0 ? `/` : `/${index + 1}`,
  //     component: require.resolve("./src/templates/post.js"),
  //     context: {
  //       limit: postPerPage,
  //       skip: index * postPerPage,
  //       numberOfPages,
  //       currentPage: index + 1,
  //     },
  //   })
  // })

  const posts = data.allMarkdownRemark.edges
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
