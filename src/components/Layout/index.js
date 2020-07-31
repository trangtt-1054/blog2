import React, { useContext } from "react"
import Header from "../Header"
import { GlobalStateContext } from "../../context/GlobalContextProvider"

const Layout = props => {
  const state = useContext(GlobalStateContext)
  const { location } = props
  const activeTab = state.tabs.find(tab => tab.path === location)
  return (
    <div
      style={{
        background: activeTab.color,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Header />
      {props.children}
    </div>
  )
}

export default Layout
