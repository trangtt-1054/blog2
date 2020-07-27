import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"

export const wrapRootElement = props => {
  return <GlobalContextProvider>{props.element}</GlobalContextProvider>
}
