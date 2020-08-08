import React, { FC, useReducer, createContext } from "react"
import { State } from "../types/GlobalState"

//tách state và dispatch thành 2 context because there will be less rerender https://kentcdodds.com/blog/how-to-use-react-context-effectively

type Action = {
  type: string
  payload?: any
}

type Dispatch = (action: Action) => void

//export const GlobalStateContext = createContext<Partial<State>>({})
export const GlobalStateContext = createContext<State | undefined>(undefined)
export const GlobalDispatchContext = createContext<Dispatch | undefined>(
  undefined
)

const initialState: State = {
  tabs: [
    { id: "tab-0", path: "/", content: "Home", color: "#8fcfd1", active: true },
    {
      id: "tab-1",
      path: "/stories",
      content: "Stories",
      color: "#f6ab6c",
      active: false,
    },
    {
      id: "tab-2",
      path: "/portfolio",
      content: "Portfolio",
      color: "#96bb7c",
      active: false,
    },
    {
      id: "tab-3",
      path: "/about",
      content: "Bout",
      color: "#eebb4d",
      active: false,
    },
  ],
  theme: "light",
  pageIndex: 1,
  searchTerm: "",
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" }
    case "DRAG_TAB":
      return { ...state, tabs: action.payload }
    case "PAGE_CHANGE":
      return { ...state, pageIndex: action.payload }
    case "SEARCH":
      return { ...state, searchTerm: action.payload }
    case "SET_ACTIVE_TAB":
      return {
        ...state,
        tabs: state.tabs.map(tab =>
          tab.id === action.payload
            ? { ...tab, active: true }
            : { ...tab, active: false }
        ),
      }
    default:
      throw new Error("Bad Action Type")
  }
}

type Props = {
  children: any
}

const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
