import React from "react"
import Layout from "../components/Layout"

const Portfolio = (props: any) => {
  const { uri } = props
  return <Layout location={uri}>Portfolio</Layout>
}

export default Portfolio
