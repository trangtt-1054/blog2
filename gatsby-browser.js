import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import GlobalLikeProvider from "./src/context/GlobalLikeProvider"
import "./src/styles/global.css"

export const wrapRootElement = props => {
  return (
    <GlobalContextProvider>
      <GlobalLikeProvider>{props.element}</GlobalLikeProvider>
    </GlobalContextProvider>
  )
}
