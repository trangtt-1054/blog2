//https://www.gatsbyjs.org/docs/ssr-apis/, because this file is 'ssr' so it will take place during the Node build

import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import GlobalLikeProvider from "./src/context/GlobalLikeProvider"

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalContextProvider>
      {" "}
      <GlobalLikeProvider>{element}</GlobalLikeProvider>
    </GlobalContextProvider>
  )
}

//ban đầu wrap GlobalContextProvider ở Layout nhưng state ko persist nên chuyển qua đây
