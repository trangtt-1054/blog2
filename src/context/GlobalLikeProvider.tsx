import React, { FC, createContext, useState, SetStateAction } from "react"

type ToggleLiked = React.Dispatch<SetStateAction<boolean>>

export const GlobalLikeContext = createContext<boolean | undefined>(undefined)
export const GlobalLikeDispatch = createContext<ToggleLiked | undefined>(
  undefined
)

type Props = {
  children: any
}

const GlobalLikeProvider: FC<Props> = ({ children }) => {
  const [liked, toggleLiked] = useState(false)
  return (
    <GlobalLikeContext.Provider value={liked}>
      <GlobalLikeDispatch.Provider value={toggleLiked}>
        {children}
      </GlobalLikeDispatch.Provider>
    </GlobalLikeContext.Provider>
  )
}

export default GlobalLikeProvider
