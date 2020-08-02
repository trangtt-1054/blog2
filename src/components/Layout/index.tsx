import React, { FC, useContext } from "react"
import Header from "../Header"
import { GlobalStateContext } from "../../context/GlobalContextProvider"
type Props = {
  location: string
}

const Layout: FC<Props> = props => {
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
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
