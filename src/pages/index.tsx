import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

const Index = (props: any) => {
  const { uri } = props
  return (
    <Layout location={uri}>
      Home
      <Link to="/about">ABout</Link>
    </Layout>
  )
}

export default Index
