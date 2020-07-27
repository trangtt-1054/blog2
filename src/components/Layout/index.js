import React, { useState } from "react"
import Header from "../Header"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Link } from "gatsby"
import GlobalContextProvider from "../../context/GlobalContextProvider"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getTabItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  borderRadius: 10,
  background: isDragging ? "#96bb7c" : "#eebb4d",
  ...draggableStyle,
  textTransform: "uppercase",
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#fccbcb" : "#8fcfd1",
  display: "flex",
  padding: grid,
  overflow: "auto",
})

const Layout = props => {
  console.log("Layout rendered")
  const [tabs, setTabs] = useState([
    { id: "tab-0", path: "/", content: "Home" },
    { id: "tab-1", path: "/stories", content: "Stories" },
    { id: "tab-2", path: "/portfolio", content: "Portfolio" },
    { id: "tab-3", path: "/about", content: "Bout" },
  ])

  const onDragEnd = newTabsOrder => {
    // if (!result.destination) {
    //   return
    // }

    // const newTabsOrder = reorder(
    //   tabs,
    //   result.source.index,
    //   result.destination.index
    // )

    setTabs(newTabsOrder)
    console.log(tabs)
  }

  return (
    <GlobalContextProvider>
      <Header tabs={tabs} onDragEnd={onDragEnd} />
      {props.children}
    </GlobalContextProvider>
  )
}

export default Layout
