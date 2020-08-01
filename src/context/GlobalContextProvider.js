import React, { useReducer, createContext } from "react"

//tách state và dispatch thành 2 context because there will be less rerender https://kentcdodds.com/blog/how-to-use-react-context-effectively
export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

const initialState = {
  tabs: [
    { id: "tab-0", path: "/", content: "Home", color: "#8fcfd1" },
    { id: "tab-1", path: "/stories", content: "Stories", color: "#f6ab6c" },
    { id: "tab-2", path: "/portfolio", content: "Portfolio", color: "#96bb7c" },
    { id: "tab-3", path: "/about", content: "Bout", color: "#eebb4d" },
  ],
  theme: "light",
  pageIndex: 1,
  searchTerm: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" }
    case "DRAG_TAB":
      return { ...state, tabs: action.payload }
    case "PAGE_CHANGE":
      return { ...state, pageIndex: action.payload }
    case "SEARCH":
      return { ...state, searchTerm: action.payload }
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
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
