import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import "./src/styles/global.css"

export const wrapRootElement = props => {
  return <GlobalContextProvider>{props.element}</GlobalContextProvider>
}
