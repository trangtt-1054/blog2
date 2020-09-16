import React, { FC, createContext, SetStateAction } from "react"
import { useReducer } from "react"

type LikeState = {
  liked: boolean
  saved: boolean
}

type Action = {
  type: string
}

type Dispatch = (action: Action) => void
export const GlobalLikeContext = createContext<LikeState | undefined>(undefined)
export const GlobalLikeDispatch = createContext<Dispatch | undefined>(undefined)

const initialState = {
  liked: false,
  saved: false,
}

const reducer = (state: LikeState, action: Action) => {
  switch (action.type) {
    case "LIKE":
      return { ...state, liked: !state.liked }
    case "SAVE":
      return { ...state, saved: !state.saved }
    default:
      return state
  }
}

type Props = {
  children: any
}

const GlobalLikeProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GlobalLikeContext.Provider value={state}>
      <GlobalLikeDispatch.Provider value={dispatch}>
        {children}
      </GlobalLikeDispatch.Provider>
    </GlobalLikeContext.Provider>
  )
}

//Global State with one value

/* type ToggleLiked = React.Dispatch<SetStateAction<boolean>>

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
} */

export default GlobalLikeProvider
