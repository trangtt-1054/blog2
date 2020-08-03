import React from "react"
import Layout from "../components/Layout"

const About = (props: any) => {
  const { uri } = props
  return <Layout location={uri}>About</Layout>
}

export default About
