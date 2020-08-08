import React, { useContext, useEffect } from "react"
import Layout from "../components/Layout"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const About = (props: any) => {
  const { uri } = props
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-3" }), [])
  return <Layout location={uri}>About</Layout>
}

export default About
