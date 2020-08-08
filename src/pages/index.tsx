import React, { useContext, useEffect } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const Index = (props: any) => {
  const { uri } = props
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-0" }), [])
  console.log(state)
  return (
    <Layout location={uri}>
      Home
      <Link to="/about">ABout</Link>
    </Layout>
  )
}

export default Index
