import React, { useContext, useEffect } from "react"
import Layout from "../components/Layout"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const Portfolio = (props: any) => {
  const { uri } = props
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-2" }), [])
  console.log(state)
  return <Layout location={uri}>Portfolio</Layout>
}

export default Portfolio
