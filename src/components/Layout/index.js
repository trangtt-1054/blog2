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
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}

export default Layout
