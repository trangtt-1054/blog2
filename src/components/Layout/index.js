import React, { useContext } from "react"
import Header from "../Header"
import Footer from "../Footer"
import { GlobalStateContext } from "../../context/GlobalContextProvider"

const Layout = props => {
  const state = useContext(GlobalStateContext)
  console.log(state)
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
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
