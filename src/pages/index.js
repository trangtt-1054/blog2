import React from "react"
import Layout from "../components/Layout"

const Index = props => {
  const { uri } = props
  return <Layout location={uri}>Home</Layout>
}

export default Index
