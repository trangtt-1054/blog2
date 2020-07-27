import React from "react"
import Layout from "../components/Layout"

const Stories = props => {
  const { uri } = props
  return <Layout location={uri}>Stories</Layout>
}

export default Stories
