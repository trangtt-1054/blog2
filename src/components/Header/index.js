import React, { useContext } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Link } from "gatsby"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import ThemeToggler from "./themeToggler"
import styled from "styled-components"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getTabItemStyle = (isDragging, draggableStyle, index) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  //background: isDragging ? "#96bb7c" : "#eebb4d",
  //background: colors[index % colors.length],
  ...draggableStyle,
  textTransform: "uppercase",
  fontWeight: 600,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#fccbcb" : "#fccbcb",
  display: "flex",
  overflow: "auto",
})

const Header = props => {
  const dispatch = useContext(GlobalDispatchContext)
  //console.log(dispatch)
  const state = useContext(GlobalStateContext)
  //console.log(state)

  const handleDragEnd = result => {
    if (!result.destination) {
      return
    }

    const newTabsOrder = reorder(
      state.tabs,
      result.source.index,
      result.destination.index
    )
    dispatch({ type: "DRAG_TAB", payload: newTabsOrder })
    //onDragEnd(newTabsOrder)
    //setTabs(newTabsOrder)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {state.tabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...getTabItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          index
                        ),
                        background: tab.color,
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", width: "100%" }}
                        to={tab.path}
                      >
                        {tab.content}
                      </Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ThemeToggler />
    </div>
  )
}

export default Header
