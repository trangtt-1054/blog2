import React, { useContext, useEffect } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Index = (props: any) => {
  const { uri } = props

  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-0" }), [])

  return (
    <Layout location={uri}>
      Home
      <Link to="/about">ABout</Link>
    </Layout>
  )
}

export default Index
