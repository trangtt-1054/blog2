import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"

export const wrapRootElement = props => {
  console.log(props)
  return <GlobalContextProvider>{props.element}</GlobalContextProvider>
}
